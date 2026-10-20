import getNetWork from "../../../utils/getNetWork";
import {
  getAllEvents,
  getUmkmStores,
  getUmkmProducts
} from "../../../public/api";
import { customNavigateTo } from "../../../utils/route-util";

Page({
  data: {
    isLoading: true,
    statusBarHeight: 20,
    searchQuery: '',
    
    // Core Data
    allEvents: [],
    highlightEvents: [],
    filteredEvents: [],
    umkmStores: [],
    umkmProducts: [],

    // Filter Categories (Universal - not locked to running)
    selectedEventFilter: 'ALL',
    eventFilterCategories: [
      { id: 'ALL', label: 'Semua Event', icon: '✨' },
      { id: 'konser', label: 'Konser & Musik', icon: '🎵' },
      { id: 'olahraga', label: 'Olahraga & Lari', icon: '🏃' },
      { id: 'festival', label: 'Festival & Pameran', icon: '🎪' },
      { id: 'seminar', label: 'Seminar & Workshop', icon: '💡' }
    ],

    // Main Quick Access Categories
    quickCategories: [
      {
        id: 'event',
        name: 'Tiket Event',
        subtitle: 'Konser & Atraksi',
        icon: 'https://cdn-icons-png.flaticon.com/128/1614/1614997.png',
        badge: 'Trending',
        badgeColor: 'badge-purple',
        theme: 'theme-purple',
        onTap: 'goToAllEvents'
      },
      {
        id: 'umkm',
        name: 'Mall UMKM',
        subtitle: 'Batik & Produk Lokal',
        icon: 'https://cdn-icons-png.flaticon.com/128/6713/6713699.png',
        badge: 'Binaan BNI',
        badgeColor: 'badge-teal',
        theme: 'theme-teal',
        onTap: 'goToUmkmMall'
      },
      {
        id: 'promo',
        name: 'Promo & Diskon',
        subtitle: 'Voucher Belanja',
        icon: 'https://cdn-icons-png.flaticon.com/128/9466/9466122.png',
        badge: 's.d 40%',
        badgeColor: 'badge-amber',
        theme: 'theme-amber',
        onTap: 'onOpenPromoSheet'
      },
      {
        id: 'history',
        name: 'Pesanan Saya',
        subtitle: 'Lacak & Riwayat',
        icon: 'https://cdn-icons-png.flaticon.com/128/2838/2838895.png',
        badge: '',
        badgeColor: '',
        theme: 'theme-rose',
        onTap: 'goToTransactionHistory'
      }
    ]
  },

  onShow() {
    getNetWork();
    my.call("showAppBar", { isShow: false, title: "" }, () => {});
  },

  async onLoad() {
    const sys = my.getSystemInfoSync();
    const statusBarHeight = (sys && sys.statusBarHeight) || 20;
    this.setData({ statusBarHeight });

    await this.loadAllLandingData();
  },

  async loadAllLandingData() {
    this.setData({ isLoading: true });
    try {
      // Fetch events, UMKM stores, and products concurrently
      const [eventsRes, storesRes, productsRes] = await Promise.all([
        getAllEvents().catch(() => null),
        getUmkmStores().catch(() => null),
        getUmkmProducts({ limit: 8 }).catch(() => null)
      ]);

      // 1. Process Events
      let rawEvents = [];
      if (eventsRes && eventsRes.data && Array.isArray(eventsRes.data.data)) {
        rawEvents = eventsRes.data.data;
      } else if (eventsRes && Array.isArray(eventsRes.data)) {
        rawEvents = eventsRes.data;
      }

      const formattedEvents = rawEvents.map((ev) => {
        const rawPrice = Number(ev.price || 0);
        const rawNormalPrice = Number(ev.normalPrice || ev.normal_price || ev.maxPrice || ev.max_price || 0);
        const rawDiscount = Number(ev.discountedPrice || 0);

        let price = rawPrice;
        let normalPrice = rawNormalPrice;
        if (rawDiscount > 0 && rawDiscount < rawPrice) {
          price = rawDiscount;
          normalPrice = rawPrice;
        }

        // Detect category tag
        const catStr = (ev.category || '').toLowerCase();
        const nameStr = (ev.name || '').toLowerCase();
        let categoryTag = 'Event Spesial';
        let categoryIcon = '🎟️';

        if (catStr.includes('konser') || catStr.includes('music') || catStr.includes('musik') || nameStr.includes('concert') || nameStr.includes('festival musik') || nameStr.includes('jazz')) {
          categoryTag = 'Konser & Musik';
          categoryIcon = '🎵';
        } else if (catStr.includes('lari') || catStr.includes('run') || catStr.includes('marathon') || catStr.includes('sport') || nameStr.includes('run') || nameStr.includes('marathon')) {
          categoryTag = 'Sport & Running';
          categoryIcon = '🏃';
        } else if (catStr.includes('festival') || catStr.includes('pameran') || catStr.includes('expo') || catStr.includes('art')) {
          categoryTag = 'Festival & Seni';
          categoryIcon = '🎭';
        } else if (catStr.includes('seminar') || catStr.includes('workshop') || catStr.includes('edukasi') || catStr.includes('tech')) {
          categoryTag = 'Seminar & Edukasi';
          categoryIcon = '💡';
        }

        return {
          ...ev,
          price,
          normalPrice,
          categoryTag,
          categoryIcon,
          formattedPrice: 'Rp ' + Number(price).toLocaleString('id-ID'),
          formattedNormalPrice: (normalPrice > price && normalPrice > 0) ? ('Rp ' + Number(normalPrice).toLocaleString('id-ID')) : '',
          formattedDate: ev.startDate ? new Date(ev.startDate).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }) : 'Tanggal Segera Rilis',
          bannerUrl: ev.bannerUrl || (ev.bannerUrls && ev.bannerUrls[0]) || (ev.images && ev.images[0]) || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
          location: ev.location || ev.venue || 'Lokasi Tertera di Tiket',
          isImageLoading: false
        };
      });

      // 2. Process UMKM Stores
      let rawStores = [];
      if (storesRes && storesRes.data && Array.isArray(storesRes.data.data)) {
        rawStores = storesRes.data.data;
      } else if (storesRes && Array.isArray(storesRes.data)) {
        rawStores = storesRes.data;
      }

      // 3. Process UMKM Products
      let rawProducts = [];
      if (productsRes && productsRes.data && Array.isArray(productsRes.data.data)) {
        rawProducts = productsRes.data.data;
      } else if (productsRes && Array.isArray(productsRes.data)) {
        rawProducts = productsRes.data;
      }

      const formattedProducts = rawProducts.map(p => {
        let safePrice = Math.max(0, Number(p.price) || 0);
        let priceDisplay = `Rp ${safePrice.toLocaleString('id-ID')}`;
        let safeStock = Math.max(0, Number(p.stock) || 0);

        if (p.variants && p.variants.matrix && Array.isArray(p.variants.matrix) && p.variants.matrix.length > 0) {
          const vPrices = p.variants.matrix.map(m => Math.max(0, Number(m.price) || 0)).filter(pr => pr > 0);
          if (vPrices.length > 0) {
            const min = Math.min(...vPrices);
            const max = Math.max(...vPrices);
            safePrice = min;
            priceDisplay = min === max ? `Rp ${min.toLocaleString('id-ID')}` : `Rp ${min.toLocaleString('id-ID')} - Rp ${max.toLocaleString('id-ID')}`;
          }
          const vStock = p.variants.matrix.reduce((sum, m) => sum + Math.max(0, Number(m.stock) || 0), 0);
          if (vStock > 0 || p.variants.matrix.length > 0) safeStock = vStock;
        }

        let images = p.images;
        if (typeof images === 'string') {
          try { images = JSON.parse(images); } catch(e) { images = [images]; }
        }
        const firstImg = (Array.isArray(images) && images[0]) || p.imageUrl || p.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400';

        return {
          ...p,
          firstImage: firstImg,
          priceDisplay: priceDisplay,
          stock: safeStock
        };
      });

      const formattedStores = rawStores.slice(0, 4).map(s => {
        const storeProds = formattedProducts.filter(p => p.storeId === s.id).slice(0, 2);
        return {
          ...s,
          logoUrl: s.logoUrl || 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=120',
          bannerUrl: s.bannerUrl || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800',
          cityName: s.cityName || 'Indonesia',
          rating: s.rating || '5.0',
          previewProducts: storeProds
        };
      });

      this.setData({
        allEvents: formattedEvents,
        highlightEvents: formattedEvents.slice(0, 5),
        filteredEvents: formattedEvents,
        umkmStores: formattedStores,
        umkmProducts: formattedProducts.slice(0, 6),
        isLoading: false
      });
    } catch (err) {
      console.error("Error loading landing data:", err);
      this.setData({ isLoading: false });
    }
  },

  filterEventsByCategory(e) {
    const catId = e.currentTarget.dataset.id;
    this.setData({ selectedEventFilter: catId });

    if (catId === 'ALL') {
      this.setData({ filteredEvents: this.data.allEvents });
      return;
    }

    const filtered = this.data.allEvents.filter(ev => {
      const cat = (ev.category || '').toLowerCase();
      const name = (ev.name || '').toLowerCase();
      if (catId === 'konser') {
        return cat.includes('konser') || cat.includes('music') || cat.includes('musik') || name.includes('concert') || name.includes('jazz') || name.includes('festival musik');
      } else if (catId === 'olahraga') {
        return cat.includes('lari') || cat.includes('run') || cat.includes('marathon') || cat.includes('sport') || name.includes('run') || name.includes('marathon') || name.includes('sport');
      } else if (catId === 'festival') {
        return cat.includes('festival') || cat.includes('pameran') || cat.includes('expo') || cat.includes('art');
      } else if (catId === 'seminar') {
        return cat.includes('seminar') || cat.includes('workshop') || cat.includes('edukasi') || cat.includes('tech');
      }
      return true;
    });

    this.setData({ filteredEvents: filtered });
  },

  onSearchInput(e) {
    const query = (e.detail.value || '').toLowerCase().trim();
    this.setData({ searchQuery: query });

    if (!query) {
      this.setData({ filteredEvents: this.data.allEvents });
      return;
    }

    const filtered = this.data.allEvents.filter(ev => {
      const matchName = ev.name && ev.name.toLowerCase().includes(query);
      const matchLoc = ev.location && ev.location.toLowerCase().includes(query);
      const matchCat = ev.category && ev.category.toLowerCase().includes(query);
      return matchName || matchLoc || matchCat;
    });

    this.setData({ filteredEvents: filtered });
  },

  goToAllEvents() {
    customNavigateTo({
      url: "/src/app/pages/package_event/landing-event/landing-event",
      data: { source: 'landing_lifestyle' }
    });
  },

  goToUmkmMall() {
    customNavigateTo({
      url: "/src/app/pages/package_umkm/index/index",
      data: { categoryName: "Mall UMKM BNI" }
    });
  },

  goToEventDetail(e) {
    const event = e.currentTarget.dataset.event;
    if (!event) return;

    const isExternal =
      event.entryMode === 'external' ||
      event.entry_mode === 'external' ||
      Boolean(event.externalUrl) ||
      Boolean(event.external_url);
    const extUrl = event.externalUrl || event.external_url;

    if (isExternal && extUrl) {
      my.navigateTo({
        url: `/src/app/pages/webview/webview?url=${encodeURIComponent(extUrl)}`
      });
      return;
    }

    customNavigateTo({
      url: "/src/app/pages/index/index",
      data: { id: event.id, eventData: event }
    });
  },

  goToUmkmStore(e) {
    const store = e.currentTarget.dataset.store;
    customNavigateTo({
      url: "/src/app/pages/package_umkm/index/index",
      data: { storeData: store, umkmData: store }
    });
  },

  goToUmkmProductDetail(e) {
    const product = e.currentTarget.dataset.product;
    const store = product.store || (this.data.umkmStores && this.data.umkmStores.find(s => s.id === product.storeId)) || {};

    customNavigateTo({
      url: "/src/app/pages/package_umkm/detail-umkm/detail-umkm",
      data: {
        productData: product,
        storeData: store,
        umkmData: store
      }
    });
  },

  goToTransactionHistory() {
    customNavigateTo({
      url: "/src/app/pages/transaction-history/transaction-history",
      data: {}
    });
  },

  onOpenPromoSheet() {
    my.showToast({
      content: 'Gunakan kode promo BNIHEMAT untuk diskon Rp 25.000 di UMKM & Event!',
      type: 'none',
      duration: 2000
    });
  },

  onRefresh() {
    this.loadAllLandingData();
  }
});
