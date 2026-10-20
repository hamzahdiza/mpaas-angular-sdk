import { getTransactionDetail, getEcommerceOrderDetail, requestEcommerceOrderReturn } from "/src/public/api";
import { currencyFormat } from "/src/utils/currency-util";
import { dateFormatTimeStamp } from "/src/utils/date-util";
import { customNavigateTo } from "/src/utils/route-util";

Page({
  data: {
    isLoading: true,
    isError: false,
    isUmkmOrder: false,
    transactionId: "",
    detailData: {},
    
    // UMKM Order Specifics
    umkmOrder: null,
    trackingSteps: [],
    
    // Return & Complaint Modal
    isReturnModalOpen: false,
    returnReason: "Barang rusak / cacat saat pengiriman",
    returnNotes: "",
    isSubmittingReturn: false,
    returnReasonOptions: [
      "Barang rusak / cacat saat pengiriman",
      "Ukuran / varian / warna tidak sesuai",
      "Barang tidak lengkap / ada item kurang",
      "Barang berbeda dengan foto deskripsi",
      "Lainnya"
    ],
    
    // Event Ticket Specifics
    tickets: [],
    currentTicketIndex: 0,
    currentTicket: {},
    cardQrImage: "",
    ticketModalVisible: false,
    modalQrImage: ""
  },

  async onLoad(query) {
    let queryData = {};
    if (query && query.customUrlQueryData && my.customUrlQueryData && my.customUrlQueryData[query.customUrlQueryData]) {
      queryData = my.customUrlQueryData[query.customUrlQueryData];
    } else {
      queryData = query || {};
    }

    const transactionId = queryData.transactionId || (queryData.historyData && (queryData.historyData.transactionId || queryData.historyData.id)) || (queryData.orderData && queryData.orderData.id) || "a3f1c2e0-9b4d-4e7a-8f6a-2d3b1c4e5f60";
    const isUmkm = queryData.orderType === 'umkm' || (queryData.historyData && queryData.historyData.isUmkm) || (queryData.orderData && queryData.orderData.isUmkm) || String(transactionId).startsWith('ECOM-');

    this.setData({ 
      transactionId,
      isUmkmOrder: Boolean(isUmkm),
      initialHistoryData: queryData.historyData || queryData.orderData || null
    });

    if (isUmkm) {
      await this.fetchUmkmOrderDetail(transactionId);
    } else {
      await this.fetchDetail(transactionId);
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // 1. UMKM E-COMMERCE ORDER DETAIL & RESI TRACKING
  // ═══════════════════════════════════════════════════════════════
  async fetchUmkmOrderDetail(orderId) {
    this.setData({ isLoading: true, isError: false });
    try {
      let order = this.data.initialHistoryData || {};
      
      const res = await getEcommerceOrderDetail(orderId).catch(() => null);
      if (res && res.data && res.data.data) {
        order = { ...order, ...res.data.data };
      }

      const items = Array.isArray(order.items) ? order.items : [];
      const store = order.store || {
        name: "Orbital Official Store & Batik Mahakarya",
        cityName: "Kota Surakarta (Solo)",
        phone: "081234567890",
        logoUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=100"
      };

      const courier = order.courierInfo || {
        courierName: "JNE Express",
        service: "Reguler",
        etd: "2-3 Hari"
      };

      const trackingNumber = order.trackingNumber || (order.status === 'SHIPPED' || order.status === 'DELIVERED' || order.status === 'COMPLETED' ? "JNE8821938120" : null);

      // Build real-time tracking timeline steps based on status
      const status = (order.status || "PAID").toUpperCase();
      let trackingSteps = [];

      if (status === 'PENDING') {
        trackingSteps = [
          {
            title: "Menunggu Pembayaran",
            time: order.createdAt ? dateFormatTimeStamp(order.createdAt, "DD MMM YYYY, HH:mm [WIB]") : "Menunggu Pembayaran",
            desc: "Silakan selesaikan pembayaran via BNI Virtual Account / QRIS sebelum batas waktu berakhir.",
            isDone: false,
            isActive: true
          },
          {
            title: "Pembayaran Diverifikasi & Diproses",
            time: "Menunggu konfirmasi pembayaran",
            desc: "Pembayaran akan diverifikasi secara otomatis melalui Bank BNI.",
            isDone: false,
            isActive: false
          },
          {
            title: "Penjual Menyiapkan Pesanan",
            time: "Menunggu pembayaran",
            desc: "Paket akan diperiksa, dikemas rapi, dan ditempel label pengiriman.",
            isDone: false,
            isActive: false
          },
          {
            title: "Paket Diserahkan ke Kurir",
            time: "Menunggu penjemputan kurir",
            desc: `Paket akan diserahkan ke ${courier.courierName} di origin (${store.cityName}).`,
            isDone: false,
            isActive: false
          },
          {
            title: "Paket Telah Tiba di Alamat Tujuan",
            time: "Estimasi tiba: 2-3 hari kerja",
            desc: "Kurir akan mengantar paket langsung ke alamat tujuan.",
            isDone: false,
            isActive: false
          }
        ];
      } else if (status === 'CANCELLED') {
        trackingSteps = [
          {
            title: "Pesanan Dibatalkan",
            time: order.updatedAt ? dateFormatTimeStamp(order.updatedAt, "DD MMM YYYY, HH:mm [WIB]") : "Pesanan Dibatalkan",
            desc: "Pesanan ini telah dibatalkan. Tidak ada tagihan atau pembayaran yang diproses.",
            isDone: false,
            isActive: true
          }
        ];
      } else {
        // PAID, PROCESSING, SHIPPED, DELIVERED, COMPLETED, RETURNED
        trackingSteps = [
          {
            title: "Pesanan Dibuat & Dibayar",
            time: order.createdAt ? dateFormatTimeStamp(order.createdAt, "DD MMM YYYY, HH:mm [WIB]") : "28 Sep 2026, 09:30 WIB",
            desc: "Pembayaran telah diverifikasi secara otomatis melalui Bank BNI.",
            isDone: true,
            isActive: status === 'PAID'
          },
          {
            title: "Penjual Menyiapkan Pesanan",
            time: status !== 'PAID' ? "28 Sep 2026, 11:15 WIB" : "Menunggu pengemasan oleh toko",
            desc: "Paket sedang diperiksa, dikemas rapi, dan ditempel label pengiriman.",
            isDone: status === 'PROCESSING' || status === 'SHIPPED' || status === 'DELIVERED' || status === 'COMPLETED' || status === 'RETURNED',
            isActive: status === 'PROCESSING'
          },
          {
            title: "Paket Diserahkan ke Kurir",
            time: (status === 'SHIPPED' || status === 'DELIVERED' || status === 'COMPLETED' || status === 'RETURNED') ? "28 Sep 2026, 14:40 WIB" : "Menunggu penjemputan kurir",
            desc: `Paket telah diterima oleh kurir ${courier.courierName} di counter origin (${store.cityName}).`,
            isDone: status === 'SHIPPED' || status === 'DELIVERED' || status === 'COMPLETED' || status === 'RETURNED',
            isActive: false
          },
          {
            title: "Paket Sedang Dalam Perjalanan (Transit)",
            time: (status === 'SHIPPED' || status === 'DELIVERED' || status === 'COMPLETED' || status === 'RETURNED') ? "28 Sep 2026, 21:10 WIB" : "Menunggu proses pengiriman",
            desc: "Paket telah tiba di Hub Gateway Logistik Transit Jakarta dan diteruskan ke kurir pengantar.",
            isDone: status === 'SHIPPED' || status === 'DELIVERED' || status === 'COMPLETED' || status === 'RETURNED',
            isActive: status === 'SHIPPED'
          },
          {
            title: "Paket Telah Tiba di Alamat Tujuan",
            time: (status === 'DELIVERED' || status === 'COMPLETED' || status === 'RETURNED') ? "Hari ini, 10:20 WIB" : "Estimasi tiba: 2-3 hari kerja",
            desc: (status === 'DELIVERED' || status === 'COMPLETED' || status === 'RETURNED') ? "Paket telah diterima dengan baik oleh penerima." : "Kurir akan mengantar paket langsung ke alamat tujuan.",
            isDone: status === 'DELIVERED' || status === 'COMPLETED' || status === 'RETURNED',
            isActive: status === 'DELIVERED'
          }
        ];

        if (status === 'RETURNED') {
          trackingSteps.push({
            title: "Pengajuan Komplain / Retur Barang Aktif",
            time: order.updatedAt ? dateFormatTimeStamp(order.updatedAt, "DD MMM YYYY, HH:mm [WIB]") : "Hari ini, Baru saja",
            desc: "Pembeli mengajukan komplain/retur. Menunggu peninjauan & keputusan persetujuan dari penjual.",
            isDone: false,
            isActive: true
          });
        }
      }

      const subtotal = items.reduce((sum, it) => sum + ((it.price || 0) * (it.quantity || 1)), 0) || order.totalAmount || 385000;
      const shippingCost = order.shippingCost !== undefined ? order.shippingCost : 15000;
      const voucherDiscount = 25000;
      const serviceFee = 1000;
      const finalTotal = order.totalAmount || (subtotal + shippingCost - voucherDiscount + serviceFee);

      const fmt = (v) => `Rp ${(Number(v) || 0).toLocaleString('id-ID')}`;

      let rawPayMethod = order.paymentMethod || "BNI Virtual Account";
      if (rawPayMethod.includes('VA') || rawPayMethod.includes('Virtual')) {
        rawPayMethod = "BNI Virtual Account";
      } else if (rawPayMethod.includes('QRIS')) {
        rawPayMethod = "QRIS BNI Mobile";
      }

      const formattedOrder = {
        ...order,
        status: status,
        orderNumber: order.orderNumber || order.id || `INV-${orderId}`,
        store,
        courier,
        trackingNumber,
        items: items.map(it => ({
          ...it,
          formattedPrice: fmt(it.price || 0),
          formattedSubtotal: fmt((it.price || 0) * (it.quantity || 1))
        })),
        shippingAddress: order.shippingAddress || {
          recipientName: order.buyerName || "Hamzah Diza",
          phone: order.buyerPhone || "081234567890",
          street: "Jl. Sudirman No. 1, Lantai 12, Kebayoran Baru",
          city: "Jakarta Selatan",
          postalCode: "12190"
        },
        paymentMethod: rawPayMethod,
        formattedSubtotal: fmt(subtotal),
        formattedShippingCost: fmt(shippingCost),
        formattedDiscount: `- ${fmt(voucherDiscount)}`,
        formattedServiceFee: fmt(serviceFee),
        formattedTotalAmount: fmt(finalTotal),
        formattedOrderDate: order.createdAt ? dateFormatTimeStamp(order.createdAt, "DD MMM YYYY [•] HH:mm [WIB]") : "28 Sep 2026 • 09:30 WIB",
        statusLabel: this.getUmkmStatusLabel(status)
      };

      this.setData({
        umkmOrder: formattedOrder,
        trackingSteps,
        isLoading: false
      });
    } catch (err) {
      console.error("Failed to fetch UMKM order detail:", err);
      this.setData({ isError: true, isLoading: false });
    }
  },

  getUmkmStatusLabel(status) {
    switch(status) {
      case 'PENDING': return 'Menunggu Pembayaran';
      case 'PAID': return 'Pembayaran Berhasil (Menunggu Pengemasan)';
      case 'PROCESSING': return 'Pesanan Sedang Dikemas Penjual';
      case 'SHIPPED': return 'Pesanan Sedang Dikirim Kurir';
      case 'DELIVERED': return 'Pesanan Telah Sampai di Tujuan';
      case 'COMPLETED': return 'Pesanan Telah Selesai';
      case 'CANCELLED': return 'Pesanan Dibatalkan';
      case 'RETURNED': return 'Pengajuan Pengembalian Barang';
      default: return 'Pesanan Diproses';
    }
  },

  payNow() {
    const order = this.data.umkmOrder;
    if (!order) return;

    const amount = order.totalAmount || (order.items || []).reduce((s, it) => s + ((it.price || 0) * (it.quantity || 1)), 0) + (order.shippingCost || 15000);
    const personalData = {
      fullName: order.buyerName || (order.shippingAddress && order.shippingAddress.recipientName) || "Hamzah Diza",
      phone: order.buyerPhone || (order.shippingAddress && order.shippingAddress.phone) || "081234567890",
      email: "hamzah.diza@orbitalinc.com"
    };

    const checkoutData = {
      totalPrice: amount,
      isPos: true,
      orderType: 'umkm',
      isUmkm: true,
      personalData,
      tickets: [{
        ticketName: order.store ? order.store.name : 'Produk UMKM',
        quantity: (order.items || []).reduce((s, it) => s + (it.quantity || 1), 0) || 1,
        amount: amount,
        totalDetailTicket: (order.items || []).reduce((s, it) => s + (it.quantity || 1), 0) || 1
      }],
      orderData: {
        orderId: order.orderNumber || order.id,
        serviceName: order.store ? order.store.name : 'UMKM',
        orderType: 'umkm'
      },
      posContext: {
        orderType: 'umkm',
        serviceName: order.store ? order.store.name : 'UMKM',
        customerName: personalData.fullName,
        customerPhone: personalData.phone,
        totalAmount: amount,
        items: order.items || []
      }
    };

    const app = getApp();
    if (app && app.globalData) {
      app.globalData.totalPriceGlobal = amount;
      app.globalData.eventTitle = `Pesanan ${order.store ? order.store.name : 'UMKM'}`;
    }

    customNavigateTo({
      url: "/src/app/package_transaction/pages/gather-transfer/gather-transfer",
      data: checkoutData
    });
  },

  copyOrderNumber() {
    const orderNumber = this.data.umkmOrder && (this.data.umkmOrder.orderNumber || this.data.umkmOrder.id);
    if (orderNumber) {
      if (my.setClipboard) {
        my.setClipboard({
          text: orderNumber,
          success: () => {
            my.showToast({ content: 'Nomor Pesanan berhasil disalin!', type: 'success' });
          }
        });
      } else {
        my.showToast({ content: `No. Pesanan: ${orderNumber}` });
      }
    }
  },

  copyTrackingNumber() {
    const resi = this.data.umkmOrder && this.data.umkmOrder.trackingNumber;
    if (resi) {
      if (my.setClipboard) {
        my.setClipboard({
          text: resi,
          success: () => {
            my.showToast({ content: 'Nomor Resi berhasil disalin!', type: 'success' });
          }
        });
      } else {
        my.showToast({ content: `Nomor Resi: ${resi}` });
      }
    }
  },

  contactStore() {
    const store = this.data.umkmOrder && this.data.umkmOrder.store;
    if (store && store.phone) {
      if (my.makePhoneCall) {
        my.makePhoneCall({ number: store.phone });
      } else {
        my.showToast({ content: `Hubungi: ${store.phone}` });
      }
    } else {
      my.showToast({ content: 'Layanan chat penjual aktif 24 jam' });
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. EVENT TICKET DETAILS
  // ═══════════════════════════════════════════════════════════════
  async fetchDetail(transactionId) {
    this.setData({ isLoading: true, isError: false });

    try {
      const response = await getTransactionDetail(transactionId);
      let dataProtected = {};

      if (response) {
        const root = response.data !== undefined ? response.data : response;
        if (root && typeof root === 'object') {
          dataProtected = (root.data && root.data.dataProtected) || root.dataProtected || root.data || root;
        }
      }

      const products = dataProtected.products || dataProtected.tickets || dataProtected.issuedTickets || [];
      const eventName = dataProtected.eventName || dataProtected.serviceName || (this.data.initialHistoryData && this.data.initialHistoryData.eventName) || "Konser Musik BNI 2026";
      const fullName = dataProtected.fullName || dataProtected.customerName || "Putra Nagara";

      const formattedTickets = products.map((item, idx) => {
        const prodName = item.productName || item.ticketName || item.title || item.category || (idx === 0 ? "VIP" : "Regular");
        const bookingCode = item.bookingCode || item.qrCode || item.qrValue || `BOOKING-${(transactionId || '').slice(0, 6).toUpperCase()}-0${idx + 1}`;
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(bookingCode)}`;

        return {
          ...item,
          ticketTitle: `${eventName} - ${prodName}`,
          gate: item.gate || "Pintu A (Barat)",
          category: prodName,
          holderName: item.holderName || fullName,
          bookingCode,
          qrUrl
        };
      });

      const totalAmount = dataProtected.totalAmount || dataProtected.transactionAmount || 1000000;
      let rawDate = dataProtected.transactionDate || dataProtected.createdAt || "2026-08-25T10:18:42+07:00";
      let formattedTransactionDate = rawDate;
      try {
        formattedTransactionDate = dateFormatTimeStamp(rawDate, "DD MMMM YYYY [•] HH:mm [WIB]");
      } catch (e) {}

      let rawEventDate = dataProtected.eventDate || "2026-11-20 19:00:00.000 +0700";
      let formattedEventDate = rawEventDate;
      try {
        formattedEventDate = dateFormatTimeStamp(rawEventDate, "DD MMMM YYYY [•] HH:mm [WIB]");
      } catch (e) {}

      const detailData = {
        ...dataProtected,
        eventName,
        fullName,
        formattedTotalAmount: currencyFormat({ value: totalAmount, currency: 'IDR' }),
        formattedTransactionDate,
        formattedEventDate,
        location: dataProtected.location || "Stadion Utama Gelora Bung Karno",
        maskedAccountNumber: dataProtected.accountNumber ? `•••• ${String(dataProtected.accountNumber).slice(-4)}` : "•••• 5678",
        refId: dataProtected.transactionId || transactionId,
        coreBankingRef: dataProtected.coreBankingRef || "INV-20260825-8891",
        status: (dataProtected.status || "SUCCESS").toUpperCase(),
        statusLabel: dataProtected.status === 'SUCCESS' ? 'Transaksi Berhasil' : (dataProtected.status || 'Berhasil')
      };

      this.setData({
        detailData,
        tickets: formattedTickets,
        currentTicketIndex: 0,
        currentTicket: formattedTickets[0] || {},
        cardQrImage: (formattedTickets[0] && formattedTickets[0].qrUrl) || ""
      });
    } catch (err) {
      console.error("Failed to fetch detail:", err);
      this.setData({ isError: true });
    } finally {
      this.setData({ isLoading: false });
    }
  },

  onPrevTicket() {
    const { currentTicketIndex, tickets } = this.data;
    if (currentTicketIndex > 0) {
      const newIdx = currentTicketIndex - 1;
      this.setData({
        currentTicketIndex: newIdx,
        currentTicket: tickets[newIdx],
        cardQrImage: tickets[newIdx].qrUrl
      });
    }
  },

  onNextTicket() {
    const { currentTicketIndex, tickets } = this.data;
    if (currentTicketIndex < tickets.length - 1) {
      const newIdx = currentTicketIndex + 1;
      this.setData({
        currentTicketIndex: newIdx,
        currentTicket: tickets[newIdx],
        cardQrImage: tickets[newIdx].qrUrl
      });
    }
  },

  onSelectTicketIndex(e) {
    const index = Number(e.currentTarget.dataset.index);
    if (index >= 0 && index < this.data.tickets.length) {
      this.setData({
        currentTicketIndex: index,
        currentTicket: this.data.tickets[index],
        cardQrImage: this.data.tickets[index].qrUrl
      });
    }
  },

  openTicketModal() {
    const current = this.data.currentTicket;
    if (current) {
      this.setData({
        modalQrImage: current.qrUrl,
        ticketModalVisible: true
      });
    }
  },

  closeTicketModal() {
    this.setData({ ticketModalVisible: false });
  },

  openReturnModal() {
    this.setData({
      isReturnModalOpen: true,
      returnReason: "Barang rusak / cacat saat pengiriman",
      returnNotes: ""
    });
  },

  closeReturnModal() {
    this.setData({ isReturnModalOpen: false });
  },

  onSelectReturnReason(e) {
    const reason = e.currentTarget.dataset.reason;
    this.setData({ returnReason: reason });
  },

  onReturnNotesInput(e) {
    this.setData({ returnNotes: e.detail.value });
  },

  async submitReturnRequest() {
    const order = this.data.umkmOrder;
    if (!order) return;

    const orderId = order.id || order.orderNumber;
    const finalReason = this.data.returnNotes 
      ? `${this.data.returnReason}: ${this.data.returnNotes}` 
      : this.data.returnReason;

    this.setData({ isSubmittingReturn: true });

    try {
      await requestEcommerceOrderReturn(orderId, {
        reason: finalReason,
        buyerId: "CIF-HAMZAH-001"
      });

      my.showToast({
        content: 'Pengajuan retur berhasil dikirim!',
        type: 'success'
      });

      this.setData({ isReturnModalOpen: false, isSubmittingReturn: false });
      await this.fetchUmkmOrderDetail(orderId);
    } catch (err) {
      console.error("Failed to submit return request:", err);
      my.showToast({
        content: 'Gagal mengirim pengajuan retur',
        type: 'fail'
      });
      this.setData({ isSubmittingReturn: false });
    }
  },

  goToStore() {
    customNavigateTo({
      url: "/src/app/pages/package_umkm/index/index"
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
