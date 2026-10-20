import { customNavigateTo } from "/src/utils/route-util";
import { getUmkmProductDetail } from "/src/public/api";

Page({
  data: {
    productData: null,
    umkmData: null,
    storeData: null,
    displayImages: [],
    currentImageIndex: 0,
    
    // Variant State
    hasVariants: false,
    productVariants: null,
    tier1OptionList: [],
    tier2OptionList: [],
    selectedTier1: '',
    selectedTier2: '',
    selectedVariantMatrix: null,
    selectedVariantImage: '',
    selectedVariantSummary: '',
    isVariantConfirmed: false,
    
    // Pricing & Stock
    mainPriceDisplay: '0',
    mainTotalStock: 0,
    displayPrice: '0',
    displayStock: 0,
    sheetPriceFormatted: '0',
    sheetStock: 0,
    currentPrice: 0,
    currentPriceFormatted: '0',
    currentStock: 0,
    quantity: 1,

    // Dynamic Specs
    specList: [],

    // Guarding
    isUnavailable: false,
    unavailableReason: '',

    // SDUI Configuration from CMS Store Templates
    galleryStyle: 'carousel',
    bottomBarStyle: 'standard',
    showShippingEstimate: true,
    showSpecs: true,
    showReviews: true,
    storeThemeColor: '',
    activeHeroThumbIdx: 0,

    // UI state
    isLoading: true,
    isDataReady: false,
    isVariantSheetOpen: false,
    cartCount: 0,
    pendingAction: null // 'cart' | 'buy'
  },

  async onLoad(query) {
    const mark = query && query.customUrlQueryData;
    const data = mark && my.customUrlQueryData ? my.customUrlQueryData[mark] : null;

    let product = data ? (data.productData || {}) : {};
    let store = data ? (data.storeData || data.umkmData || {}) : {};

    // 1. Immediately extract and apply store theme color from navigation
    let initialThemeColor = '';
    if (store && store.templates && store.templates.index && store.templates.index.themeColor) {
      initialThemeColor = store.templates.index.themeColor;
    } else if (store && store.themeColor) {
      initialThemeColor = store.themeColor;
    }

    if (initialThemeColor) {
      this.setData({ storeThemeColor: initialThemeColor });
    }

    // 2. If product data is passed directly (e.g. tapped from Storefront/Discovery), render immediately
    if (product && product.name) {
      this.renderProductDetail(product, store);
    } else {
      this.setData({ isLoading: true, isDataReady: false });
    }

    // 3. Fetch or refresh live product detail from Backend API
    const productId = (product && product.id) || (query && query.productId);
    if (productId) {
      try {
        const liveRes = await getUmkmProductDetail(productId).catch(() => null);
        if (liveRes && liveRes.data && liveRes.data.data) {
          product = { ...product, ...liveRes.data.data };
          if (liveRes.data.data.store) {
            store = { ...store, ...liveRes.data.data.store };
          }
          this.renderProductDetail(product, store);
        }
      } catch (e) {
        console.error("Failed fetching live product detail:", e);
        if (!this.data.isDataReady && product && product.name) {
          this.renderProductDetail(product, store);
        }
      }
    }

    this.refreshCart();
  },

  computeVariantOptionLists(variants, sel1, _sel2) {
    if (!variants || !variants.tier1 || !variants.matrix) {
      return { tier1List: [], tier2List: [] };
    }

    const hasTier2 = Boolean(variants.tier2 && variants.tier2.options && variants.tier2.options.length > 0);
    const getCombo = (m) => Array.isArray(m.combination) ? m.combination : (m.combination ? [m.combination] : []);

    // Tier 1 Options
    const tier1List = (variants.tier1.options || []).map(opt1 => {
      let optStock = 0;
      if (hasTier2) {
        const matchingCombos = variants.matrix.filter(m => getCombo(m)[0] === opt1);
        optStock = matchingCombos.reduce((sum, m) => sum + Math.max(0, Number(m.stock) || 0), 0);
      } else {
        const combo = variants.matrix.find(m => getCombo(m)[0] === opt1);
        optStock = combo ? Math.max(0, Number(combo.stock) || 0) : 0;
      }
      return {
        option: opt1,
        stock: optStock,
        disabled: optStock <= 0
      };
    });

    // Tier 2 Options
    let tier2List = [];
    if (hasTier2) {
      tier2List = (variants.tier2.options || []).map(opt2 => {
        let optStock = 0;
        if (sel1) {
          const combo = variants.matrix.find(m => {
            const c = getCombo(m);
            return c[0] === sel1 && c[1] === opt2;
          });
          optStock = combo ? Math.max(0, Number(combo.stock) || 0) : 0;
        } else {
          const matchingCombos = variants.matrix.filter(m => getCombo(m)[1] === opt2);
          optStock = matchingCombos.reduce((sum, m) => sum + Math.max(0, Number(m.stock) || 0), 0);
        }
        return {
          option: opt2,
          stock: optStock,
          disabled: optStock <= 0
        };
      });
    }

    return { tier1List, tier2List };
  },

  renderProductDetail(product, store) {
    // Images
    let images = product.images;
    if (typeof images === 'string') {
      try {
        images = JSON.parse(images);
      } catch (e) {
        images = [images];
      }
    }
    if (Array.isArray(images) && images.length > 0) {
      images = images.filter(Boolean);
    } else if (product.firstImage) {
      images = [product.firstImage];
    } else if (product.imageUrl) {
      images = [product.imageUrl];
    } else if (product.image) {
      images = [product.image];
    } else {
      images = ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'];
    }

    // Parse SDUI Store Template Config
    let galleryStyle = 'carousel';
    let bottomBarStyle = 'standard';
    let showShippingEstimate = !product.isDigital;
    let showSpecs = true;
    let showReviews = true;
    let storeThemeColor = this.data.storeThemeColor || '';

    if (store) {
      if (store.templates) {
        if (store.templates.index && store.templates.index.themeColor) {
          storeThemeColor = store.templates.index.themeColor;
        }
        if (store.templates.detail) {
          const dt = store.templates.detail;
          if (dt.galleryStyle) galleryStyle = dt.galleryStyle;
          if (dt.bottomBarStyle) bottomBarStyle = dt.bottomBarStyle;
          if (dt.showShippingEstimate !== undefined) showShippingEstimate = dt.showShippingEstimate && !product.isDigital;
          if (dt.showSpecs !== undefined) showSpecs = dt.showSpecs;
          if (dt.showReviews !== undefined) showReviews = dt.showReviews;
          if (dt.themeColor) storeThemeColor = dt.themeColor;
        }
      }
      if (!storeThemeColor && store.themeColor) {
        storeThemeColor = store.themeColor;
      }
    }
    if (!storeThemeColor) {
      storeThemeColor = '#0F172A';
    }

    // Check Banned or Suspended Status
    let isUnavailable = false;
    let unavailableReason = '';
    if (product.status === 'BANNED_BY_ADMIN') {
      isUnavailable = true;
      unavailableReason = product.bannedReason || 'Produk ini telah diturunkan dari peredaran oleh pengawas platform.';
    } else if (store.status === 'SUSPENDED_BY_ADMIN') {
      isUnavailable = true;
      unavailableReason = store.suspensionReason || 'Toko penjual sedang dalam masa penangguhan (dibekukan).';
    }

    // Parse Variants
    let variants = product.variants;
    if (typeof variants === 'string') {
      try {
        variants = JSON.parse(variants);
      } catch (e) {
        variants = null;
      }
    }
    if (variants && variants.matrix && Array.isArray(variants.matrix)) {
      variants.matrix = variants.matrix.map(m => {
        let comb = m.combination;
        if (!Array.isArray(comb)) {
          comb = typeof comb === 'string' && comb.includes(',')
            ? comb.split(',').map(s => s.trim())
            : (comb ? [comb] : []);
        }
        return {
          ...m,
          combination: comb
        };
      });
    }

    const hasVariants = Boolean(variants && variants.tier1 && variants.tier1.options && variants.tier1.options.length > 0);
    let initialPrice = Math.max(0, Number(product.price) || 0);
    let initialStock = Math.max(0, Number(product.stock) || 0);
    let mainPriceDisplay = this.formatCurrency(initialPrice);
    let mainTotalStock = initialStock;

    if (hasVariants && variants.matrix && variants.matrix.length > 0) {
      const vPrices = variants.matrix.map(m => Math.max(0, Number(m.price) || 0)).filter(p => p > 0);
      if (vPrices.length > 0) {
        const min = Math.min(...vPrices);
        const max = Math.max(...vPrices);
        initialPrice = min;
        mainPriceDisplay = min === max ? this.formatCurrency(min) : `${this.formatCurrency(min)} - ${this.formatCurrency(max)}`;
      }
      const vStock = variants.matrix.reduce((sum, m) => sum + Math.max(0, Number(m.stock) || 0), 0);
      initialStock = vStock;
      mainTotalStock = vStock;
    }

    let selectedTier1 = '';
    let selectedTier2 = '';

    if (hasVariants) {
      // Pick first in-stock variant combination
      const firstAvailable = variants.matrix && variants.matrix.find(m => Math.max(0, Number(m.stock) || 0) > 0);
      if (firstAvailable && firstAvailable.combination && firstAvailable.combination.length > 0) {
        selectedTier1 = firstAvailable.combination[0] || '';
        selectedTier2 = firstAvailable.combination[1] || '';
      } else {
        selectedTier1 = (variants.tier1 && variants.tier1.options && variants.tier1.options[0]) || '';
        if (variants.tier2 && variants.tier2.options && variants.tier2.options.length > 0) {
          selectedTier2 = variants.tier2.options[0] || '';
        }
      }
    }

    // Parse Dynamic JSONB Attributes
    const specList = [];
    if (product.attributes && typeof product.attributes === 'object') {
      Object.keys(product.attributes).forEach(key => {
        const val = product.attributes[key];
        if (val !== undefined && val !== null && val !== '') {
          const label = key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
          specList.push({
            key,
            label,
            value: typeof val === 'boolean' ? (val ? 'Ya' : 'Tidak') : String(val)
          });
        }
      });
    }

    const mainHeroImage = (images && images.length > 0 && images[0]) || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600';
    const storeLogoUrl = (store && (store.logoUrl || store.bannerUrl)) || 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=120';

    this.setData({
      productData: product,
      storeData: store,
      umkmData: store,
      storeLogoUrl: storeLogoUrl,
      displayImages: images,
      activeHeroImageUrl: mainHeroImage,
      sheetThumbnailUrl: mainHeroImage,
      hasVariants,
      productVariants: variants,
      selectedTier1,
      selectedTier2,
      isVariantConfirmed: false,
      mainPriceDisplay,
      mainTotalStock,
      displayPrice: mainPriceDisplay,
      displayStock: mainTotalStock,
      currentPrice: initialPrice,
      currentStock: mainTotalStock,
      sheetPriceFormatted: mainPriceDisplay,
      sheetStock: mainTotalStock,
      specList,
      isUnavailable,
      unavailableReason,
      galleryStyle,
      bottomBarStyle,
      showShippingEstimate,
      showSpecs,
      showReviews,
      storeThemeColor,
      isLoading: false,
      isDataReady: true
    }, () => {
      if (hasVariants) {
        this.calculateVariantPriceStock();
      } else {
        this.setData({
          currentPriceFormatted: this.formatCurrency(initialPrice),
          displayPrice: this.formatCurrency(initialPrice),
          displayStock: initialStock
        });
      }
    });
    this.updateCartCount();
  },

  onShow() {
    this.updateCartCount();
  },

  updateCartCount() {
    const app = getApp();
    if (app && app.globalData && app.globalData.cart) {
      const count = app.globalData.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      this.setData({ cartCount: count });
    }
  },

  formatCurrency(num) {
    return (num || 0).toLocaleString('id-ID');
  },

  onSwiperChange(e) {
    this.setData({
      currentImageIndex: e.detail.current
    });
  },

  selectHeroThumb(e) {
    const idx = Number(e.currentTarget.dataset.idx) || 0;
    const heroImg = (this.data.displayImages && this.data.displayImages[idx]) || (this.data.displayImages && this.data.displayImages[0]) || '';
    this.setData({
      activeHeroThumbIdx: idx,
      activeHeroImageUrl: heroImg
    });
  },

  selectTier1(e) {
    const opt = e.currentTarget.dataset.option;
    const disabled = Boolean(e.currentTarget.dataset.disabled);
    if (disabled) {
      my.showToast({ content: 'Varian ini sedang habis', type: 'none', duration: 1200 });
      return;
    }

    let nextTier2 = this.data.selectedTier2;
    const { productVariants } = this.data;
    if (productVariants && productVariants.tier2 && productVariants.tier2.options) {
      const comboMatch = productVariants.matrix && productVariants.matrix.find(m => 
        m.combination && m.combination[0] === opt && m.combination[1] === nextTier2
      );
      if (!comboMatch || Number(comboMatch.stock) <= 0) {
        // Auto-select first available tier2 option for this tier1
        const availableCombo = productVariants.matrix.find(m => {
          const c = Array.isArray(m.combination) ? m.combination : (m.combination ? [m.combination] : []);
          return c[0] === opt && Number(m.stock) > 0;
        });
        if (availableCombo && availableCombo.combination) {
          const c = Array.isArray(availableCombo.combination) ? availableCombo.combination : [availableCombo.combination];
          if (c[1]) nextTier2 = c[1];
        }
      }
    }

    this.setData({ selectedTier1: opt, selectedTier2: nextTier2 }, () => {
      this.calculateVariantPriceStock();
    });
  },

  selectTier2(e) {
    const opt = e.currentTarget.dataset.option;
    const disabled = Boolean(e.currentTarget.dataset.disabled);
    if (disabled) {
      my.showToast({ content: 'Varian ini sedang habis', type: 'none', duration: 1200 });
      return;
    }
    this.setData({ selectedTier2: opt }, () => {
      this.calculateVariantPriceStock();
    });
  },

  calculateVariantPriceStock() {
    const { productVariants, selectedTier1, selectedTier2, productData, displayImages, isVariantConfirmed, mainPriceDisplay, mainTotalStock } = this.data;
    if (!productVariants || !productVariants.matrix) {
      this.setData({
        currentPriceFormatted: this.formatCurrency(productData.price || 0),
        currentStock: productData.stock || 0,
        displayPrice: this.formatCurrency(productData.price || 0),
        displayStock: productData.stock || 0
      });
      return;
    }

    const { tier1List, tier2List } = this.computeVariantOptionLists(productVariants, selectedTier1, selectedTier2);

    // Find matrix matching combo
    const targetCombo = selectedTier2 ? [selectedTier1, selectedTier2] : [selectedTier1];
    const match = productVariants.matrix.find(m => {
      const c = Array.isArray(m.combination) ? m.combination : (m.combination ? [m.combination] : []);
      if (c.length !== targetCombo.length) return false;
      return c.every((val, idx) => val === targetCombo[idx]);
    });

    if (match) {
      const summary = targetCombo.filter(Boolean).join(', ');
      const sheetImg = match.imageUrl || (displayImages && displayImages[0]) || '';
      const matchStock = Math.max(0, Number(match.stock) || 0);
      const formattedPrice = this.formatCurrency(match.price || 0);

      this.setData({
        tier1OptionList: tier1List,
        tier2OptionList: tier2List,
        selectedVariantMatrix: match,
        currentPrice: match.price,
        currentPriceFormatted: formattedPrice,
        currentStock: matchStock,
        sheetPriceFormatted: formattedPrice,
        sheetStock: matchStock,
        selectedVariantImage: match.imageUrl || '',
        sheetThumbnailUrl: sheetImg,
        selectedVariantSummary: summary,
        quantity: Math.min(this.data.quantity, Math.max(1, matchStock || 1)),
        displayPrice: isVariantConfirmed ? formattedPrice : mainPriceDisplay,
        displayStock: isVariantConfirmed ? matchStock : mainTotalStock
      });
    } else {
      this.setData({
        tier1OptionList: tier1List,
        tier2OptionList: tier2List,
        selectedVariantMatrix: null,
        sheetStock: 0,
        currentStock: 0,
        displayPrice: isVariantConfirmed ? '0' : mainPriceDisplay,
        displayStock: isVariantConfirmed ? 0 : mainTotalStock
      });
    }
  },

  onDecrease() {
    if (this.data.quantity > 1) {
      this.setData({ quantity: this.data.quantity - 1 });
    }
  },

  onIncrease() {
    const maxStock = this.data.isVariantSheetOpen ? this.data.sheetStock : this.data.displayStock;
    if (this.data.quantity < maxStock) {
      this.setData({ quantity: this.data.quantity + 1 });
    } else {
      my.showToast({ content: 'Mencapai batas stok tersedia', type: 'none', duration: 1000 });
    }
  },

  openVariantSheet() {
    this.setData({ isVariantSheetOpen: true });
  },

  closeVariantSheet() {
    this.setData({ isVariantSheetOpen: false, pendingAction: null });
  },

  preventBubble() {},

  confirmVariantSelection() {
    if (this.data.sheetStock <= 0) {
      my.showToast({ content: 'Varian yang dipilih sedang habis', type: 'none', duration: 1200 });
      return;
    }
    const action = this.data.pendingAction;
    this.setData({
      isVariantConfirmed: true,
      displayPrice: this.data.sheetPriceFormatted,
      displayStock: this.data.sheetStock
    });
    this.closeVariantSheet();
    if (action === 'cart') {
      this.executeAddToCart();
    } else if (action === 'buy') {
      this.executeBuyNow();
    }
  },

  handleAddToCartClick() {
    if (this.data.isUnavailable || this.data.displayStock <= 0) return;
    if (this.data.hasVariants && !this.data.isVariantConfirmed) {
      this.setData({ pendingAction: 'cart', isVariantSheetOpen: true });
      return;
    }
    if (this.data.hasVariants) {
      if (this.data.sheetStock <= 0 || this.data.currentStock <= 0) {
        my.showToast({ content: 'Stok varian ini habis', type: 'none', duration: 1200 });
        return;
      }
    } else {
      if (this.data.displayStock <= 0) {
        my.showToast({ content: 'Stok produk habis', type: 'none', duration: 1200 });
        return;
      }
    }
    this.executeAddToCart();
  },

  executeAddToCart() {
    const { productData, storeData, currentPrice, quantity, selectedVariantSummary, selectedVariantMatrix, displayImages } = this.data;
    const app = getApp();

    let variantComboStr = '';
    if (selectedVariantMatrix && selectedVariantMatrix.combination) {
      const combo = Array.isArray(selectedVariantMatrix.combination)
        ? selectedVariantMatrix.combination
        : [selectedVariantMatrix.combination];
      variantComboStr = combo.join(', ');
    }
    const variantKey = selectedVariantSummary || variantComboStr;
    const cartItemId = variantKey ? `${productData.id}__${variantKey}` : `${productData.id}`;

    const effectiveStore = storeData && (storeData.id || storeData.name) ? storeData : {
      id: (productData && productData.storeId) || 'store-001',
      name: (storeData && storeData.name) || 'Toko UMKM'
    };

    const item = {
      id: cartItemId,
      cartItemId: cartItemId,
      productId: productData.id,
      name: productData.name,
      variantName: variantKey || '-',
      selectedVariantSummary: variantKey,
      displayName: productData.name + (variantKey ? ` (${variantKey})` : ''),
      price: currentPrice,
      quantity: quantity,
      image: (selectedVariantMatrix && selectedVariantMatrix.imageUrl) || displayImages[0],
      type: 'umkm',
      storeId: effectiveStore.id || (productData && productData.storeId),
      merchantName: effectiveStore.name || 'Toko UMKM',
      isDigital: productData.isDigital
    };

    if (app && app.addToCart) {
      app.addToCart(item, effectiveStore);
    }

    this.updateCartCount();
    my.showToast({
      content: 'Ditambahkan ke Keranjang',
      type: 'success',
      duration: 1200
    });
  },

  handleBuyNowClick() {
    if (this.data.isUnavailable || this.data.displayStock <= 0) return;
    if (this.data.hasVariants && !this.data.isVariantConfirmed) {
      this.setData({ pendingAction: 'buy', isVariantSheetOpen: true });
      return;
    }
    if (this.data.hasVariants) {
      if (this.data.sheetStock <= 0 || this.data.currentStock <= 0) {
        my.showToast({ content: 'Stok varian ini habis', type: 'none', duration: 1200 });
        return;
      }
    } else {
      if (this.data.displayStock <= 0) {
        my.showToast({ content: 'Stok produk habis', type: 'none', duration: 1200 });
        return;
      }
    }
    this.executeBuyNow();
  },

  executeBuyNow() {
    const { productData, storeData, currentPrice, quantity, selectedVariantSummary, selectedVariantMatrix, displayImages } = this.data;

    let variantComboStr = '';
    if (selectedVariantMatrix && selectedVariantMatrix.combination) {
      const combo = Array.isArray(selectedVariantMatrix.combination)
        ? selectedVariantMatrix.combination
        : [selectedVariantMatrix.combination];
      variantComboStr = combo.join(', ');
    }
    const variantKey = selectedVariantSummary || variantComboStr;
    const cartItemId = variantKey ? `${productData.id}__${variantKey}` : `${productData.id}`;

    const effectiveStore = storeData && (storeData.id || storeData.name) ? storeData : {
      id: (productData && productData.storeId) || 'store-001',
      name: (storeData && storeData.name) || 'Toko UMKM'
    };

    const singleItem = {
      id: cartItemId,
      cartItemId: cartItemId,
      productId: productData.id,
      name: productData.name,
      variantName: variantKey || '-',
      selectedVariantSummary: variantKey,
      displayName: productData.name + (variantKey ? ` (${variantKey})` : ''),
      price: currentPrice,
      quantity: quantity,
      image: (selectedVariantMatrix && selectedVariantMatrix.imageUrl) || displayImages[0],
      type: 'umkm',
      storeId: effectiveStore.id || (productData && productData.storeId),
      merchantName: effectiveStore.name || 'Toko UMKM',
      isDigital: productData.isDigital
    };

    customNavigateTo({
      url: "/src/app/pages/cart-checkout/cart-checkout",
      data: {
        orderType: "umkm",
        isDirectBuy: true,
        serviceId: effectiveStore.id || (productData && productData.storeId),
        serviceName: effectiveStore.name || "Toko UMKM",
        totalAmount: currentPrice * quantity,
        cart: [singleItem],
        merchantInfo: effectiveStore
      },
      fail: (err) => {
        console.warn("customNavigateTo navigateTo failed, falling back to redirectTo:", err);
        customNavigateTo({
          url: "/src/app/pages/cart-checkout/cart-checkout",
          data: {
            orderType: "umkm",
            isDirectBuy: true,
            serviceId: effectiveStore.id || (productData && productData.storeId),
            serviceName: effectiveStore.name || "Toko UMKM",
            totalAmount: currentPrice * quantity,
            cart: [singleItem],
            merchantInfo: effectiveStore
          },
          mode: 'redirectTo'
        });
      }
    });
  },

  goToCart() {
    customNavigateTo({
      url: "/src/app/pages/cart-checkout/cart-checkout",
      data: {
        orderType: "umkm",
        serviceId: this.data.storeData.id,
        serviceName: this.data.storeData.name,
        merchantInfo: this.data.storeData
      }
    });
  },

  goToStorefront() {
    customNavigateTo({
      url: "/src/app/pages/package_umkm/index/index",
      data: {
        umkmData: this.data.storeData
      }
    });
  },

  onChatMerchant() {
    my.showToast({
      content: 'Menghubungkan ke Chat Penjual...',
      type: 'none',
      duration: 1200
    });
  },

  onBack() {
    my.navigateBack();
  }
});
