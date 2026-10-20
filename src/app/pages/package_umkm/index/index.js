import { customNavigateTo } from "/src/utils/route-util";
import { getUmkmStores, getUmkmProducts, getUmkmCategories } from "/src/public/api";

function formatStoreProduct(p) {
  if (!p) return p;
  let safePrice = Math.max(0, Number(p.price) || 0);
  let priceDisplay = `Rp ${safePrice.toLocaleString('id-ID')}`;
  let safeStock = Math.max(0, Number(p.stock) || 0);

  if (p.variants && p.variants.matrix && Array.isArray(p.variants.matrix) && p.variants.matrix.length > 0) {
    const variantPrices = p.variants.matrix
      .map(m => Math.max(0, Number(m.price) || 0))
      .filter(v => v > 0);
    if (variantPrices.length > 0) {
      const min = Math.min(...variantPrices);
      const max = Math.max(...variantPrices);
      safePrice = min;
      priceDisplay = min === max ? `Rp ${min.toLocaleString('id-ID')}` : `Rp ${min.toLocaleString('id-ID')} - Rp ${max.toLocaleString('id-ID')}`;
    }
    const totalVariantStock = p.variants.matrix.reduce((sum, m) => sum + Math.max(0, Number(m.stock) || 0), 0);
    if (totalVariantStock > 0 || p.variants.matrix.length > 0) {
      safeStock = totalVariantStock;
    }
  }

  let images = p.images;
  if (typeof images === 'string') {
    try {
      images = JSON.parse(images);
    } catch (e) {
      images = [images];
    }
  }
  if (!Array.isArray(images) || images.length === 0) {
    images = p.imageUrl ? [p.imageUrl] : (p.image ? [p.image] : (p.thumbnail ? [p.thumbnail] : []));
  }
  const cleanImages = Array.isArray(images) ? images.filter(Boolean) : [];
  const firstImage = (cleanImages.length > 0 && cleanImages[0]) || p.imageUrl || p.image || p.thumbnail || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400';

  return {
    ...p,
    images: cleanImages.length > 0 ? cleanImages : [firstImage],
    firstImage: firstImage,
    imageUrl: firstImage,
    image: firstImage,
    price: safePrice,
    stock: safeStock,
    totalStock: safeStock,
    priceDisplay: priceDisplay,
    priceFormatted: priceDisplay
  };
}

