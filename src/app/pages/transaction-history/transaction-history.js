import { getTransactionHistory, getEcommerceOrders } from "/src/public/api";
import { dateFormatTimeStamp } from "/src/utils/date-util";
import { customNavigateTo } from "/src/utils/route-util";

function fmtRupiah(val) {
  const num = Number(val) || 0;
  return `Rp ${num.toLocaleString('id-ID')}`;
}

Page({
  data: {
    isLoading: true,
    isError: false,
    isFromUmkm: false,
    pageTitle: "Riwayat Transaksi",
    currentTab: 'all', // 'all' | 'event' | 'umkm'
    allTransactions: [],
    displayedTransactions: [],
    statusLabels: {
      'pending': 'Menunggu Pembayaran',
      'PENDING': 'Menunggu Pembayaran',
      'PAID': 'Dibayar (Diproses)',
      'accepted': 'Dibayar (Diproses)',
      'PROCESSING': 'Sedang Dikemas',
      'SHIPPED': 'Sedang Dikirim',
      'DELIVERED': 'Paket Tiba',
      'COMPLETED': 'Selesai',
      'completed': 'Selesai',
      'SUCCESS': 'Selesai',
      'CANCELLED': 'Dibatalkan',
      'rejected': 'Dibatalkan',
      'RETURNED': 'Pengembalian Barang',
      'FAILED': 'Gagal'
    }
  },

  onLoad(query) {
    let queryData = {};
    if (query && query.customUrlQueryData && my.customUrlQueryData && my.customUrlQueryData[query.customUrlQueryData]) {
      queryData = my.customUrlQueryData[query.customUrlQueryData];
    } else {
      queryData = query || {};
    }

    const isFromUmkm = queryData.source === 'umkm' || queryData.filter === 'umkm';
    const initialTab = isFromUmkm ? 'umkm' : (queryData.tab || 'all');

    this.setData({
      isFromUmkm,
      currentTab: initialTab,
      pageTitle: isFromUmkm ? 'Riwayat Pesanan UMKM' : 'Riwayat Transaksi'
    });

    this.fetchHistory();
  },

  onPullDownRefresh() {
    this.fetchHistory(() => {
      my.stopPullDownRefresh();
    });
  },

  async fetchHistory(callback) {
    this.setData({ isLoading: true, isError: false });
    try {
      // Default RnD BNI User Profile (CIF / Account / Phone)
      const personalData = (getApp().globalData && getApp().globalData.personalData) || (my.getStorageSync({ key: 'personalData' }) && my.getStorageSync({ key: 'personalData' }).data) || {
        fullName: "Hamzah Diza",
        phone: "081234567890",
        cif: "CIF-HAMZAH-001",
        accountNumber: "1000785003"
      };

      const customerPhone = personalData.phone || "081234567890";

      // 1. Fetch Event / Service Transactions (only if not strictly UMKM mode or when in landing mode)
      let eventOrders = [];
      if (!this.data.isFromUmkm) {
        try {
          const resEvent = await getTransactionHistory({ customerPhone }).catch(() => null);
          if (resEvent) {
            const root = resEvent.data !== undefined ? resEvent.data : resEvent;
            if (Array.isArray(root)) eventOrders = root;
            else if (root && typeof root === 'object') {
              const dp = root.dataProtected || (root.data && root.data.dataProtected);
              if (dp && Array.isArray(dp.historyList)) eventOrders = dp.historyList;
              else if (Array.isArray(root.data)) eventOrders = root.data;
              else if (Array.isArray(root.historyList)) eventOrders = root.historyList;
            }
          }
        } catch (e) {
          console.warn("Event history fetch error:", e);
        }
      }

      // 2. Fetch Real UMKM E-Commerce Orders
      let umkmOrders = [];
      try {
        const resUmkm = await getEcommerceOrders({ buyerPhone: customerPhone }).catch(() => null);
        if (resUmkm && resUmkm.data && Array.isArray(resUmkm.data.data)) {
          umkmOrders = resUmkm.data.data;
        }
      } catch (e) {
        console.warn("UMKM orders fetch error:", e);
      }

      // 3. Format Event Orders
      const formattedEvents = eventOrders.map(item => {
        const rawStatus = (item.status || "completed").toUpperCase();
        const displayStatus = this.data.statusLabels[item.status] || this.data.statusLabels[rawStatus] || item.status;
        const totalAmount = item.totalAmount !== undefined ? item.totalAmount : (item.transactionAmount || item.billAmount || 0);

        let formattedDate = item.createdAt || item.eventDate;
        try {
          if (formattedDate) {
            formattedDate = dateFormatTimeStamp(formattedDate, "DD MMM YYYY [•] HH:mm [WIB]");
          }
        } catch (e) {
          formattedDate = item.createdAt;
        }

        return {
          ...item,
          isUmkm: false,
          orderType: item.orderType || 'event',
          transactionId: item.id || item.transactionId || `TRX-${Math.random()}`,
          title: item.serviceName || item.eventName || "Tiket Event Lifestyle",
          subtitle: item.location || "Venue Acara BNI Lifestyle",
          formattedAmount: fmtRupiah(totalAmount),
          totalAmount: totalAmount,
          formattedDate: formattedDate || "25 Agu 2026 • 10:18 WIB",
          displayStatus,
          status: rawStatus === 'COMPLETED' ? 'SUCCESS' : rawStatus,
          quantity: item.quantity || item.ticketCount || (item.tickets ? item.tickets.length : 1),
          categoryIcon: this.getIcon(item.orderType)
        };
      });

      // 4. Format UMKM Orders
      const formattedUmkm = umkmOrders.map(order => {
        const rawStatus = (order.status || "PAID").toUpperCase();
        const displayStatus = this.data.statusLabels[rawStatus] || rawStatus;
        const items = Array.isArray(order.items) ? order.items : [];
        const firstItem = items[0] || {};
        const totalQuantity = items.reduce((sum, it) => sum + (it.quantity || 1), 0);

        let formattedDate = order.createdAt || order.paidAt;
        try {
          if (formattedDate) {
            formattedDate = dateFormatTimeStamp(formattedDate, "DD MMM YYYY [•] HH:mm [WIB]");
          }
        } catch (e) {
          formattedDate = order.createdAt;
        }

        return {
          ...order,
          isUmkm: true,
          orderType: 'umkm',
          transactionId: order.id,
          orderNumber: order.orderNumber || order.id,
          storeName: (order.store && order.store.name) || "Orbital Official Store & Batik Mahakarya",
          storeLogo: (order.store && order.store.logoUrl) || "https://images.unsplash.com/photo-1544816155-12df9643f363?w=100",
          title: firstItem.productName || "Produk UMKM Pilihan BNI",
          itemImage: firstItem.imageUrl || ((firstItem.images && firstItem.images[0]) || "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300"),
          variantName: firstItem.variantName || "-",
          firstItemPrice: fmtRupiah(firstItem.price || order.totalAmount),
          firstItemQty: firstItem.quantity || 1,
          otherItemsCount: Math.max(0, items.length - 1),
          totalQuantity: totalQuantity || 1,
          trackingNumber: order.trackingNumber,
          courierName: (order.courierInfo && order.courierInfo.courierName) || "JNE Express",
          courierService: (order.courierInfo && order.courierInfo.service) || "Reguler (2-3 Hari)",
          formattedAmount: fmtRupiah(order.totalAmount || 0),
          totalAmount: order.totalAmount || 0,
          formattedDate: formattedDate || "28 Sep 2026 • 09:30 WIB",
          displayStatus,
          status: rawStatus,
          categoryIcon: '🛍️'
        };
      });

      // Combine and sort by date descending (newest created first)
      const combined = this.data.isFromUmkm ? formattedUmkm : [...formattedUmkm, ...formattedEvents];
      combined.sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : (a.eventDate ? new Date(a.eventDate).getTime() : 0);
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : (b.eventDate ? new Date(b.eventDate).getTime() : 0);
        return timeB - timeA;
      });
      
      this.setData({
        allTransactions: combined,
        displayedTransactions: this.filterListByTab(combined, this.data.currentTab)
      });
    } catch (err) {
      console.error("Failed to fetch transaction history:", err);
      this.setData({ isError: true });
      my.showToast({ content: 'Gagal memuat riwayat transaksi' });
    } finally {
      this.setData({ isLoading: false });
      if (callback) callback();
    }
  },

  filterListByTab(list, tab) {
    if (tab === 'event') {
      return list.filter(item => !item.isUmkm);
    } else if (tab === 'umkm') {
      return list.filter(item => item.isUmkm);
    }
    return list;
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      currentTab: tab,
      displayedTransactions: this.filterListByTab(this.data.allTransactions, tab)
    });
  },

  payNow(e) {
    const id = e.currentTarget.dataset.id;
    const order = this.data.allTransactions.find(item => item.transactionId === id || item.id === id);
    if (!order) return;

    const personalData = (my.getStorageSync({ key: 'personalData' }) && my.getStorageSync({ key: 'personalData' }).data) || {
      fullName: "Hamzah Diza",
      phone: "081234567890",
      accountNumber: "1000785003"
    };

    const amount = order.totalAmount || 0;
    const formattedAmount = fmtRupiah(amount);

    const checkoutData = {
      priceCount: {
        value: amount,
        formatted: formattedAmount
      },
      personalData,
      accountNumber: personalData.accountNumber || "1000785003",
      ticketList: [{
        title: `Pesanan ${order.storeName || order.title || 'UMKM'}`,
        amount: amount,
        totalDetailTicket: order.totalQuantity || 1
      }],
      orderData: {
        orderId: order.orderNumber || order.id || `ECOM-${Date.now().toString().slice(-6)}`,
        serviceName: order.storeName || order.title || 'UMKM',
        orderType: order.isUmkm ? 'umkm' : 'event'
      },
      posContext: {
        orderType: order.isUmkm ? 'umkm' : 'event',
        serviceName: order.storeName || order.title || 'UMKM',
        customerName: personalData.fullName,
        customerPhone: personalData.phone,
        totalAmount: amount,
        items: order.items || []
      }
    };

    const app = getApp();
    if (app && app.globalData) {
      app.globalData.totalPriceGlobal = amount;
      app.globalData.eventTitle = `Pesanan ${order.storeName || order.title || 'UMKM'}`;
    }

    customNavigateTo({
      url: "/src/app/package_transaction/pages/gather-transfer/gather-transfer",
      data: checkoutData
    });
  },

  getIcon(type) {
    switch(type) {
      case 'event': return '🎟️';
      case 'hotel': return '🏨';
      case 'cafe':
      case 'restaurant': return '🍴';
      case 'rental': return '🚗';
      case 'umkm': return '🛍️';
      default: return '📦';
    }
  },

  goToDetail(e) {
    const { id, isumkm } = e.currentTarget.dataset;
    const selected = this.data.allTransactions.find((item) => item.transactionId === id || item.id === id) || {};

    customNavigateTo({
      url: "/src/app/pages/transaction-history-detail/transaction-history-detail",
      data: {
        transactionId: id,
        orderType: (isumkm || selected.isUmkm) ? 'umkm' : (selected.orderType || 'event'),
        historyData: selected,
        orderData: selected
      }
    });
  },

  goToHome() {
    if (my.reLaunch) {
      my.reLaunch({ url: "/src/app/pages/landing/landing" });
    } else {
      my.redirectTo({ url: "/src/app/pages/landing/landing" });
    }
  }
});
