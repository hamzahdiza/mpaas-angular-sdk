import { currencyFormat } from "/src/utils/currency-util";

Component({
  mixins: [],
  data: {
    totalAmount: 0,
    totalTicket: 0,
    fromatedTotalAmount: "Rp0",
    runningData: {}
  },
  props: {
    runningData: {},
    onBook: () => {}
  },

  didMount() {
    this.initData();
  },

  didUpdate(prevProps) {
    if (prevProps.runningData !== this.props.runningData) {
      this.initData();
    }
  },

  methods: {
    initData() {
      const data = this.props.runningData || {};
      if (!data) return;

      let categories = data.categories || [];
      const rawTickets = data.ticketCategories || data.tickets || data.ticket_tiers || [];

      if (!categories || categories.length === 0) {
        if (rawTickets && rawTickets.length > 0) {
          categories = [{
            id: data.id || 'cat_main',
            name: data.name || 'Kategori Tiket',
            description: data.description || '',
            tickets: rawTickets.map((t) => {
              const ticketId = t.id || t.ticket_id || t.ticketId || `t_${Math.random()}`;
              const rawPrice = Number(t.price !== undefined ? t.price : (t.ticket_price || 0));
              const rawNormalPrice = Number(t.normalPrice || t.normal_price || t.maxPrice || t.max_price || t.originalPrice || t.original_price || t.ticket_normal_price || t.ticketNormalPrice || 0);
              const rawDiscountedPrice = (t.discountedPrice !== undefined && t.discountedPrice !== null) ? Number(t.discountedPrice) : 
                                         (t.discounted_price !== undefined && t.discounted_price !== null) ? Number(t.discounted_price) :
                                         (t.discountPrice !== undefined && t.discountPrice !== null) ? Number(t.discountPrice) :
                                         (t.discount_price !== undefined && t.discount_price !== null) ? Number(t.discount_price) : null;

              let price = rawPrice;
              let normalPrice = rawNormalPrice;

              if (rawDiscountedPrice !== null && rawDiscountedPrice < rawPrice && rawDiscountedPrice > 0) {
                price = rawDiscountedPrice;
                normalPrice = rawPrice;
              } else if (rawNormalPrice > rawPrice && rawPrice > 0) {
                price = rawPrice;
                normalPrice = rawNormalPrice;
              }

              const totalStock = t.stock !== undefined ? t.stock : (t.ticket_stock !== undefined ? t.ticket_stock : 999);
              const sold = t.ticketsSold !== undefined ? t.ticketsSold : (t.tickets_sold !== undefined ? t.tickets_sold : (t.sold !== undefined ? t.sold : 0));
              const stock = t.remainingStock !== undefined ? t.remainingStock : (t.remaining_stock !== undefined ? t.remaining_stock : Math.max(0, totalStock - sold));
              return {
                id: ticketId,
                ticketId: ticketId,
                name: t.name || t.ticket_name || t.ticketName || 'Tiket',
                price: price,
                normalPrice: normalPrice,
                stock: stock,
                remainingStock: stock,
                description: t.description || t.ticket_description || '',
                type: t.type || t.ticket_type || 'regular',
                isAvailable: stock > 0 ? 1 : 0
              };
            })
          }];
        }
      }

      const runningData = {
        ...data,
        name: data.name || data.eventName || 'Event',
        description: data.description || '',
        bannerUrl: data.bannerUrl || (data.bannerUrls && data.bannerUrls[0]) || (data.images && data.images[0]) || '',
        categories: (categories || []).map((cat) => ({
          ...cat,
          tickets: ((cat.tickets && cat.tickets.length > 0) ? cat.tickets : [cat]).map((t) => {
            const ticketId = t.id || t.ticket_id || t.ticketId || `t_${Math.random()}`;
            const rawPrice = Number(t.price !== undefined ? t.price : (t.ticket_price || 0));
            const rawNormalPrice = Number(t.normalPrice || t.normal_price || t.maxPrice || t.max_price || t.originalPrice || t.original_price || t.ticket_normal_price || t.ticketNormalPrice || cat.normalPrice || cat.maxPrice || 0);
            const rawDiscountedPrice = (t.discountedPrice !== undefined && t.discountedPrice !== null) ? Number(t.discountedPrice) : 
                                       (t.discounted_price !== undefined && t.discounted_price !== null) ? Number(t.discounted_price) :
                                       (t.discountPrice !== undefined && t.discountPrice !== null) ? Number(t.discountPrice) :
                                       (t.discount_price !== undefined && t.discount_price !== null) ? Number(t.discount_price) : null;

            let price = rawPrice;
            let normalPrice = rawNormalPrice;

            if (rawDiscountedPrice !== null && rawDiscountedPrice < rawPrice && rawDiscountedPrice > 0) {
              price = rawDiscountedPrice;
              normalPrice = rawPrice;
            } else if (rawNormalPrice > rawPrice && rawPrice > 0) {
              price = rawPrice;
              normalPrice = rawNormalPrice;
            }

            const totalStock = t.stock !== undefined ? t.stock : (t.ticket_stock !== undefined ? t.ticket_stock : 999);
            const sold = t.ticketsSold !== undefined ? t.ticketsSold : (t.tickets_sold !== undefined ? t.tickets_sold : (t.sold !== undefined ? t.sold : 0));
            const stock = t.remainingStock !== undefined ? t.remainingStock : (t.remaining_stock !== undefined ? t.remaining_stock : Math.max(0, totalStock - sold));
            return {
              ...t,
              id: ticketId,
              ticketId: ticketId,
              name: t.name || t.ticket_name || t.ticketName || cat.name || 'Tiket',
              price: price,
              normalPrice: normalPrice,
              stock: stock,
              remainingStock: stock,
              isAvailable: stock > 0 ? 1 : 0,
              order: 0,
              formatPrice: currencyFormat({ value: price }),
              formatNormalPrice: (normalPrice > price && normalPrice > 0) ? currencyFormat({ value: normalPrice }) : ""
            };
          })
        }))
      };

      this.setData({
        runningData,
        totalAmount: 0,
        totalTicket: 0,
        fromatedTotalAmount: "Rp0"
      });
    },

    handlePlus(e) {
      const ds = e.currentTarget.dataset || {};
      const targetTicketId = ds.ticketid || ds.ticketId;
      const runningData = this.data.runningData;

      console.log("[handlePlus Template 4] Target Ticket ID:", targetTicketId);

      if (!targetTicketId) return;

      let totalAmount = 0;
      let totalTicket = 0;

      (runningData.categories || []).forEach((cat) => {
        (cat.tickets || []).forEach((t) => {
          if (String(t.id) === String(targetTicketId) || String(t.ticketId) === String(targetTicketId)) {
            const maxStock = t.stock !== undefined ? t.stock : 999;
            if (maxStock > (t.order || 0)) {
              t.order = (t.order || 0) + 1;
            } else {
              my.showToast({ content: "Jumlah melebihi kuota tiket yang tersedia" });
            }
          }
          totalAmount += (t.order || 0) * (t.price || 0);
          totalTicket += (t.order || 0);
        });
      });

      this.setData({
        runningData,
        totalAmount,
        totalTicket,
        fromatedTotalAmount: currencyFormat({ value: totalAmount })
      });
    },

    handleRemove(e) {
      const ds = e.currentTarget.dataset || {};
      const targetTicketId = ds.ticketid || ds.ticketId;
      const runningData = this.data.runningData;

      if (!targetTicketId) return;

      let totalAmount = 0;
      let totalTicket = 0;

      (runningData.categories || []).forEach((cat) => {
        (cat.tickets || []).forEach((t) => {
          if ((String(t.id) === String(targetTicketId) || String(t.ticketId) === String(targetTicketId)) && (t.order || 0) > 0) {
            t.order -= 1;
          }
          totalAmount += (t.order || 0) * (t.price || 0);
          totalTicket += (t.order || 0);
        });
      });

      this.setData({
        runningData,
        totalAmount,
        totalTicket,
        fromatedTotalAmount: currencyFormat({ value: totalAmount })
      });
    },

    handleMaxStock() {
      my.showToast({ content: "Jumlah melebihi kuota tiket yang tersedia" });
    },

    handleBooking() {
      const { runningData, totalAmount, totalTicket } = this.data;

      if (totalTicket <= 0 || totalAmount <= 0) {
        return my.showToast({ content: "Silakan pilih tiket terlebih dahulu" });
      }

      const selectedTickets = [];
      const selectedTicketLegacy = [];

      (runningData.categories || []).forEach((cat) => {
        (cat.tickets || []).forEach((t) => {
          if ((t.order || 0) > 0) {
            selectedTickets.push({
              ticketId: t.id || t.ticketId,
              id: t.id || t.ticketId,
              name: t.name || cat.name,
              ticketName: t.name || cat.name,
              categoryId: cat.id,
              categoryName: cat.name,
              category2: cat.id,
              category3: `${t.id || t.ticketId}_regular`,
              price: t.price,
              ticketQty: t.order,
              total: t.order,
              totalPrice: t.price * t.order
            });

            selectedTicketLegacy.push({
              maxOrder: t.stock || 10,
              total: t.order,
              category3List: [`${t.id || t.ticketId}_regular`],
              ticketIdList: [t.id || t.ticketId],
              tickets: [{
                ticketId: t.id || t.ticketId,
                ticketName: t.name || cat.name,
                title: t.name || cat.name,
                category: cat.id,
                category2: cat.id,
                category3: `${t.id || t.ticketId}_regular`,
                type: t.type || "regular",
                price: t.price,
                priceTaxService: t.price,
                totalPrice: t.price * t.order,
                count: t.order,
                total: t.order,
                orderAdd: t.order,
                isAvailable: 1,
                ticketDate: runningData.startDate || "",
                formatedTicketDate: runningData.formattedDate || "",
                formatPrice: currencyFormat({ value: t.price }),
                formatPriceTaxService: currencyFormat({ value: t.price }),
                description: [t.description || ""]
              }]
            });
          }
        });
      });

      const bookingPayload = {
        accountNumber: runningData.accountNumber || runningData.accountNumberBNI || "",
        selectedTicket: selectedTicketLegacy,
        tickets: selectedTickets,
        priceCount: totalAmount,
        totalAmount: totalAmount,
        ticketCount: totalTicket,
        ticketData: selectedTickets,
        eventDetail: runningData,
        runningData: runningData,
        autoSingleVisitor: false
      };

      getApp().globalData.totalPriceGlobal = totalAmount;
      getApp().globalData.eventTitle = runningData.name;

      console.log("[Template 4] Dispatching Booking Payload:", bookingPayload);
      this.props.onBook(bookingPayload);
    }
  }
});