Page({
  data: {
    isStorefrontMode: false,
    isDirectStoreEntry: false,
    storeData: {},
    storeLogoUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=120',
    storeBannerUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
    storeProducts: [],
    storeLayoutClass: 'layout-2col',
    currentStoreTab: 'home',

    // SDUI Custom Template Fields from CMS
    storeThemeColor: '#0F172A',
    announcementText: '',
    storeHeroTitle: '',
    promoBanners: [],
    vouchers: [],

    // Mall Hub Mode State (Populated strictly via Backend API)
    allStores: [],
    filteredStores: [],
    allProducts: [],
    dynamicCategories: [
      { id: 'elektronik', name: 'Elektronik' },
      { id: 'komputer-gadget', name: 'Komputer & Gadget' },
      { id: 'handphone-aksesoris', name: 'Handphone & Aksesoris' },
      { id: 'fashion-pria', name: 'Fashion Pria' },
      { id: 'fashion-wanita', name: 'Fashion Wanita' },
      { id: 'fashion-muslim', name: 'Fashion Muslim' },
      { id: 'sepatu', name: 'Sepatu' },
      { id: 'tas', name: 'Tas' },
      { id: 'aksesoris-fashion', name: 'Aksesoris Fashion' },
      { id: 'jam-tangan', name: 'Jam Tangan' },
      { id: 'kecantikan', name: 'Kecantikan' },
      { id: 'perawatan-tubuh', name: 'Perawatan Tubuh' },
      { id: 'kesehatan-medis', name: 'Kesehatan & Medis' },
      { id: 'perlengkapan-ibu-bayi', name: 'Perlengkapan Ibu & Bayi' },
      { id: 'makanan-minuman', name: 'Makanan & Minuman' },
      { id: 'rumah-tangga', name: 'Rumah Tangga' },
      { id: 'dapur-alat-masak', name: 'Dapur & Alat Masak' },
      { id: 'kebutuhan-harian', name: 'Kebutuhan Harian' },
      { id: 'hobi-koleksi', name: 'Hobi & Koleksi' },
      { id: 'olahraga-outdoor', name: 'Olahraga & Outdoor' },
      { id: 'otomotif-aksesoris', name: 'Otomotif & Aksesoris' },
      { id: 'buku-alat-tulis', name: 'Buku & Alat Tulis' },
      { id: 'souvenir-pesta', name: 'Souvenir & Perlengkapan Pesta' },
      { id: 'pertukangan-perbaikan', name: 'Pertukangan & Perbaikan Rumah' },
      { id: 'perlengkapan-hewan', name: 'Perlengkapan Hewan Peliharaan' },
      { id: 'pertanian-taman', name: 'Pertanian & Taman' },
      { id: 'voucher-tiket-digital', name: 'Voucher & Produk Digital' }
    ],
    selectedCategoryId: 'ALL',
    searchQuery: '',
    cartCount: 0,
    isLoading: true
  },

  onLoad(query) {
    const mark = query && query.customUrlQueryData;
    const navData = mark && my.customUrlQueryData ? my.customUrlQueryData[mark] : null;

    if (navData && (navData.umkmData || navData.storeData)) {
      const store = navData.storeData || navData.umkmData;
      this.setData({ isDirectStoreEntry: true });
      this.setupStorefront(store);
    } else {
      this.loadMallHubData();
    }

    this.refreshCart();
  },

  onShow() {
    this.refreshCart();
  },

  setupStorefront(store) {
    let layoutClass = 'layout-2col';
    let themeColor = '#0F172A';
    let announcementText = '';
    let storeHeroTitle = store.name ? `Katalog Produk ${store.name}` : 'Koleksi Produk Pilihan';
    let promoBanners = [];
    let vouchers = [];

    let templates = store.templates;
    if (typeof templates === 'string') {
      try {
        templates = JSON.parse(templates);
      } catch (e) {
        templates = {};
      }
    }

    if (templates && templates.index) {
      const idx = templates.index;
      if (idx.layout === '1-column' || idx.layout === '1-col') layoutClass = 'layout-1col';
      else if (idx.layout === 'masonry') layoutClass = 'layout-masonry';
      else layoutClass = 'layout-2col';

      if (idx.themeColor) themeColor = idx.themeColor;
      if (idx.announcementText) announcementText = idx.announcementText;
      if (idx.title) storeHeroTitle = idx.title;
      if (idx.promoBanners && Array.isArray(idx.promoBanners)) promoBanners = idx.promoBanners;
      if (idx.vouchers && Array.isArray(idx.vouchers)) vouchers = idx.vouchers;
    }

    const rawProds = store.products || store.packageList || [];
    const prods = rawProds.map(formatStoreProduct);

    const safeStore = {
      ...store,
      logoUrl: store.logoUrl || 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=120',
      bannerUrl: store.bannerUrl || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
      cityName: store.cityName || 'Indonesia',
      rating: store.rating || '5.0',
      totalSales: store.totalSales || '100+'
    };

    this.setData({
      isStorefrontMode: true,
      storeData: safeStore,
      storeLogoUrl: safeStore.logoUrl,
      storeBannerUrl: safeStore.bannerUrl,
      storeProducts: prods,
      storeLayoutClass: layoutClass,
      storeThemeColor: themeColor,
      announcementText,
      storeHeroTitle,
      promoBanners,
      vouchers,
      currentStoreTab: 'home'
    });
  },

  async loadMallHubData() {
    this.setData({ isLoading: true });

    try {
      // 1. Fetch real categories from Backend API
      const catRes = await getUmkmCategories().catch(() => null);
      let catList = [];
      if (catRes && catRes.data && Array.isArray(catRes.data.data)) {
        catList = catRes.data.data;
      } else if (catRes && Array.isArray(catRes.data)) {
        catList = catRes.data;
      } else if (Array.isArray(catRes)) {
        catList = catRes;
      }

      if (catList.length > 0) {
        this.setData({
          dynamicCategories: catList.map(c => ({
            id: (c.id || '').replace(/^cat-/, ''),
            name: c.name
          }))
        });
      }

      // 2. Fetch all real products from Backend API
      const prodRes = await getUmkmProducts({ limit: 100 }).catch(() => null);
      let allProducts = [];
      if (prodRes && prodRes.data && Array.isArray(prodRes.data.data)) {
        allProducts = prodRes.data.data.map(formatStoreProduct);
      } else if (prodRes && Array.isArray(prodRes.data)) {
        allProducts = prodRes.data.map(formatStoreProduct);
      } else if (Array.isArray(prodRes)) {
        allProducts = prodRes.map(formatStoreProduct);
      }

      // 3. Fetch real stores from Backend API (strictly from DB)
      const storeRes = await getUmkmStores().catch(() => null);
      let rawStores = [];
      if (storeRes && storeRes.data && Array.isArray(storeRes.data.data)) {
        rawStores = storeRes.data.data;
      } else if (storeRes && Array.isArray(storeRes.data)) {
        rawStores = storeRes.data;
      } else if (Array.isArray(storeRes)) {
        rawStores = storeRes;
      }

      // Process and enrich real stores with their real products and SDUI details
      const formattedStores = rawStores.map(store => {
        // Find all products that belong to this store
        const storeProds = allProducts.filter(p => p.storeId === store.id || (p.store && p.store.id === store.id)).map(formatStoreProduct);
        
        // Extract category tags
        const categoryTagsSet = new Set();
        storeProds.forEach(p => {
          if (p.categoryName) categoryTagsSet.add(p.categoryName);
        });
        const categoryTags = Array.from(categoryTagsSet).slice(0, 4);

        // Extract 3 preview products
        const previewProducts = storeProds.slice(0, 3).map(p => ({
          id: p.id,
          name: p.name,
          priceFormatted: p.priceFormatted || (p.price ? `Rp ${p.price.toLocaleString('id-ID')}` : 'Rp 0'),
          image: (Array.isArray(p.images) && p.images[0]) ? p.images[0] : (p.imageUrl || 'https://via.placeholder.com/300')
        }));

        // Default SDUI templates if not present
        const templates = store.templates || {
          index: {
            layout: '2-column',
            themeColor: '#0F172A',
            title: `Koleksi Produk ${store.name}`,
            announcementText: '⚡ Promo Eksklusif BNI: Dapatkan diskon & voucher menarik belanja sekarang!',
            promoBanners: [
              { id: 'b1', title: 'Promo BNI Lifestyle', imageUrl: store.bannerUrl || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800' }
            ],
            vouchers: [
              { id: 'v1', code: 'BNIHEMAT', title: 'Diskon Rp 25.000', discountText: 'Potongan Rp 25.000', minSpend: 150000 }
            ]
          }
        };

        const vouchersSummary = (templates.index && templates.index.vouchers && templates.index.vouchers[0])
          ? templates.index.vouchers[0].title
          : 'Voucher Spesial BNI';

        return {
          id: store.id,
          name: store.name,
          slug: store.slug,
          tagline: store.description || 'Pusat Produk UMKM Binaan Resmi BNI',
          cityName: store.cityName || 'Indonesia',
          provinceName: store.provinceName || '',
          rating: store.rating || 5.0,
          totalSales: store.totalSales ? `${store.totalSales}+` : `${storeProds.reduce((sum, p) => sum + (p.soldCount || 0), 0)}+`,
          totalProducts: storeProds.length,
          badge: store.badge || 'UMKM Binaan BNI',
          logoUrl: store.logoUrl || 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=120',
          bannerUrl: store.bannerUrl || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
          vouchersSummary,
          categoryTags,
          previewProducts,
          templates,
          products: storeProds
        };
      });

      this.setData({
        allStores: formattedStores,
        filteredStores: formattedStores,
        allProducts: allProducts,
        isLoading: false
      });
    } catch (err) {
      console.error("Error loading Mall Hub data from API:", err);
      this.setData({ isLoading: false });
    }
  },


  claimVoucher(e) {
    const code = e.currentTarget.dataset.code;
    my.showToast({
      content: `Voucher ${code} berhasil diklaim!`,
      type: 'success',
      duration: 1500
    });
  },

  filterByCategory(e) {
    const catId = e.currentTarget.dataset.cat;
    this.setData({ selectedCategoryId: catId });
    this.applyFilter(catId, this.data.searchQuery);
  },

  onSearchInput(e) {
    const query = e.detail.value || '';
    this.setData({ searchQuery: query });
    this.applyFilter(this.data.selectedCategoryId, query);
  },

  applyFilter(categoryId, searchQuery) {
    let result = [...this.data.allStores];

    // Filter stores by selected Category
    if (categoryId && categoryId !== 'ALL') {
      const cleanCat = categoryId.toLowerCase();
      result = result.filter(store => {
        if (store.products && store.products.some(p => {
          const pCatId = (p.categoryId || '').toLowerCase().replace(/^cat-/, '');
          const pCatName = (p.categoryName || '').toLowerCase();
          return pCatId === cleanCat || pCatName.includes(cleanCat);
        })) return true;

        if (store.categoryTags && store.categoryTags.some(t => t.toLowerCase().includes(cleanCat))) return true;
        return false;
      });
    }

    // Filter stores by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(store => {
        const matchName = store.name && store.name.toLowerCase().includes(q);
        const matchTagline = store.tagline && store.tagline.toLowerCase().includes(q);
        const matchCity = store.cityName && store.cityName.toLowerCase().includes(q);
        const matchTag = store.categoryTags && store.categoryTags.some(t => t.toLowerCase().includes(q));
        const matchProd = store.products && store.products.some(p => p.name && p.name.toLowerCase().includes(q));
        return matchName || matchTagline || matchCity || matchTag || matchProd;
      });
    }

    this.setData({ filteredStores: result });
  },

  resetFilters() {
    this.setData({
      selectedCategoryId: 'ALL',
      searchQuery: '',
      filteredStores: this.data.allStores
    });
  },

  switchStoreTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ currentStoreTab: tab });
  },

  openStorefrontFromHub(e) {
    const store = e.currentTarget.dataset.store;
    // Get latest products for this store
    const storeProds = this.data.allProducts.filter(p => p.storeId === store.id || (p.store && p.store.id === store.id));
    store.products = storeProds.length > 0 ? storeProds : (store.products || []);
    this.setupStorefront(store);
  },

  handleProductTap(e) {
    const product = e.currentTarget.dataset.product;
    const store = product.store || this.data.storeData || (this.data.allStores && this.data.allStores[0]) || {};

    if (this.data.storeThemeColor) {
      if (!store.templates) store.templates = {};
      if (!store.templates.index) store.templates.index = {};
      store.templates.index.themeColor = this.data.storeThemeColor;
      store.themeColor = this.data.storeThemeColor;
    }

    customNavigateTo({
      url: "/src/app/pages/package_umkm/detail-umkm/detail-umkm",
      data: {
        productData: product,
        storeData: store,
        umkmData: store
      }
    });
  },

  refreshCart() {
    const app = getApp();
    if (app && app.globalData && app.globalData.cart) {
      const count = app.globalData.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      this.setData({ cartCount: count });
    }
  },

  goToCart() {
    customNavigateTo({
      url: "/src/app/pages/cart-checkout/cart-checkout",
      data: {
        orderType: "umkm"
      }
    });
  },

  goToOrders() {
    customNavigateTo({
      url: "/src/app/pages/transaction-history/transaction-history",
      data: {
        source: "umkm",
        filter: "umkm"
      }
    });
  },

  onChatMerchant() {
    my.showToast({
      content: 'Menghubungkan ke layanan chat penjual...',
      duration: 1500
    });
  },

  claimVoucher(e) {
    const code = (e && e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.code) || '';
    my.showToast({
      type: 'success',
      content: `Voucher ${code} berhasil diklaim!`,
      duration: 1500
    });
  },

  onBack() {
    if (this.data.isStorefrontMode && !this.data.isDirectStoreEntry) {
      // Return from Storefront to UMKM Stores Directory
      this.setData({ isStorefrontMode: false });
    } else {
      my.navigateBack();
    }
  }
});
