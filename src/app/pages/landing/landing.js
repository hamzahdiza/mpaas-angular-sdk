import getNetWork from "../../../utils/getNetWork";
import {
  lifeStyleMenu,
  accountListPost,
  getAllEvents,
  getFavoriteEvents,
  getAllHotels,
  getAllRunning,
} from "../../../public/api";
import {
  currencyFormat
} from "../../../utils/currency-util"
import {
  customNavigateTo
} from "../../../utils/route-util";
import generalError from "../../../utils/generalError";
import languagePacks from "/src/public/language-pack.json";


/* JShield-obfus:enable */
Page({
  data: {
    lang: Object(),
    failureLoad: Boolean(false),
    titleBarHeight: Number(0),
    statusBarHeight: Number(0),
    isOneData: Boolean(false),
    isTop: Boolean(false),
    isLifestyleFeatureOff: Boolean(false),
    isLifestyleBillPaymentFeatureOff: Boolean(false),
    lifestyleVirtualAccountFeatureOff: Boolean(false),
    partnerMenus: Array([]),
    dataPartner: "",
    transactionCheckModal: Boolean(false),
    isLoading: Boolean(true),
    loadingArr: [1, 2, 3, 4],
    isShowLottery: Boolean(false),
    resSourceOfFunds: Object(),
    imageShow: Boolean(false),
    isAccountValid: Boolean(true),
    errorReload: 0,
    allEvents: Array([]),
    isEventsLoading: Boolean(true),
    eventsLoadingArr: [1, 2, 3],
    uniqueCategories: Array([])
  },

  onShow() {
    my.call("enableSwipe", {
      isSwipe: false
    }, () => {});
    getNetWork();
    my.call("showAppBar", {
      isShow: false,
      title: ""
    }, () => {});

  },

  onReady() {
    // Mock language pack if missing
    const app = getApp();
    console.log(app.globalData.languagePack);
    const lang = (app.globalData && app.globalData.languagePack) || {
      lifestyleJavaJazzFestivalLandingScreenHeaderTitleLabel: "Wondr Event",
      lifestyleJavaJazzFestivalLandingScreenCloseEventDescLabel: "Close",
      lifestyleJavaJazzFestivalLandingScreenOpenEventDescLabel: "Read More",
      lifestyleJavaJazzFestivalLandingScreenChooseTicketLabel: "Choose Ticket",
      lifestyleJavaJazzFestivalLandingScreenPromoLabel: "Promo",
      lifestyleJavaJazzFestivalLandingScreenAmountStartFromLabel: "Starts from",
      lifestyleJavaJazzFestivalLandingScreenInfoSectionTitleLabel: "Info",
      lifestyleJavaJazzFestivalLandingScreenTermsCondition1Label: "By buying this ticket, you agree to",
      lifestyleJavaJazzFestivalLandingScreenTermsCondition2Label: "Terms & Conditions",
      lifestyleJavaJazzFestivalLandingScreenTermsCondition3Label: "applied.",
      lifestyleJavaJazzFestivalLandingScreenMuatUlangTitleLabel: "Failed to load",
      lifestyleJavaJazzFestivalLandingScreenMuatUlangDescLabel: "Please try again"
    }

    this.setData({
      lang
    })
  },
  async onLoad() {
    my.call("showAppBar", {
      isShow: false,
      title: ""
    }, () => {});


    const statusBarHeight = my.getSystemInfoSync().statusBarHeight;
    this.setData({
      statusBarHeight,
    });


    this.handleRequest()
  },

  async handleRequest() {
    try {
      this.setData({
        isLoading: true,
        isEventsLoading: true,
        errorReload: 0,
      });

      // Fire menu and events concurrently
      const [menuRes] = await Promise.all([
        lifeStyleMenu(),
        this.fetchAllEvents(),
        this.fetchFavoriteEvents(),
        this.fetchAllHotel(),
        this.fetchAllRunning()
      ]);

      if (menuRes) {
        this.lifeStyleMenuThen(menuRes);
        this.setData({
          isNeedUpdateCheck: menuRes.data && menuRes.data.data && menuRes.data.data.isNeedUpdate,
        });
      }
    } catch (error) {
      this.lifeStyleMenuCatch(error);
    } finally {
      this.setLanguagePack();
      this.setData({
        isLoading: false,
        isEventsLoading: false,
        errorReload: 0,
      });
    }
  },

  lifeStyleMenuThen(res) {
    let partnerMenusRaw = res.data.data.partnerMenus
    const {
      dataPartner,
      dataBanner
    } = partnerMenusRaw.reduce((acc, menu) => {
      const iconMapping = {
        event: "https://img.icons8.com/color/96/theatre-mask.png",
        gift: "https://img.icons8.com/color/96/gift.png",
        otomotif: "https://img.icons8.com/color/96/car.png",
        transportasi: "https://img.icons8.com/color/96/bus.png",
        voucher: "https://img.icons8.com/color/96/discount.png"
      };
      const partnerChipIcon = iconMapping[menu.category.toLowerCase()];
      const formattedMenu = {
        partnerTitle: menu.title,
        pertnerDisplayImage: menu.displayImage,
        partnerDescription: menu.description,
        partnerCategory: menu.category,
        partnerAmount: currencyFormat({
          value: menu.amount
        }),
        partnerTransactionTypeDisplay: menu.transactionTypeDisplay,
        isDiscount: menu.isDiscount,
        total: currencyFormat({
          value: menu.isDiscount ? menu.amount - menu.discount : menu.amount
        }),
        isImageLoading: true,
        partnerChipIcon,
        rawMenu: menu
      };

      acc.dataPartner.push(formattedMenu);

      return acc;
    }, {
      dataPartner: [],
      dataBanner: []
    });

    const categories = dataPartner.map(item => item.partnerCategory);
    const allCategories = ['Hotel', 'Cafe', 'Restoran', 'Rental', 'UMKM', ...categories];
    const uniqueCategoryNames = [];
    const seen = new Set();

    allCategories.forEach(cat => {
      if (!cat) return;
      const lower = cat.toLowerCase();
      // Normalize Restaurant -> Restoran
      const normalized = lower === 'restaurant' ? 'restoran' : lower;
      
      if (!seen.has(normalized)) {
        seen.add(normalized);
        // Keep the original case or use Title Case for consistency
        const titleCase = cat === 'UMKM' ? 'UMKM' : cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
        uniqueCategoryNames.push(titleCase);
      }
    });

    uniqueCategoryNames.sort((a, b) => a.localeCompare(b));

    const iconMapping = {
      event: "https://cdn-icons-png.flaticon.com/128/1614/1614997.png",
      gift: "https://cdn-icons-png.flaticon.com/128/9466/9466122.png",
      otomotif: "https://cdn-icons-png.flaticon.com/128/18042/18042764.png",
      transportasi: "https://cdn-icons-png.flaticon.com/128/18146/18146594.png",
      voucher: "https://cdn-icons-png.flaticon.com/128/6713/6713699.png",
      hotel: "https://cdn-icons-png.flaticon.com/128/1475/1475996.png",
      cafe: "https://cdn-icons-png.flaticon.com/128/4721/4721026.png",
      restoran: "https://cdn-icons-png.flaticon.com/128/1046/1046798.png",
      restaurant: "https://cdn-icons-png.flaticon.com/128/1046/1046798.png",
      rental: "https://cdn-icons-png.flaticon.com/128/18146/18146594.png",
      umkm: "https://cdn-icons-png.flaticon.com/128/6713/6713699.png",
      charity: "https://cdn-icons-png.flaticon.com/128/10543/10543622.png"
    };

    const themeMapping = {
      hotel: 'blue',
      cafe: 'green',
      restoran: 'amber',
      restaurant: 'amber',
      rental: 'indigo',
      umkm: 'rose',
      event: 'purple',
      gift: 'purple',
      otomotif: 'purple',
      transportasi: 'purple',
      voucher: 'purple'
    };

    const uniqueCategories = uniqueCategoryNames.map(name => {
      const lowerName = name.toLowerCase();
      let onTap = 'goToCategoryDetail';
      if (lowerName === 'hotel') onTap = 'goToHotelIndex';
      else if (lowerName === 'cafe') onTap = 'goToCafeIndex';
      else if (lowerName === 'restoran' || lowerName === 'restaurant') onTap = 'goToRestaurantIndex';
      else if (lowerName === 'rental') onTap = 'goToRentalIndex';
      else if (lowerName === 'umkm') onTap = 'goToUmkmIndex';
      else if (lowerName === 'event') onTap = 'goToEventIndex';
      else if (lowerName === 'running') onTap = 'goToLandingIndex';

      return {
        name,
        icon: iconMapping[lowerName] || "/src/assets/icons/ic_common_entertainment.svg",
        theme: themeMapping[lowerName] || 'purple',
        onTap
      };
    });

    this.setData({
      partnerMenus: partnerMenusRaw,
      dataPartner: dataPartner,
      dataBanner: dataBanner,
      uniqueCategories,
      isOneData: dataPartner.length === 1,
      errorReload: 0
    });

    this.hitApiListAccount()
  },


  lifeStyleMenuCatch(e) {
    if (e.statusCode != 409 || e.status != 409) {
      this.setData({
        isLoading: false,
        errorReload: 2,
      })
    } else {
      this.setData({
        isLoading: false,
        errorReload: 2
      })
      generalError({
        err: e,
        isSwipe: true,
      })
    }

  },
  goToPartnerWebview(e) {
    let partnerSelected = e.currentTarget.dataset.selectedPartner
    let partnerMenu = this.data.partnerMenus.find((item) => item.transactionTypeDisplay === partnerSelected.partnerTransactionTypeDisplay);

    my.call("getAppConfig", {
      keys: ["app.config.lifestyle.checkCasa"]
    }, (res) => {
      const checkCasa = res["app.config.lifestyle.checkCasa"] || "";
      const matchingCasa = checkCasa.slice(1, -1).split(',').map(item => item.toLowerCase()).includes(partnerMenu.transactionType);

      if (this.data.isErrorSof && matchingCasa) {
        this.setData({
          isShowLottery: true,
          errorReload: 0
        })


      } else if (Boolean(partnerMenu.isUrlMicrositeStatic) && partnerMenu.urlMicrosite == 'app_id') {
        my.call("showAppBar", {
          isShow: false,
          title: ""
        }, () => {});
        const dataNative = {
          clientRelease: getApp().globalData.nativeData.clientRelease,
          clientPlatform: getApp().globalData.nativeData.clientPlatform,
          clientVersion: getApp().globalData.nativeData.clientVersion,
          userAgent: getApp().globalData.nativeData.userAgent,
          authorization: getApp().globalData.nativeData.authorization
        }

        console.info(JSON.stringify({dataNative, partnerMenu}))

        my.navigateToMiniProgram({
          appId: "0100010000020010",
          path: '/src/app/pages/index/index',
          extraData: {
            nativeData: JSON.stringify(dataNative),
            partnerMenu: JSON.stringify(partnerMenu),
            nativeDataAndroid: dataNative,
            partnerMenuAndroid: partnerMenu,
          },
        });
      } else {
        my.call("showAppBar", {
          isShow: true,
          title: partnerMenu.title
        }, () => {});
        customNavigateTo({
          url: "/src/app/pages/microsite/webview-lifestyle/webview-lifestyle",
          data: {
            partnerMenu,
            isFromLanding: true
          },
        });
      }
    });

  },

  goToTnc() {
    customNavigateTo({
      url: "/src/app/pages/chose-tnc/chose-tnc",
      data: {
        lifestyleData: this.data.partnerMenus
      },
    });
  },

  goToTransactionHistory() {
    customNavigateTo({
      url: "/src/app/pages/transaction-history/transaction-history",
      data: {
        isFromLanding: true
      },
    });
  },

  goToNative() {
    my.call("goToHomeScreen", {}, () => {})
  },

  async hitApiListAccount() {
    const headers = {
      "Screen-Id": "lifestyleLandingPageScreen"
    }
    const data = {
      data: {
        "isSOF": false,
        "currency": ['IDR']
      }
    }
    await accountListPost(data, headers)
      .then((res) => {
        console.log(res, "res accountListPost landing page");
        let resSourceOfFunds = {}
        resSourceOfFunds = res.data.dataProtected

        const {
          sofList
        } = resSourceOfFunds;

        const isErrorSof = sofList.length == 1 && (sofList[0].currency !== "IDR" || sofList[0].accountStatus == "DORM")

        this.setData({
          isLoading: false,
          resSourceOfFunds,
          isErrorSof
        });

      })
      .catch((err) => {
        const {
          errorCode
        } = err.data

        if (err.statusCode != 409) {
          this.setData({
            errorReload: 2,
            isLoading: false
          });
        }

        if (errorCode === 'ACC-003-629') {
          this.setData({
            isLoading: false,
            isErrorSof: true,
            isAccountValid: false
          });
        } else {
          my.call("enableSwipe", {
            isSwipe: false
          }, () => {});

          this.setData({
            errorReload: 0
          });

          generalError({
            err,
            isSwipe: true,
            event: 'goToHomeScreen'
          });
        }
      })
      .finally(() => {
        this.setLanguagePack()
        this.setData({
          isNeedUpdate: this.data.isNeedUpdateCheck,
          textObject: {
            imgUrl: "/src/assets/images/img_common_00_need_update_xsmall.svg",
            titleText: this.data.lang.lifestyleLandingPageScreenUpdateTitleLabel,
            contentText: this.data.lang.lifestyleLandingPageScreenUpdateDescLabel,
            btnPrimaryText: this.data.lang.lifestyleLandingPageScreenUpdateButtonLabel,
            btnSecondaryText: this.data.lang.lifestyleLandingPageScreenCloseUpdateButtonLabel
          },
        })
      });
  },
  setLanguagePack() {
    const language = getApp().globalData.nativeData.language;
    const languagePackObj = getApp().globalData.languagePack;
    const lang = languagePackObj && Object.keys(languagePackObj).length > 0 ? getApp().globalData.languagePack : languagePacks.languagePack[language]

    this.setData({
      lang
    })
  },

  goSavingAccount() {
    my.call("goToSavingAccountDataVerification", {}, () => {});
  },

  closeModal() {
    this.setData({
      isShowLottery: false
    })
  },

  imageLoad(e) {
    const index = e.currentTarget.dataset.index;
    let dataPartner = this.data.dataPartner;
    if (dataPartner[index]) {
      dataPartner[index].isImageLoading = false;
      this.setData({
        dataPartner
      });
    }
  },

  async fetchAllEvents() {
    this.setData({
      isEventsLoading: true
    });
    try {
      const res = await getAllEvents();
      console.log(res, "res getAllEvents landing page")
      const events = (res.data && res.data.data) || [];
      const formatted = events.map((ev) => ({
        ...ev,
        formattedPrice: 'Rp ' + ev.price.toLocaleString('id-ID'),
        formattedDate: new Date(ev.startDate).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        isImageLoading: true
      }));
      this.setData({
        allEvents: formatted,
        isEventsLoading: false
      });
    } catch (e) {
      console.log(e, "<<< error event");
      this.setData({
        isEventsLoading: false,
        allEvents: []
      });
    }
  },
  async fetchAllRunning() {
    try {
      const res = await getAllRunning();
      const events = (res.data && res.data.data) || [];
      const formatted = events.map((ev) => ({
        ...ev,
        formattedPrice: 'Rp ' + (ev.price || 0).toLocaleString('id-ID'),
        formattedDate: new Date(ev.startDate).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        isImageLoading: true
      }));
      this.setData({
        allRunning: formatted
      });
    } catch (e) {
      console.log(e, "<<< error running events");
      this.setData({
        allRunning: []
      });
    }
  },
  async fetchFavoriteEvents() {
    try {
      const res = await getFavoriteEvents();
      const events = (res.data && res.data.data) || [];
      const formatted = events.map((ev) => ({
        ...ev,
        formattedPrice: 'Rp ' + (ev.price || 0).toLocaleString('id-ID'),
        formattedDate: new Date(ev.startDate).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        isImageLoading: true
      }));
      this.setData({
        favoriteEvents: formatted
      });
    } catch (e) {
      this.setData({
        favoriteEvents: []
      });
    }
  },
  async fetchAllHotel() {
    try {
      const res = await getAllHotels();
      const events = (res.data && res.data.data) || [];
      this.setData({
        allHotels: events
      });
    } catch (e) {
      this.setData({
        allHotels: []
      });
    }
  },

  goToEventDetail(e) {
    const event = e.currentTarget.dataset.event;
    // console.log(event, "<<< event landing");

    if (event.externalLink) {
      my.call("showAppBar", {
        isShow: true,
        title: event.name
      }, () => {});
      customNavigateTo({
        url: "/src/app/pages/microsite/webview-lifestyle/webview-lifestyle",
        data: {
          partnerMenu: {
            title: event.name,
            urlMicrosite: event.externalLink
          },
          isFromLanding: true
        },
      });
    } else {
      customNavigateTo({
        url: `/src/app/pages/index/index`,
        data: {
          id: event.id,
        },
      });
    }
  },

  goToDetailHotel(e) {
    const { id } = e.currentTarget.dataset;
    
    const selectedHotel = this.data.hotelList.find(hotel => hotel.id === id);
    // navigateTo({
    //   url: "/src/app/pages/package_hotel/index/index"
    // })
    if (selectedHotel) {
      customNavigateTo({
        url: "/src/app/pages/package_hotel/index/index",
        data: { 
          hotelData: selectedHotel
        }
      });
    }
  },

  eventImageLoad(e) {
    const index = e.currentTarget.dataset.index;
    let allEvents = this.data.allEvents;
    if (allEvents[index]) {
      allEvents[index].isImageLoading = false;
      this.setData({
        allEvents
      });
    }
  },

  imageError(e) {
    const index = e.currentTarget.dataset.index;
    let dataPartner = this.data.dataPartner;
    dataPartner[index].isImageLoading = false;
    this.setData({
      dataPartner
    });
  },
  handleUpdate() {
    const clientPlatform = getApp().globalData.nativeData.clientPlatform;
    const url = clientPlatform === "ios" ? "https://apps.apple.com/id/app/wondr-by-bni/id6499518320" : "https://play.google.com/store/apps/details?id=id.bni.wondr";
    my.call("openURL", {
      url
    }, () => {})
  },

  goToHotelIndex() {
    customNavigateTo({
      url: "/src/app/pages/package_hotel/index/index",
      data: {
        source: 'landing_lifestyle',
        category: 'hotel'
      },
    });
  },

  goToLandingIndex(){
    customNavigateTo({
      url: "/src/app/pages/package_running/landing-running/landing-running",
      data: {
        source: 'landing_lifestyle',
        category: 'hotel'
      },
    });
  },
  goToEventIndex() {
    customNavigateTo({
      url: "/src/app/pages/package_event/landing-event/landing-event",
      data: {
        source: 'landing_lifestyle',
        category: 'event'
      },
    });
  },
  goToCafeIndex() {
    customNavigateTo({
      url: "/src/app/pages/package_culinary/landing-culinary/landing-culinary",
      data: {
        source: "landing_lifestyle",
        category: "cafe",
      },
    });
  },
  goToRestaurantIndex(e) {
    const categoryName = e.currentTarget.dataset.name;
    const partnerList = this.data.dataPartner.filter(item => item.partnerCategory.toLowerCase() === 'restaurant' || item.partnerCategory.toLowerCase() === 'restoran');

    customNavigateTo({
      url: "/src/app/pages/package_culinary/landing-culinary/landing-culinary",
      data: {
        categoryName,
        partnerList,
        lang: this.data.lang
      }
    });
  },

  goToRentalIndex(e) {
    const categoryName = e.currentTarget.dataset.name;
    const partnerList = this.data.dataPartner.filter(item => item.partnerCategory.toLowerCase() === 'rental');

    customNavigateTo({
      url: "/src/app/pages/category-list/category-list",
      data: {
        categoryName,
        partnerList,
        lang: this.data.lang
      }
    });
  },

  goToUmkmIndex(e) {
    const categoryName = e.currentTarget.dataset.name;
    const partnerList = this.data.dataPartner.filter(item => item.partnerCategory.toLowerCase() === 'umkm');

    customNavigateTo({
      url: "/src/app/pages/category-list/category-list",
      data: {
        categoryName,
        partnerList,
        lang: this.data.lang
      }
    });
  },

  goToCategoryDetail(e) {
    const categoryName = e.currentTarget.dataset.category;
    const partnerList = this.data.dataPartner.filter(item => {
      const itemCat = (item.partnerCategory || "").toLowerCase();
      const targetCat = categoryName.toLowerCase();
      if (targetCat === 'restoran' || targetCat === 'restaurant') {
        return itemCat === 'restoran' || itemCat === 'restaurant';
      }
      return itemCat === targetCat;
    });
    
    customNavigateTo({
      url: "/src/app/pages/category-list/category-list",
      data: {
        categoryName,
        partnerList,
        lang: this.data.lang
      },
    });
  },

  
  goToRunningIndex(e) {
    console.log(e, "<<<<index");
    const runningData =
      (e.currentTarget && (e.currentTarget.dataset.runningData || e.currentTarget.dataset.runningdata)) ||
      (e.target && (e.target.dataset.runningData || e.target.dataset.runningdata));

    if (runningData) {
      const isExternal =
        runningData.entryMode === 'external' ||
        runningData.entry_mode === 'external' ||
        Boolean(runningData.externalUrl) ||
        Boolean(runningData.external_url);
      const extUrl = runningData.externalUrl || runningData.external_url;

      if (isExternal && extUrl) {
        my.navigateTo({
          url: `/src/app/pages/webview/webview?url=${encodeURIComponent(extUrl)}`
        });
        return;
      }
    }

    customNavigateTo({
      url: "/src/app/pages/package_running/index/index",
      data: {
        source: 'landing_lifestyle',
        runningData: runningData,
      },
    });
  },
});
/* JShield-obfus:disable */
