import {
  currencyFormat
} from "/src/utils/currency-util"
import {
  dateFormat,
  formatDateTreeDays
} from "/src/utils/date-util";
import {
  getListTicket,
  getPersonalData
} from "/src/public/api"
import {
  customNavigateTo
} from "/src/utils/route-util";
import generalError from "/src/utils/generalError";
import {
  firebaseEvent,
  firebaseScreenView
} from "/src/utils/firebaseTracker";

/* JShield-obfus:enable */
Page({
  data: {
    lang: Object(),
    resize: Boolean(),
    dataTicket: Array(),
    count: Number(0),
    totalAmount: Number(0),
    totalPrice: Number(0),
    totalTicket: Number(),
    ticketBuy: Array(),
    isCopyTriggered: Boolean(false),
    tabActive: Number(0),
    isLoading: Boolean(false),
    showTab: Boolean(true),
    ticketData: Object({}),
    eventDetail: Object({}),
    errorApi: Boolean(),
    tabFilter: Array()
  },

  onLoad(query) {
    firebaseScreenView("javaJazzFestivalListTicketScreen", "javaJazzFestivalListTicketScreen")
    const lang = getApp().globalData.languagePack;
    const {
      ticketData,
      eventDetail
    } = my.customUrlQueryData[query.customUrlQueryData];
    this.setData({
      ticketData,
      eventDetail,
      templateId:  eventDetail.templateId || 1
    })

    this.setData({
      lang,
      tabFilter: [{
        title: lang.javaJazzFestivalListTicketScreenCategoryPromoLabel || "Promo"
      },
      {
        title: lang.javaJazzFestivalListTicketScreenCategoryRegularLabel || "Regular"
      }
      ]
    })
    this.getDataTicket()
  },

  async getDataTicket() {
    try {
      this.setData({
        isLoading: true,
      })

      const { ticketData, eventDetail } = this.data;
      let rawPromoList = [];
      let rawRegulerList = [];
      let rawValidation = [];

      // 1. Check if tickets are already present in eventDetail or ticketData
      const sourceTickets = (eventDetail && (eventDetail.ticketCategories || eventDetail.tickets || eventDetail.ticket_tiers)) ||
        (Array.isArray(ticketData) ? ticketData : (ticketData && (ticketData.ticketCategories || ticketData.tickets || ticketData.ticket_tiers))) || [];

      if (sourceTickets && sourceTickets.length > 0) {
        console.log("[Book Ticket] Using embedded ticketCategories from eventDetail:", sourceTickets);
        
        for (const cat of sourceTickets) {
          const catId = cat.id || cat.ticket_id || cat.ticketId || `tc_${Math.random()}`;
          const catName = cat.name || cat.ticket_name || cat.ticketName || cat.title || 'Tiket Masuk';
          const remainingStock = cat.remainingStock !== undefined ? cat.remainingStock : (cat.remaining_stock !== undefined ? cat.remaining_stock : (cat.stock !== undefined ? cat.stock : (cat.ticket_stock !== undefined ? cat.ticket_stock : 999)));
          const maxOrder = Math.min(10, remainingStock > 0 ? remainingStock : 10);
          const isPromo = Boolean(cat.isPromoActive || (cat.discountedPrice && cat.discountedPrice < cat.price) || (cat.type && cat.type.toLowerCase().includes('promo')));
          const effectivePrice = isPromo && cat.discountedPrice ? cat.discountedPrice : (cat.price || cat.ticket_price || 0);
          const oldPrice = isPromo ? (cat.normalPrice || cat.ticket_normal_price || cat.price || 0) : 0;

          rawValidation.push({
            ticketIdList: [catId],
            maxOrder: remainingStock > 0 ? maxOrder : 0
          });

          const itemObj = {
            ticketId: catId,
            id: catId,
            ticketName: catName,
            name: catName,
            category: catName,
            type: isPromo ? (cat.type || 'disc25') : 'regular',
            price: effectivePrice,
            priceTaxService: effectivePrice,
            oldPrice: oldPrice,
            isAvailable: remainingStock > 0 ? 1 : 0,
            stock: remainingStock,
            remainingStock: remainingStock,
            description: Array.isArray(cat.description) ? cat.description : [cat.description || (cat.ticket_description || 'Akses masuk event')],
            ticketDate: eventDetail.startDate || eventDetail.date || '',
          };

          if (isPromo) {
            rawPromoList.push(itemObj);
          } else {
            rawRegulerList.push(itemObj);
          }
        }

        // If no promo tickets exist, all go to regulerList
        if (rawPromoList.length === 0 && rawRegulerList.length === 0) {
          rawRegulerList = sourceTickets.map(cat => ({
            ticketId: cat.id || cat.ticket_id || cat.ticketId,
            ticketName: cat.name || cat.ticket_name || 'Tiket',
            category: cat.name || 'Regular',
            type: 'regular',
            price: cat.price || 0,
            priceTaxService: cat.price || 0,
            oldPrice: 0,
            isAvailable: 1,
            stock: cat.stock || 10,
            description: [cat.description || ''],
            ticketDate: eventDetail.startDate || ''
          }));
        }
      } else {
        // 2. Fetch from API fallback
        const headers = {
          "Screen-Id": "javaJazzFestivalListTicketScreen",
        }
        const params = (ticketData && ticketData.id) || (eventDetail && eventDetail.id) || "";
        console.log("[Book Ticket] Fetching from getListTicket:", params);
        const res = await getListTicket(params, headers);
        const decryptData = res.data && res.data.dataProtected ? res.data.dataProtected : {};
        rawValidation = decryptData.validation || [];
        rawPromoList = decryptData.promoList || [];
        rawRegulerList = decryptData.regulerList || [];
      }

      const maxOrderMap = rawValidation.reduce((map, { ticketIdList, maxOrder }) => {
        (ticketIdList || []).forEach(ticketId => {
          map[ticketId] = maxOrder;
        });
        return map;
      }, {});

      let dataPromoList = [];
      let dataRegulerList = [];
      let tabActive = 0;
      let showTab = true;

      if (rawPromoList.length > 0) {
        dataPromoList = this.formaterDataTicket(rawPromoList, maxOrderMap);
      }

      if (rawRegulerList.length > 0) {
        dataRegulerList = this.formaterDataTicket(rawRegulerList, maxOrderMap);
      }

      if (dataPromoList.length > 0 && dataRegulerList.length > 0) {
        showTab = true;
        tabActive = 0;
      } else if (dataRegulerList.length > 0 && dataPromoList.length === 0) {
        showTab = false;
        tabActive = 1; // Tab 1 maps to dataRegulerList in templates
      } else if (dataPromoList.length > 0 && dataRegulerList.length === 0) {
        showTab = false;
        tabActive = 0; // Tab 0 maps to dataPromoList in templates
      }

      const dataListTicket = {
        validation: rawValidation,
        promoList: rawPromoList,
        regulerList: rawRegulerList
      };

      const primaryType = (dataRegulerList[0] && dataRegulerList[0].type) || (dataPromoList[0] && dataPromoList[0].type) || 'regular';

      this.setData({
        dataPromoList,
        dataRegulerList,
        dataListTicket,
        selectedTicket: rawValidation,
        typeTicket: primaryType,
        tabActive,
        showTab,
        isLoading: false,
        totalTicket: 0,
        totalAmount: 0,
        totalPrice: currencyFormat({ value: 0, currency: "IDR", isPrefix: false }) || "0"
      });

    } catch (err) {
      this.setData({
        isLoading: false
      });
      console.log(err, "<<<<< book ticket err");
      generalError({
        err,
        isSwipe: true,
      });
    }
  },

  formatTicketDate(item) {
    const locale = getApp().globalData.dayjsLocale || 'id';
    if (!item.ticketDate) return '';

    if (item.category === 'three_days_pass') {
      return locale === 'id' ? formatDateTreeDays(item.ticketDate) :
        locale === 'en' ? item.ticketDate :
          dateFormat(item.ticketDate, "dddd, DD MMM YYYY", locale);
    }

    return dateFormat(item.ticketDate, "dddd, DD MMM YYYY", locale);
  },

  formaterDataTicket(data, maxOrderMap) {
    return data.map(item => {
      const formattedTicketDate = this.formatTicketDate(item);
      const priceVal = item.priceTaxService !== undefined ? item.priceTaxService : item.price;
      const formattedPrice = currencyFormat({
        value: priceVal
      });
      const formattedOldPrice = item.oldPrice > 0 ? currencyFormat({
        value: item.oldPrice
      }) : undefined;

      const ticketKey = item.ticketId || item.id;

      return {
        ...item,
        ticketId: ticketKey,
        id: ticketKey,
        formatedTicketDate: formattedTicketDate,
        formatPriceTaxService: formattedPrice,
        formatPrice: formattedPrice,
        count: 0,
        total: 0,
        oldPriceFormat: formattedOldPrice,
        maxOrder: maxOrderMap[ticketKey] !== undefined ? maxOrderMap[ticketKey] : (item.stock || 10),
      };
    });
  },

  handleResize() {
    this.setData({
      resize: !this.data.resize
    })
  },

  handleRemove(e) {
    const {
      count,
      amount,
      type,
      ticketId,
      countAdd
    } = e.currentTarget.dataset;

    const {
      dataPromoList,
      dataRegulerList,
      ticketBuy,
      totalTicket,
      totalAmount,
      typeTicket,
      dataListTicket
    } = this.data;

    const ticketList = type === typeTicket ? dataRegulerList : dataPromoList;

    const updatedTicketList = ticketList.map(item =>
      String(item.ticketId) === String(ticketId)
        ? {
          ...item,
          count: count - 1,
          total: item.total - countAdd,
        }
        : item
    );

    const updatedTicketBuy = ticketBuy
      .map(ticket =>
        String(ticket.ticketId) === String(ticketId)
          ? {
            ...ticket,
            total: ticket.total - countAdd,
            totalPrice: ticket.totalPrice - amount,
            orderAdd: count - 1,
          }
          : ticket
      )
      .filter(ticket => ticket.total > 0);

    const newTotalAmount = totalAmount - amount;

    const formattedTicketBuy = updatedTicketBuy.map(ticket => ({
      ...ticket,
      formatPrice: currencyFormat({
        value: ticket.price
      }),
    }));

    const tempDataListTicket = { ...dataListTicket };

    const validationItem = (tempDataListTicket.validation || []).find(item =>
      (item.ticketIdList || []).some(id => String(id) === String(ticketId))
    );

    if (validationItem) {
      if (!validationItem.tickets) {
        validationItem.tickets = [];
      }

      const existingTicketIndex = validationItem.tickets.findIndex(
        ticket => String(ticket.ticketId) === String(ticketId)
      );
      validationItem.maxOrder = (validationItem.maxOrder || 0) + 1;

      const updatedTicketData = updatedTicketBuy.find(ticket => String(ticket.ticketId) === String(ticketId));

      if (existingTicketIndex !== -1) {
        if (updatedTicketData) {
          validationItem.tickets[existingTicketIndex] = { ...updatedTicketData };
          validationItem.tickets = validationItem.tickets.map(item => ({
            ...item,
            maxOrder: validationItem.maxOrder
          }));
        } else {
          validationItem.tickets.splice(existingTicketIndex, 1);
        }
      }
    }
    this.setData({
      [type === typeTicket ? 'dataRegulerList' : 'dataPromoList']: updatedTicketList,
      totalTicket: totalTicket - countAdd,
      totalPrice: currencyFormat({
        value: newTotalAmount,
        currency: "IDR",
        isPrefix: false
      }),
      totalAmount: newTotalAmount,
      ticketBuy: formattedTicketBuy,
      dataListTicket: tempDataListTicket
    });


    const updateDataRegulerList = this.data.dataRegulerList.map(item => {
      const validationData = tempDataListTicket.validation.find(data =>
        (data.ticketIdList || []).some(id => String(id) === String(item.ticketId))
      );
      return validationData ? { ...item, maxOrder: validationData.maxOrder } : item;
    });
    const updateDataPromoList = this.data.dataPromoList.map(item => {
      const validationData = tempDataListTicket.validation.find(data =>
        (data.ticketIdList || []).some(id => String(id) === String(item.ticketId))
      );

      return validationData ? { ...item, maxOrder: validationData.maxOrder } : item;
    });

    this.setData({
      dataRegulerList: updateDataRegulerList,
      dataPromoList: updateDataPromoList
    });
  },

  handlePlus(e) {
    const { count, amount, title, type, ticketId, countAdd } = e.currentTarget.dataset;
    const {
      dataPromoList,
      dataRegulerList,
      ticketBuy,
      totalTicket,
      totalAmount,
      typeTicket,
      dataListTicket,
      eventDetail
    } = this.data;

    const tempDataListTicket = { ...dataListTicket };

    const purchaseMode = (eventDetail && (eventDetail.vendorConfig && eventDetail.vendorConfig.purchaseMode)) || eventDetail.purchaseMode || 'multiple';
    if (purchaseMode === 'single' && totalTicket >= 1) {
      return;
    }

    const ticketList = type === typeTicket ? dataRegulerList : dataPromoList;
    const targetTicket = ticketList.find(item => String(item.ticketId) === String(ticketId));

    const updatedTicketList = ticketList.map(item =>
      String(item.ticketId) === String(ticketId)
        ? {
          ...item,
          count: count + 1,
          total: item.total + countAdd,
        }
        : item
    );

    const updatedTicketBuy = ticketBuy.map(ticket =>
      String(ticket.ticketId) === String(ticketId)
        ? {
          ...ticket,
          total: ticket.total + countAdd,
          totalPrice: ticket.totalPrice + amount,
          orderAdd: count + 1,
        }
        : ticket
    );

    if (!ticketBuy.some(ticket => String(ticket.ticketId) === String(ticketId))) {
      updatedTicketBuy.push({
        ...targetTicket,
        title: title || targetTicket.ticketName || 'Tiket',
        total: countAdd,
        totalPrice: amount,
        orderAdd: 1
      });
    }

    const validationItemAdd = (tempDataListTicket.validation || []).find(item =>
      (item.ticketIdList || []).some(id => String(id) === String(ticketId))
    );

    if (validationItemAdd) {
      if (!validationItemAdd.tickets) {
        validationItemAdd.tickets = [];
      }

      const existingTicketIndexAdd = validationItemAdd.tickets.findIndex(
        ticket => String(ticket.ticketId) === String(ticketId)
      );
      validationItemAdd.maxOrder = (validationItemAdd.maxOrder || 0) - 1;

      const updatedTicketData = updatedTicketBuy.find(ticket => String(ticket.ticketId) === String(ticketId));

      if (existingTicketIndexAdd !== -1) {
        validationItemAdd.tickets[existingTicketIndexAdd] = { ...updatedTicketData };
        validationItemAdd.tickets = validationItemAdd.tickets.map(item => ({
          ...item,
          maxOrder: validationItemAdd.maxOrder
        }));
      } else {
        validationItemAdd.tickets.push({ ...updatedTicketData });
      }
    }

    const newTotalAmount = totalAmount + amount;

    const formattedTicketBuy = updatedTicketBuy.map(ticket => ({
      ...ticket,
      formatPrice: currencyFormat({
        value: ticket.price
      }),
    }));

    this.setData({
      [type === typeTicket ? 'dataRegulerList' : 'dataPromoList']: updatedTicketList,
      totalTicket: totalTicket + countAdd,
      totalPrice: currencyFormat({
        value: newTotalAmount,
        currency: "IDR",
        isPrefix: false
      }),
      totalAmount: newTotalAmount,
      ticketBuy: formattedTicketBuy,
      selectedTicket: tempDataListTicket.validation,
    });

    const updateDataRegulerListAdd = this.data.dataRegulerList.map(item => {
      const validationData = (tempDataListTicket.validation || []).find(data =>
        (data.ticketIdList || []).some(id => String(id) === String(item.ticketId))
      );
      return validationData ? { ...item, maxOrder: validationData.maxOrder } : item;
    });
    const updateDataPromoListAdd = this.data.dataPromoList.map(item => {
      const validationData = (tempDataListTicket.validation || []).find(data =>
        (data.ticketIdList || []).some(id => String(id) === String(item.ticketId))
      );
      return validationData ? { ...item, maxOrder: validationData.maxOrder } : item;
    });

    this.setData({
      dataRegulerList: updateDataRegulerListAdd,
      dataPromoList: updateDataPromoListAdd
    });

    const finalList = type === typeTicket ? updateDataRegulerListAdd : updateDataPromoListAdd;
    const targetUpdated = finalList.find(item => String(item.ticketId) === String(ticketId));
    if (targetUpdated && 0 === targetUpdated.maxOrder) {
      this.setData({
        isCopyTriggered: true,
        isToastIn: true
      });
      setTimeout(() => this.setData({ isToastIn: false }), 1000);
      setTimeout(() => this.setData({ isCopyTriggered: false }), 2000);
    }
  },

  disableToast() {
    if (this.data.isCopyTriggered) {
      this.setData({
        isCopyTriggered: false,
      });
    }
  },
  handleFilter(e) {
    firebaseEvent('javaJazzFestivalListTicketScreen', 'AppClick', 'click_chip_bill_payment_java_jazz_festival')
    const {
      idx
    } = e.currentTarget.dataset
    this.setData({
      tabActive: idx,
    })
  },

  async nextPage() {
    const {
      totalAmount,
      totalTicket,
      ticketData,
      eventDetail,
      selectedTicket
    } = this.data

    getApp().globalData.totalPriceGlobal = totalAmount

    const filteredData = selectedTicket.filter(item => Object.prototype.hasOwnProperty.call(item, 'tickets'));

    filteredData.forEach(group => {
      group.total = group.tickets.reduce((sum, ticket) => sum + ticket.total, 0);
    });

    const formatFilteredData = filteredData.filter(item => item.total !== 0);

    const purchaseMode = (eventDetail && (eventDetail.vendorConfig && eventDetail.vendorConfig.purchaseMode)) || eventDetail.purchaseMode || 'multiple';

    firebaseEvent('javaJazzFestivalListTicketScreen', 'AppClick', 'click_next_bill_payment_java_jazz_festival')

    this.setData({ isLoading: true });
    try {
      let personalData = {
        fullName: 'Hamzah Diza',
        email: 'hamzah.diza@orbitalinc.com',
        phone: '081234567890',
        gender: 'M',
        dateBirth: '15',
        monthBirth: '10',
        yearBirth: '1995',
        nationality: 'ID',
        nik: '3171012304850001',
        subdistrict: 'KEBAYORAN BARU',
        postalCode: '12160',
      };
      try {
        const res = await getPersonalData();
        if (res && res.data && res.data.dataProtected) {
          personalData = { ...personalData, ...res.data.dataProtected };
        }
      } catch (e) {
        console.warn("Using fallback personalData:", e);
      }

      const ticketGroup = formatFilteredData[0] || {};
      const ticketDetail = (ticketGroup.tickets && ticketGroup.tickets[0]) || {};

      // Initialize customerTicketTemp as list screen would
      formatFilteredData.forEach(item => {
        item.customerTicketTemp = [];
        let counter = 0;
        item.customerTicketCount = 0;
        item.amount = 0;

        (item.tickets || []).forEach(ticket => {
          item.amount += (ticket.totalPrice || 0);
          for (let index = 0; index < ticket.total; index++) {
            item.customerTicketTemp.push({
              ticketId: ticket.ticketId,
              index: counter,
              customerData: {
                "fullName": "",
                "idCard": "",
                "gender": "",
                "dob": "",
                "citizen": "Indonesia",
                "country": "Indonesia",
                "statusForeign": "",
                "postCode": "",
              }
            });
            counter++;
            item.customerTicketCount++;
          }
        });
        if (item.tickets && item.tickets[0] && item.tickets[0].ticketDate) {
          item.ticketDate = dateFormat(item.tickets[0].ticketDate, "DD MMM YYYY", getApp().globalData.dayjsLocale);
        }
      });

      const customerTicketList = [];
      const purchasedTicketsList = [];

      formatFilteredData.forEach(group => {
        (group.tickets || []).forEach(t => {
          const qty = t.total || t.orderAdd || 0;
          if (qty > 0) {
            purchasedTicketsList.push({
              ticketId: t.ticketId || t.id,
              categoryId: t.ticketId || t.categoryId || t.id,
              ticketName: t.title || t.ticketName || t.name || "Tiket",
              title: t.title || t.ticketName || t.name || "Tiket",
              category: t.category || "regular",
              type: t.type || "regular",
              ticketQty: qty,
              quantity: qty,
              price: t.price || t.priceTaxService || 0,
              priceTaxService: t.priceTaxService || t.price || 0,
              totalPrice: (t.price || 0) * qty,
              amount: (t.price || 0) * qty,
              formatedTicketDate: t.formatedTicketDate || group.ticketDate || ""
            });

            for (let i = 0; i < qty; i++) {
              customerTicketList.push({
                fullName: "",
                idCard: "",
                gender: "",
                dob: "",
                citizen: "Indonesia",
                country: "Indonesia",
                statusForeign: "",
                postCode: "",
                ticketId: t.ticketId || t.id,
                categoryId: t.ticketId || t.categoryId || t.id,
                ticketName: t.title || t.ticketName || t.name || "Tiket",
                price: t.price || t.priceTaxService || 0,
                ticketDate: t.formatedTicketDate || group.ticketDate || ""
              });
            }
          }
        });
      });

      const ticketListSummary = purchasedTicketsList.map((ticket) => ({
        title: ticket.title || ticket.ticketName || "Tiket",
        totalDetailTicket: ticket.ticketQty,
        amount: ticket.amount,
        price: ticket.price,
        ticketId: ticket.ticketId,
        categoryId: ticket.categoryId
      }));

      const navData = {
        "tickets": {
          "name": personalData.fullName,
          "email": personalData.email,
          "phone": personalData.phone,
          "gender": personalData.gender,
          "ticketId": ticketDetail.ticketId || "ticket-001",
          "ticketQty": totalTicket || 1,
          "category": ticketDetail.category || "cat_main",
          "category2": ticketDetail.category2 || "cat_main",
          "category3": ticketDetail.category3 || "cat_main",
          "type": ticketDetail.type || "regular",
          "oldPrice": ticketDetail.oldPrice || 0,
          "price": totalAmount || ticketDetail.price || 0,
          "priceTaxService": totalAmount || ticketDetail.priceTaxService || 0,
          "customerTicket": customerTicketList.length > 0 ? customerTicketList : [{
            fullName: "",
            idCard: "",
            gender: "",
            dob: "",
            citizen: "Indonesia",
            country: "Indonesia",
            statusForeign: "",
            postCode: "",
            ticketId: ticketDetail.ticketId || "ticket-001",
            categoryId: ticketDetail.ticketId || "ticket-001",
            ticketName: ticketDetail.title || ticketDetail.ticketName || "Tiket",
            price: ticketDetail.price || 0,
            ticketDate: ticketDetail.formatedTicketDate || ""
          }],
          ticketTotal: totalTicket || 1,
          ticketCount: totalTicket || 1,
          ticketList: ticketListSummary,
          ticketsPurchasedList: purchasedTicketsList
        },
        visitorIndex: 0,
        ticketIndex: 0,
        personalData: personalData,
        autoSingleVisitor: true,
        isPersonalNikUsed: formatFilteredData.map(() => ({ toggleTabDisabled: false })),
        selectedTickets: formatFilteredData,
        eventDetail: eventDetail,
      };
      console.log("[book-ticket] Navigating directly to visitor-input-screen:", navData);
      customNavigateTo({
        data: navData,
        url: '/src/app/pages/visitor-input-screen/visitor-input-screen',
      });
    } catch (err) {
      generalError({ err });
    } finally {
      this.setData({ isLoading: false });
    }
  }

});
/* JShield-obfus:disable */
