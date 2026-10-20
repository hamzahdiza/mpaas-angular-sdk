import { customNavigateTo } from "/src/utils/route-util";
import { createEcommerceOrder } from "/src/public/api";

Page({
  data: {
    orderType: "umkm",
    serviceId: "store-001",
    serviceName: "Orbital Official Store & Batik Mahakarya",
    customerName: "Hamzah Diza",
    customerPhone: "081234567890",
    shippingAddress: {
      recipientName: "Hamzah Diza",
      phone: "081234567890",
      street: "Jl. Sudirman No. 1, Lantai 12, Kebayoran Baru",
      city: "Jakarta Selatan",
      postalCode: "12190"
    },
    
    // Items in Cart
    cart: [],
    
    // Courier Expeditions
    courierOptions: [
      { id: 'jne-reg', name: 'JNE Express', service: 'Reguler (2-3 Hari)', cost: 15000 },
      { id: 'jnt-ez', name: 'J&T Express', service: 'EZ (1-2 Hari)', cost: 16000 },
      { id: 'sicepat-reg', name: 'SiCepat', service: 'REG (2-3 Hari)', cost: 14000 },
      { id: 'pos-kilat', name: 'Pos Indonesia', service: 'Kilat Khusus (2-4 Hari)', cost: 12000 }
    ],
    selectedCourierId: 'jne-reg',
    selectedCourierCost: 15000,
    
    // Payment Options
    paymentOptions: [
      { id: 'bni-va', name: 'BNI Virtual Account', icon: '💳', desc: 'Verifikasi instan otomatis 24 jam' },
      { id: 'bni-qris', name: 'QRIS BNI Mobile', icon: '📱', desc: 'Scan langsung via QRIS BNI Mobile' }
    ],
    selectedPaymentMethod: 'BNI Virtual Account',
    
    // Vouchers & Discounts (0 by default unless applied)
    voucherDiscount: 0,
    serviceFee: 1000,
    
    // Calculations
    itemsSubtotal: 0,
    totalAmount: 0,
    itemsSubtotalFormatted: '0',
    shippingCostFormatted: '0',
    discountFormatted: '',
    serviceFeeFormatted: 'Rp 1.000',
    totalAmountFormatted: '0',

    notes: "",
    isLoading: false
  },

  onLoad(query) {
    const mark = query && query.customUrlQueryData;
    const data = mark && my.customUrlQueryData ? my.customUrlQueryData[mark] : null;

    const app = getApp();
    const isDirectBuy = Boolean(data && data.isDirectBuy);
    let initialCart = [];

    if (data && Array.isArray(data.cart) && data.cart.length > 0) {
      initialCart = data.cart;
    } else if (app && app.globalData && Array.isArray(app.globalData.cart) && app.globalData.cart.length > 0) {
      initialCart = app.globalData.cart;
    } else {
      try {
        const storedCart = my.getStorageSync({ key: 'ecom_cart' });
        if (storedCart && storedCart.data && Array.isArray(storedCart.data) && storedCart.data.length > 0) {
          initialCart = storedCart.data;
        }
      } catch (e) {
        console.warn("Error reading ecom_cart storage:", e);
      }
    }

    const storedMerchant = my.getStorageSync({ key: 'ecom_merchant' });
    const merchantObj = (data && (data.merchantInfo || data.storeData)) || (storedMerchant && storedMerchant.data) || (app && app.globalData && app.globalData.merchantInfo);

    const serviceName = (data && (data.serviceName || (data.merchantInfo && data.merchantInfo.name))) || (merchantObj && merchantObj.name) || (initialCart[0] && initialCart[0].merchantName) || "Toko Resmi UMKM";
    const serviceId = (data && (data.serviceId || (data.merchantInfo && data.merchantInfo.id))) || (merchantObj && merchantObj.id) || (initialCart[0] && initialCart[0].storeId) || "store-001";
    const discount = (data && Number(data.voucherDiscount)) || 0;

    this.setData({
      orderType: (data && data.orderType) || "umkm",
      isDirectBuy,
      serviceId,
      serviceName,
      cart: initialCart,
      voucherDiscount: discount,
      customerName: (data && data.customerName) || "Hamzah Diza",
      customerPhone: (data && data.customerPhone) || "081234567890"
    }, () => {
      this.calculateSummary();
    });
  },

  onShow() {
    this.setData({ isLoading: false });
    if (this.data.isDirectBuy && this.data.cart && this.data.cart.length > 0) {
      this.calculateSummary();
      return;
    }
    const app = getApp();
    let latestCart = [];
    if (app && app.globalData && Array.isArray(app.globalData.cart)) {
      latestCart = app.globalData.cart;
    } else {
      try {
        const storedCart = my.getStorageSync({ key: 'ecom_cart' });
        if (storedCart && storedCart.data && Array.isArray(storedCart.data)) {
          latestCart = storedCart.data;
        }
      } catch (e) {
        console.warn("Storage read error onShow:", e);
      }
    }
    this.setData({ cart: latestCart }, () => this.calculateSummary());
  },

  onHide() {
    this.setData({ isLoading: false });
  },

  onBack() {
    my.navigateBack();
  },

  onExploreProducts() {
    this.onBack();
  },

  onIncrease(e) {
    const { index } = e.currentTarget.dataset;
    const { cart } = this.data;
    if (cart[index]) {
      cart[index].quantity = (cart[index].quantity || 1) + 1;
      this.syncCart(cart);
    }
  },

  onDecrease(e) {
    const { index } = e.currentTarget.dataset;
    const { cart } = this.data;
    if (cart[index]) {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
      this.syncCart(cart);
    }
  },

  onRemove(e) {
    const { index } = e.currentTarget.dataset;
    const { cart } = this.data;
    cart.splice(index, 1);
    this.syncCart(cart);
  },

  syncCart(cart) {
    this.setData({ cart }, () => this.calculateSummary());
    if (this.data.isDirectBuy) return;
    const app = getApp();
    if (app && app.globalData) {
      app.globalData.cart = cart;
    }
    try {
      my.setStorageSync({ key: 'ecom_cart', data: cart });
    } catch (e) {
      console.warn("Storage sync error:", e);
    }
  },

  selectCourier(e) {
    const courierId = e.currentTarget.dataset.id;
    const courier = this.data.courierOptions.find(c => c.id === courierId);
    if (courier) {
      this.setData({
        selectedCourierId: courier.id,
        selectedCourierCost: courier.cost
      }, () => this.calculateSummary());
    }
  },

  selectPaymentMethod(e) {
    const method = e.currentTarget.dataset.method;
    this.setData({ selectedPaymentMethod: method });
  },

  onNotesInput(e) {
    this.setData({ notes: e.detail.value || '' });
  },

  calculateSummary() {
    if (!this.data.cart || this.data.cart.length === 0) {
      this.setData({
        itemsSubtotal: 0,
        totalAmount: 0,
        itemsSubtotalFormatted: 'Rp 0',
        shippingCostFormatted: 'Rp 0',
        discountFormatted: '',
        serviceFeeFormatted: 'Rp 0',
        totalAmountFormatted: 'Rp 0'
      });
      return;
    }

    const subtotal = this.data.cart.reduce((sum, it) => sum + ((it.price || 0) * (it.quantity || 1)), 0);
    const shipping = this.data.selectedCourierCost;
    const discount = this.data.voucherDiscount;
    const fee = this.data.serviceFee;
    const grandTotal = Math.max(0, subtotal + shipping - discount + fee);

    const fmt = (v) => `Rp ${(Number(v) || 0).toLocaleString('id-ID')}`;

    this.setData({
      itemsSubtotal: subtotal,
      totalAmount: grandTotal,
      itemsSubtotalFormatted: fmt(subtotal),
      shippingCostFormatted: fmt(shipping),
      discountFormatted: discount > 0 ? `- ${fmt(discount)}` : '',
      serviceFeeFormatted: fmt(fee),
      totalAmountFormatted: fmt(grandTotal)
    });
  },

  async handlePayment() {
    if (this.data.isLoading) return;
    if (this.data.cart.length === 0) {
      my.showToast({ content: 'Keranjang belanja kosong', type: 'none' });
      return;
    }

    this.setData({ isLoading: true });

    try {
      const selectedCourier = this.data.courierOptions.find(c => c.id === this.data.selectedCourierId) || this.data.courierOptions[0];

      // Save personal context
      my.setStorageSync({
        key: 'personalData',
        data: {
          fullName: this.data.customerName,
          phone: this.data.customerPhone
        }
      });

      const firstItem = this.data.cart[0] || {};
      const storeId = this.data.serviceId || firstItem.storeId || "store-001";
      const itemsPayload = this.data.cart.map(item => ({
        productId: item.productId || item.id || 'prod-001',
        productName: item.name,
        variantName: item.variantName || '-',
        price: item.price || 0,
        quantity: item.quantity || 1,
        imageUrl: item.image || item.imageUrl || '',
        sku: item.sku || '-'
      }));

      const orderPayload = {
        storeId,
        buyerId: "CIF-HAMZAH-001",
        buyerName: this.data.customerName || "Hamzah Diza",
        buyerPhone: this.data.customerPhone || "081234567890",
        status: "PENDING",
        items: itemsPayload,
        courierInfo: {
          courierName: selectedCourier.name || "JNE Express",
          service: selectedCourier.service || "Reguler",
          etd: "2-3 Hari",
          cost: selectedCourier.cost || 15000
        },
        shippingCost: selectedCourier.cost || 15000,
        paymentMethod: this.data.selectedPaymentMethod || "BNI Virtual Account",
        buyerAddress: this.data.shippingAddress,
        notes: this.data.notes || ""
      };

      let createdOrder = null;
      try {
        const res = await createEcommerceOrder(orderPayload);
        if (res && res.data && res.data.data) {
          createdOrder = res.data.data;
        } else if (res && res.data) {
          createdOrder = res.data;
        }
      } catch (apiErr) {
        console.warn("createEcommerceOrder API error/fallback:", apiErr);
      }

      const realOrderId = (createdOrder && createdOrder.id) || `ECOM-${Date.now()}`;
      const realOrderNumber = (createdOrder && createdOrder.orderNumber) || `INV-${Date.now().toString().slice(-8)}`;

      const checkoutData = {
        priceCount: {
          value: this.data.totalAmount,
          formatted: this.data.totalAmountFormatted
        },
        personalData: {
          fullName: this.data.customerName,
          phone: this.data.customerPhone
        },
        ticketList: [{
          title: `Pesanan ${this.data.serviceName}`,
          amount: this.data.totalAmount,
          totalDetailTicket: this.data.cart.reduce((sum, i) => sum + (i.quantity || 1), 0)
        }],
        orderData: {
          orderId: realOrderId,
          orderNumber: realOrderNumber,
          serviceName: this.data.serviceName,
          orderType: 'umkm'
        },
        posContext: {
          orderId: realOrderId,
          orderNumber: realOrderNumber,
          orderType: 'umkm',
          isUmkm: true,
          storeId,
          serviceName: this.data.serviceName,
          customerName: this.data.customerName,
          customerPhone: this.data.customerPhone,
          notes: this.data.notes,
          shippingAddress: this.data.shippingAddress,
          courierInfo: selectedCourier,
          totalAmount: this.data.totalAmount,
          items: itemsPayload
        }
      };

      const app = getApp();
      if (!this.data.isDirectBuy && app && app.clearCart) {
        app.clearCart();
      }
      if (app && app.globalData) {
        app.globalData.totalPriceGlobal = this.data.totalAmount;
        app.globalData.eventTitle = `Pesanan ${this.data.serviceName}`;
      }

      customNavigateTo({
        url: "/src/app/package_transaction/pages/gather-transfer/gather-transfer",
        data: checkoutData,
        fail: (navErr) => {
          console.warn("customNavigateTo failed:", navErr);
          this.setData({ isLoading: false });
        }
      });
    } catch (err) {
      console.error("Payment error:", err);
      my.showToast({ content: 'Gagal melanjutkan pembayaran', type: 'fail' });
      this.setData({ isLoading: false });
    }
  }
});

