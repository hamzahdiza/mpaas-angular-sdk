import {
  currencyFormat
} from "/src/utils/currency-util";

import {
  dateFormatTimeStamp
} from "/src/utils/date-util"

import getNetwork from "/src/utils/getNetWork"
import { createServiceOrder, completeOrderAndDeductStock, payEcommerceOrder, createEcommerceOrder } from "/src/public/api"
import { customNavigateTo } from "/src/utils/route-util"

const app = getApp()

/* JShield-obfus:enable */
Page({
  data: {
    isFetching: Boolean(false),
    mergeStatus: Object({
      isMerge: String("true"),
      isNotMerge: String("false")
    }),
    buttonFeatures: Array(),
    isOpen: Boolean(false),
    billerInfo: Object(),
    userAccInfo: Object(),
    titleStatus: String(),
    descriptionText: String(),
    lang: Object(),
    illustrationSource: String(""),
    transactionId: String(),
    transactionData: Object(),
    nominalAmount: String(),
    timeStamp: String(),
    refId: String(),
    isFailMergeModal: Boolean(false),
    failMergeRes: Object(),
  },
  onShow() {
    my.call("enableSwipe", {
      isSwipe: false
    }, () => {});
    getNetwork()
  },

  async onLoad(query) {
    const lang = getApp().globalData.languagePack
    this.setData({
      lang
    })
    let queryParams = query.customUrlQueryData ? my.customUrlQueryData[query.customUrlQueryData] : ""

    if (!queryParams.transactionData) {
      const clientPlatform = getApp().globalData.nativeData.clientPlatform;
      const nativeKey = clientPlatform === "ios" ? "lifestyleTransactionDetailContext" : "common/lifestyleTransactionDetail";

      my.call("getSecureValueByKey", {
        key: nativeKey
      }, async (res) => {

        if (res && res.data) {
          let parsed = JSON.parse(res.data)
          this.getTransactionDetail(parsed, queryParams.posContext || queryParams)
        }

      });

    } else {
      this.getTransactionDetail(queryParams.transactionData, queryParams.posContext || queryParams)
    }
  },

  getTransactionDetail(dataParams, posContext = null) {
    try {
      let {
        data = {},
        dataProtected = {},
        transactionTypePartner = ""
      } = dataParams || {};

      if (!data) data = {};
      if (!dataProtected) dataProtected = {};

      const transactionStatus = (data.transactionStatus || "SUCCESS").toUpperCase();

      const resolvedPosContext = posContext || (dataParams && dataParams.posContext) || dataParams || {};
      const isEcommerce = 
        resolvedPosContext.orderType === 'umkm' || 
        resolvedPosContext.isUmkm === true || 
        (resolvedPosContext.orderId && String(resolvedPosContext.orderId).startsWith("ECOM-")) ||
        (dataParams && dataParams.orderData && dataParams.orderData.orderType === 'umkm') ||
        (dataParams && dataParams.orderType === 'umkm');

      if (transactionStatus === "FAILED" && data.transactionDescription) {
        let updatedLang = {
          ...this.data.lang
        }
        updatedLang.lifestyleBillPaymentJavaJazzFestivalResultScreenFailedLabel = this.data.lang[data.transactionDescription] || this.data.lang.lifestyleBillPaymentJavaJazzFestivalResultScreenFailedLabel;
        this.setData({
          lang: updatedLang
        })
      }

      const decryptedData = dataProtected;

      const {
        updatedIllus,
        updatedDescription,
        updatedTitleStatus
      } = this.setDetailInformation(transactionStatus, isEcommerce);

      const updatedList = this.setFeaturesList(transactionStatus)

      const updatedBiller = {
        categoryName: (data.categoryData && data.categoryData.categoryName) || "E-Commerce",
        billerName: data.billerName || "Orbital Official Store",
      }

      let account = decryptedData.account || {
        accountName: "SYAMSUL BAHRI",
        productName: "BNI Taplus",
        accountNumber: "1207175442"
      };

      if (account.accountNumber) {
        account.maskedValue = "*".repeat(Math.max(0, account.accountNumber.length - 3)) + account.accountNumber.slice(-3);
      } else {
        account.maskedValue = "1207175***";
      }

      const updatedAccount = {
        accountName: account.accountName || "SYAMSUL BAHRI",
        productName: account.productName || "BNI Taplus",
        accountNumber: account.maskedValue
      }

      let ticketList = [];
      let ecommerceInfo = null;

      if (isEcommerce) {
        // E-COMMERCE UMKM: NO barcode, construct e-commerce receipt information
        const rawItems = resolvedPosContext.items || [];
        const courier = resolvedPosContext.courierInfo || {};
        const address = resolvedPosContext.shippingAddress || {};
        const storeName = resolvedPosContext.serviceName || (rawItems[0] && rawItems[0].storeName) || (app.globalData.selectedUmkm && app.globalData.selectedUmkm.storeName) || "Orbital Official Store & Batik Mahakarya";
        const customerFullName = resolvedPosContext.customerName || (resolvedPosContext.personalData && resolvedPosContext.personalData.fullName) || address.recipientName || "Hamzah Diza";
        const customerPhoneNumber = resolvedPosContext.customerPhone || (resolvedPosContext.personalData && resolvedPosContext.personalData.phone) || address.phone || "0812-3456-7890";

        ecommerceInfo = {
          orderId: resolvedPosContext.orderId || "ECOM-" + Date.now().toString().slice(-8),
          storeName: storeName,
          customerName: customerFullName,
          customerPhone: customerPhoneNumber,
          recipientName: address.recipientName || customerFullName,
          recipientPhone: address.phone || customerPhoneNumber,
          street: address.street || "Jl. Sudirman No. 1, Kebayoran Baru",
          city: address.city || "Jakarta Selatan",
          postalCode: address.postalCode || "12190",
          courierName: courier.courier || courier.name || "JNE Regular",
          courierService: courier.service || "Reguler (2-3 hari)",
          shippingCostFormatted: currencyFormat({
            value: courier.cost || courier.price || 15000,
            currency: "IDR"
          }),
          items: rawItems.length > 0 ? rawItems.map((item) => ({
            productName: item.productName || item.name || "Kemeja Batik Tulis Pria Parang Kusumo",
            variantName: item.variantName || item.variant || "-",
            quantity: item.quantity || item.qty || 1,
            imageUrl: item.imageUrl || item.image || "/src/assets/images/default_product.png",
            priceFormatted: currencyFormat({
              value: item.price || 385000,
              currency: "IDR"
            }),
            subtotalFormatted: currencyFormat({
              value: (item.price || 385000) * (item.quantity || item.qty || 1),
              currency: "IDR"
            })
          })) : [
            {
              productName: "Kemeja Batik Tulis Pria Parang Kusumo",
              variantName: "Sogan Cokelat, L",
              quantity: 1,
              imageUrl: "/src/assets/images/default_product.png",
              priceFormatted: "Rp 385.000",
              subtotalFormatted: "Rp 385.000"
            }
          ],
          totalAmountFormatted: currencyFormat({
            value: getApp().globalData.totalPriceGlobal || resolvedPosContext.totalAmount || data.billAmount || 0,
            currency: "IDR"
          }),
          statusLabel: "Lunas / Diproses Penjual",
          paymentMethod: "BNI Virtual Account"
        };
      } else {
        // EVENT / CONCERT TICKETS: Generate ticket QR list
        const ticketsToProcess = resolvedPosContext.tickets || [];
        const eventName = resolvedPosContext.serviceName || app.globalData.eventTitle || "Konser Musik BNI 2026";
        const customerName = resolvedPosContext.customerName || (resolvedPosContext.personalData && resolvedPosContext.personalData.fullName) || "User Lifestyle";
        
        let expectedCount = resolvedPosContext.ticketCount || resolvedPosContext.quantity || (dataParams && dataParams.ticketCount) || (app.globalData && app.globalData.lastTicketCount) || 0;

        // 1. Process ticketsToProcess (unrolling customerTicket list or ticketQty)
        if (Array.isArray(ticketsToProcess) && ticketsToProcess.length > 0) {
          let globalIdx = 0;
          ticketsToProcess.forEach((t) => {
            if (Array.isArray(t.customerTicket) && t.customerTicket.length > 0) {
              t.customerTicket.forEach((c) => {
                const holderName = c.fullName || c.name || customerName;
                const bookingCode = c.bookingCode || c.qrCode || t.bookingCode || t.qrCode || `TIX-${Date.now().toString().slice(-6)}-0${globalIdx + 1}`;
                const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(bookingCode)}`;
                ticketList.push({
                  idx: globalIdx,
                  eventName,
                  holderName,
                  bookingCode,
                  qrValue: bookingCode,
                  qrUrl,
                  status: "Berhasil"
                });
                globalIdx++;
              });
            } else {
              const qty = t.ticketQty || t.quantity || t.ticketCount || 1;
              for (let q = 0; q < qty; q++) {
                const holderName = t.participantName || t.holderName || customerName;
                const bookingCode = t.bookingCode || t.qrCode || `TIX-${Date.now().toString().slice(-6)}-0${globalIdx + 1}`;
                const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(bookingCode)}`;
                ticketList.push({
                  idx: globalIdx,
                  eventName,
                  holderName,
                  bookingCode,
                  qrValue: bookingCode,
                  qrUrl,
                  status: "Berhasil"
                });
                globalIdx++;
              }
            }
          });
        }

        if (expectedCount <= 0) {
          expectedCount = ticketList.length > 0 ? ticketList.length : 1;
        }

        // 2. Fallback / Top-up: If ticketList.length is less than expectedCount, add remaining items
        if (ticketList.length < expectedCount) {
          const startIdx = ticketList.length;
          for (let i = startIdx; i < expectedCount; i++) {
            const bookingCode = `TIX-${Date.now().toString().slice(-6)}-0${i + 1}`;
            ticketList.push({
              idx: i,
              eventName,
              holderName: customerName,
              bookingCode,
              qrValue: bookingCode,
              qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(bookingCode)}`,
              status: "Berhasil"
            });
          }
        }
      }

      this.setData({
        isEcommerce,
        ecommerceInfo,
        eventTitle: isEcommerce ? "" : app.globalData.eventTitle,
        transactionTypePartner,
        transactionData: {
          data,
          dataProtected: decryptedData
        },
        illustrationSource: updatedIllus,
        buttonFeatures: updatedList,
        billerInfo: updatedBiller,
        userAccInfo: updatedAccount,
        descriptionText: updatedDescription,
        titleStatus: updatedTitleStatus,
        nominalAmount: currencyFormat({
          value: getApp().globalData.totalPriceGlobal || resolvedPosContext.totalAmount || 0,
          currency: data.currencyCode || "IDR"
        }),
        timeStamp: dateFormatTimeStamp(new Date(), "DD MMM YYYY [•] HH:mm:ss [WIB] [•]"),
        refId: decryptedData.referenceNumber || decryptedData.referenceId || "REF-" + Date.now().toString().slice(-8),
        posContext: resolvedPosContext,
        ticketList: isEcommerce ? [] : ticketList,
        ticketModalVisible: false,
        selectedTicket: ticketList[0] || {},
        modalQrImage: ticketList[0] ? ticketList[0].qrUrl : ""
      })

      if (transactionStatus === "SUCCESS") {
        this.processPOSOrder()
      }

      if (transactionStatus === "SUCCESS" || transactionStatus === "FAILED") {
        this.storeTransaction({
          data,
          decryptedData,
          transactionTypePartner
        })
      }
    } catch (error) {
      this.setData({
        isFailCustomModal: true,
        initFail: true,
        failCustomRes: {
          title: "general error",
          description: error.toString()
        }
      })
    }
  },
  setDetailInformation(status, isEcommerce = false) {
    status = status.toUpperCase()
    const updatedIllus = status == "FAILED" ? "/src/assets/images/illustration_result_va_fail.svg" :
      status == "SUCCESS" ? "/src/assets/images/illustration_result_va_success.svg" : "/src/assets/images/illustration_result_va_progress.svg"

    let updatedDescription = status == "FAILED" ? this.data.lang.lifestyleBillPaymentJavaJazzFestivalResultScreenFailedLabel : status == "INPROGRESS" ? this.data.lang.lifestyleBillPaymentJavaJazzFestivalResultScreenInProgressLabel : this.data.lang.lifestyleBillPaymentJavaJazzFestivalResultScreenSuccessLabelJavaJazzFestival

    let updatedTitleStatus = status == "FAILED" ? this.data.lang.lifestyleBillPaymentJavaJazzFestivalResultScreenFailedTitleLabel : status == "INPROGRESS" ? this.data.lang.lifestyleBillPaymentJavaJazzFestivalResultScreenInProgressTitleLabel : this.data.lang.lifestyleBillPaymentJavaJazzFestivalResultScreenSuccessTitleLabel

    if (isEcommerce) {
      if (status === "SUCCESS") {
        updatedTitleStatus = "Pembayaran Berhasil";
        updatedDescription = "Pesanan belanja UMKM Anda telah berhasil dibayar. Penjual akan segera mengemas dan mengirimkan barang ke alamat tujuan.";
      } else if (status === "FAILED") {
        updatedTitleStatus = "Pembayaran Gagal";
        updatedDescription = "Transaksi pesanan tidak dapat diselesaikan. Silakan coba kembali beberapa saat lagi.";
      } else {
        updatedTitleStatus = "Menunggu Konfirmasi";
        updatedDescription = "Pembayaran pesanan Anda sedang diverifikasi oleh sistem perbankan BNI.";
      }
    }

    return {
      updatedIllus,
      updatedDescription,
      updatedTitleStatus
    }
  },
  setFeaturesList(status) {
    const featuresList = new Array()
    status = status.toUpperCase()
    if (status == "SUCCESS") {

      featuresList.push({
        name: this.data.lang.lifestyleBillPaymentJavaJazzFestivalResultScreenRecentReceiptButtonLabel,
        icon: "/src/assets/icons/Icon_print_trans.svg",
        disabled: false,
        iconId: "lifestyle-tsel-result-receipt-icon",
        textId: "lifestyle-tsel-result-receipt-label"
      })
    } else if (status == "FAILED") {
      featuresList.push({
        name: this.data.lang.lifestyleBillPaymentJavaJazzFestivalResultScreenMutationCheckButtonLabel,
        icon: "/src/assets/icons/Icon_mutation_history.svg",
        disabled: false,
        iconId: "lifestyle-tsel-result-check-transaction-icon",
        textId: "lifestyle-tsel-result-check-transaction-label"
      })

      featuresList.push({
        name: this.data.lang.lifestyleBillPaymentJavaJazzFestivalResultScreenRecentReceiptButtonLabel,
        icon: "/src/assets/icons/Icon_print_trans.svg",
        disabled: false,
        iconId: "lifestyle-tsel-result-receipt-icon",
        textId: "lifestyle-tsel-result-receipt-label"
      })
    } else if (status == "INPROGRESS") {
      featuresList.push({
        name: this.data.lang.lifestyleBillPaymentJavaJazzFestivalResultScreenHistoryTransactionButtonLabel,
        icon: "/src/assets/icons/Icon_transaction_history.svg",
        disabled: false,
        iconId: "lifestyle-tsel-result-transaction-history-icon",
        textId: "lifestyle-tsel-result-transaction-history-label"
      })
    }
    return featuresList
  },
  async featureHandler(e) {
    let {
      name
    } = e.currentTarget.dataset

    if (name == this.data.lang.lifestyleBillPaymentJavaJazzFestivalResultScreenMutationCheckButtonLabel) {
      //CHECK MUTATION 

      my.call("goToCasaDetail", {
        accountNumber: this.data.transactionData.dataProtected.account.accountNumber
      }, () => {})

    } else if (name == this.data.lang.lifestyleBillPaymentJavaJazzFestivalResultScreenHistoryTransactionButtonLabel) {
      //TRANSACTION HISTORY

      my.call(
        "getAppConfig", {
          keys: ["app.mpaas.application.id.lifestyle", "app.mpaas.application.path.lifestyle.history"]
        },
        (res) => {

          const dataNative = getApp().globalData.nativeData
          const partnerMenu = getApp().globalData.partnerMenu

          my.navigateToMiniProgram({
            appId: res["app.mpaas.application.id.lifestyle"],
            path: res["app.mpaas.application.path.lifestyle.history"],
            extraData: {
              nativeData: JSON.stringify(dataNative),
              partnerMenu: JSON.stringify(partnerMenu),
              nativeDataAndroid: dataNative,
              partnerMenuAndroid: partnerMenu,
            },
    
          });
        }
      );

    } else if (name == this.data.lang.lifestyleBillPaymentJavaJazzFestivalResultScreenRecentReceiptButtonLabel) {
      //RECEIPT SCREEN
      my.call("goToReceiptScreen", {
        transactionId: this.data.transactionData.dataProtected.transactionId,
        fromScreen: "src/app/package_result_screen/result-screen-bp/result-screen-bp",
      }, () => {})
    }
  },

  openTicketModal(e) {
    const idx = Number(e.currentTarget.dataset.idx);
    const ticket = this.data.ticketList[idx];
    if (!ticket) return;

    this.setData({
      selectedTicket: ticket,
      modalQrImage: ticket.qrUrl || "",
      ticketModalVisible: true
    });
  },

  closeTicketModal() {
    this.setData({
      ticketModalVisible: false
    });
  },

  closeStillPending() {
    this.setData({
      isStillPending: false
    })
  },
  storeTransaction(dataPayload) {
    const {
      data = {},
      decryptedData = {},
      transactionTypePartner = ""
    } = dataPayload || {};
    const storedData = {
      data: {
        completionTime: data.completionTime || new Date().toISOString(),
        transactionStatus: data.transactionStatus || "SUCCESS",
        billAmount: data.billAmount || 0,
        currencyCode: data.currencyCode || "IDR",
        billerName: data.billerName || "Orbital Official Store",
        categoryData: data.categoryData || { categoryName: "E-Commerce" },
      },
      dataProtected: {
        referenceNumber: (decryptedData && (decryptedData.referenceNumber || decryptedData.referenceId)) || "REF-" + Date.now().toString().slice(-8),
        transactionId: (decryptedData && decryptedData.transactionId) || "TX-" + Date.now(),
        billKey1: (decryptedData && decryptedData.billKey1) || "",
        account: (decryptedData && decryptedData.account) || {}
      },
      transactionTypePartner
    }
    my.call("storeTransactionDetailContext", {
      data: JSON.stringify(storedData),
    }, () => {})
  },

  homeHandler() {
    if (my.reLaunch) {
      my.reLaunch({
        url: "/src/app/pages/landing/landing"
      });
    } else if (my.redirectTo) {
      my.redirectTo({
        url: "/src/app/pages/landing/landing"
      });
    } else {
      my.call("goToHomeScreen", {}, () => {});
    }
  },

  async processPOSOrder() {
    try {
      const posContext = this.data.posContext || {};
      const isUmkm = posContext.orderType === 'umkm' || posContext.isUmkm || (posContext.orderId && posContext.orderId.startsWith("ECOM-"));

      if (isUmkm) {
        console.log("Processing E-Commerce UMKM Order payment:", posContext.orderId);
        if (posContext.orderId) {
          try {
            const payRes = await payEcommerceOrder(posContext.orderId, {
              paymentMethod: "BNI Virtual Account"
            });
            console.log("E-Commerce Order pay result:", payRes);
            return;
          } catch (payErr) {
            console.warn("payEcommerceOrder failed, trying create fallback:", payErr);
          }
        }

        // Fallback creation for UMKM if orderId was not created at checkout
        const personalData = posContext.personalData || getApp().globalData.personalData || {};
        const resolvedCustomerName = 
          personalData.fullName || 
          personalData.name || 
          posContext.customerName ||
          "Hamzah Diza";

        const resolvedCustomerPhone = 
          personalData.phone || 
          personalData.phoneNumber || 
          posContext.customerPhone || 
          "081234567890";

        const ecomPayload = {
          storeId: posContext.storeId || "store-001",
          buyerId: "CIF-HAMZAH-001",
          buyerName: resolvedCustomerName,
          buyerPhone: resolvedCustomerPhone,
          status: "PAID",
          items: posContext.items || [
            {
              productId: "prod-001",
              productName: "Kemeja Batik Tulis Pria Parang Kusumo",
              variantName: "Sogan Cokelat, L",
              price: 385000,
              quantity: 1,
              sku: "SKU-PARANG-01"
            }
          ],
          shippingCost: (posContext.courierInfo && posContext.courierInfo.cost) || 15000,
          paymentMethod: "BNI Virtual Account",
          buyerAddress: posContext.shippingAddress || {
            recipientName: resolvedCustomerName,
            phone: resolvedCustomerPhone,
            street: "Jl. Sudirman No. 1, Kebayoran Baru",
            city: "Jakarta Selatan",
            postalCode: "12190"
          },
          notes: posContext.notes || ""
        };

        const createRes = await createEcommerceOrder(ecomPayload);
        console.log("Fallback UMKM E-Commerce Order created as PAID:", createRes);
        return;
      }

      // Jika order ID sudah ada di DB, selesaikan (complete) order yang ada
      if (posContext.orderId && !posContext.orderId.startsWith("INTERNAL-") && !posContext.orderId.startsWith("INV-")) {
        console.log("Completing existing POS Order:", posContext.orderId);
        try {
          const res = await completeOrderAndDeductStock(posContext.orderId, {
            serviceId: posContext.serviceId,
            serviceName: posContext.serviceName,
            orderType: posContext.orderType || "event",
            tickets: posContext.tickets,
            customerName: posContext.customerName,
            customerPhone: posContext.customerPhone,
            totalAmount: posContext.totalAmount,
            paymentMethod: "VA"
          });
          console.log("POS Order completion result:", res);
          return;
        } catch (completeErr) {
          console.warn("completeOrderAndDeductStock failed, trying fallback creation:", completeErr);
        }
      }

      // Fallback darurat jika order belum dibuat sebelumnya
      const personalData = posContext.personalData || getApp().globalData.personalData || {};
      const resolvedCustomerName = 
        personalData.fullName || 
        personalData.name || 
        posContext.customerName ||
        (posContext.tickets && posContext.tickets[0].customerTicket && posContext.tickets[0].customerTicket[0].fullName) ||
        "User Lifestyle";

      const resolvedCustomerPhone = 
        personalData.phone || 
        personalData.phoneNumber || 
        posContext.customerPhone || 
        "-";

      const finalAmount = parseInt(getApp().globalData.totalPriceGlobal || posContext.totalAmount || this.data.priceCount || 0);

      const payload = {
        orderType: "event",
        serviceId: posContext.serviceId || "run-004",
        serviceName: posContext.serviceName || "Event",
        customerName: resolvedCustomerName,
        customerPhone: resolvedCustomerPhone,
        notes: `Order event: ${resolvedCustomerName}`,
        quantity: posContext.ticketCount || (posContext.tickets ? posContext.tickets.length : 1),
        totalAmount: finalAmount,
        status: "completed",
        orderPayload: {
          tickets: posContext.tickets || [],
          attendees: posContext.attendees || (posContext.tickets && posContext.tickets[0].customerTicket) || [],
          orderId: this.data.transactionId || "INV-" + Date.now()
        }
      };

      console.log("Creating Fallback POS Order payload:", payload);
      const res = await createServiceOrder(payload);
      console.log("Fallback POS Order created successfully:", res);
    } catch (err) {
      console.error("Failed to process POS Order after payment:", err);
    }
  },

  goToTransactionHistory() {
    customNavigateTo({
      url: "/src/app/pages/transaction-history/transaction-history",
      data: {}
    });
  }
});
/* JShield-obfus:disable */