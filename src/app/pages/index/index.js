import {
  getAllEvents,
  getJavaJazzLandingData,
  getJavaJazzPendingOrder
} from "/src/public/api";
import {
  currencyFormat
} from "/src/utils/currency-util";
import {
  customNavigateTo
} from "/src/utils/route-util";
import generalError from "/src/utils/generalError";
import getNetWork from "/src/utils/getNetWork";

Page({
  data: {
    isExpanded: Boolean(false),
    isExpandInfo: Boolean(false),
    currentInfo: Number(0),
    currentPoster: Number(0),
    isFullscreen: Boolean(false),
    isLoading: Boolean(false),
    imageFullScreen: String(''),
    ticketDataList: Array(),
    ticketData: Object({}),
    lang: Object({}),
    templateId: '1',
    successFetch: false,
    detailEvent: {}
  },

  onLoad(query) {
    let queryData = {};
    if (query && query.customUrlQueryData && my.customUrlQueryData && my.customUrlQueryData[query.customUrlQueryData]) {
      queryData = my.customUrlQueryData[query.customUrlQueryData];
    } else {
      queryData = query || {};
    }

    const eventId = queryData.id || queryData.eventId || (queryData.eventData && queryData.eventData.id);
    const eventData = queryData.eventData || queryData.runningData || queryData.eventDetail;

    if (eventId) {
      this.setData({ eventId });
    }

    if (eventData) {
      this.setupEventData(eventData);
    } else if (eventId) {
      this.getLandingData();
    } else {
      this.getLandingData();
    }
  },

  onReady() {
    const app = getApp();
    const lang = (app.globalData && app.globalData.languagePack) || {
      lifestyleJavaJazzFestivalLandingScreenHeaderTitleLabel: "Wondr Event",
      lifestyleJavaJazzFestivalLandingScreenChooseTicketLabel: "Pilih Tiket",
      lifestyleJavaJazzFestivalLandingScreenPromoLabel: "Promo",
      lifestyleJavaJazzFestivalLandingScreenAmountStartFromLabel: "Mulai dari",
      lifestyleJavaJazzFestivalLandingScreenInfoSectionTitleLabel: "Info Penting"
    };

    this.setData({ lang });
  },

  onShow() {
    my.call("enableSwipe", { isSwipe: false }, () => {});
    getNetWork();
  },

  setupEventData(rawEvent) {
    const rawTemplateId = rawEvent.templateId
      || rawEvent.selected_template
      || rawEvent.selectedTemplate
      || (rawEvent.templates && rawEvent.templates.index && rawEvent.templates.index.id)
      || 'template-1';

    const normTemplateId = String(rawTemplateId);

    // Normalize banners
    let banners = [];
    if (rawEvent.bannerUrls && Array.isArray(rawEvent.bannerUrls) && rawEvent.bannerUrls.length > 0) {
      banners = rawEvent.bannerUrls;
    } else if (rawEvent.bannerUrl) {
      banners = [rawEvent.bannerUrl];
    } else if (rawEvent.images && Array.isArray(rawEvent.images) && rawEvent.images.length > 0) {
      banners = rawEvent.images;
    } else if (rawEvent.banner && Array.isArray(rawEvent.banner) && rawEvent.banner.length > 0) {
      banners = rawEvent.banner;
    } else {
      banners = ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'];
    }

    // Normalize tickets
    let tickets = rawEvent.ticketCategories || rawEvent.ticket_tiers || rawEvent.tickets || [];
    if (Array.isArray(tickets)) {
      tickets = tickets.map(t => {
        const p = Number(t.price || t.ticket_price || 0);
        return {
          ...t,
          id: t.id || t.ticket_id,
          name: t.name || t.ticket_name || 'Tiket Masuk',
          price: p,
          priceFormatted: 'Rp ' + p.toLocaleString('id-ID'),
          normalPriceFormatted: (t.maxPrice || t.normalPrice) ? ('Rp ' + Number(t.maxPrice || t.normalPrice).toLocaleString('id-ID')) : ''
        };
      });
    }

    const enriched = {
      ...rawEvent,
      name: rawEvent.name || rawEvent.eventName || 'Wondr Event',
      eventName: rawEvent.eventName || rawEvent.name || 'Wondr Event',
      templateId: normTemplateId,
      selected_template: normTemplateId,
      selectedTemplate: normTemplateId,
      bannerUrls: banners,
      bannerUrl: banners[0],
      banner: banners,
      ticketCategories: tickets,
      tickets: tickets,
      ticket_tiers: tickets,
      location: rawEvent.location || rawEvent.venueLocation || 'Stadion Utama Gelora Bung Karno, Jakarta Pusat',
      locationAddress: rawEvent.locationAddress || rawEvent.location || '',
      meetingUrl: rawEvent.meetingUrl || rawEvent.meeting_url || '',
      startDate: rawEvent.startDate || rawEvent.start_date || rawEvent.date || '15 Oktober 2026',
      description: rawEvent.description || 'Flagship running event BNI dengan rute...',
      termsAndConditions: rawEvent.termsAndConditions || rawEvent.terms_and_conditions || '1. Syarat dan ketentuan umum BNI Running berlaku. 2. Peserta terdaftar otomatis mendapatkan asuransi perlindungan.'
    };

    const app = getApp();
    if (app && app.globalData) {
      app.globalData.eventTitle = enriched.name;
    }

    this.setData({
      detailEvent: enriched,
      ticketDataList: tickets,
      templateId: normTemplateId,
      isLoading: false,
      successFetch: true
    });
  },

  async getLandingData() {
    this.setData({ isLoading: true });
    const eventId = this.data.eventId;

    try {
      // First attempt: fetch from all events
      const res = await getAllEvents().catch(() => null);
      let foundEvent = null;

      if (res && res.data) {
        const list = Array.isArray(res.data.data) ? res.data.data : (Array.isArray(res.data) ? res.data : []);
        if (eventId) {
          foundEvent = list.find(ev => String(ev.id) === String(eventId));
        }
        if (!foundEvent && list.length > 0) {
          foundEvent = list[0];
        }
      }

      if (foundEvent) {
        this.setupEventData(foundEvent);
        return;
      }

      // Fallback attempt: getJavaJazzLandingData
      if (eventId) {
        const legacyRes = await getJavaJazzLandingData(eventId).catch(() => null);
        if (legacyRes && legacyRes.data && legacyRes.data.dataProtected) {
          const dp = legacyRes.data.dataProtected;
          const ev = {
            ...(dp.detailEvent || {}),
            ticketCategories: dp.ticketCategories || []
          };
          this.setupEventData(ev);
          return;
        }
      }

      // If no data found, set fallback event
      this.setupEventData({
        id: eventId || 'event-001',
        name: 'BNI RUNNING 2026',
        templateId: 'template-1',
        location: 'Stadion Utama Gelora Bung Karno, Jakarta Pusat',
        meetingUrl: 'https://meet.google.com/bni-run',
        startDate: '2026-10-15',
        bannerUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
      });
    } catch (err) {
      console.error("Error in getLandingData:", err);
      this.setData({ isLoading: false, successFetch: false });
    }
  },

  goToTicketList(eventOrData) {
    let ticketData;
    if (eventOrData && eventOrData.target && eventOrData.target.dataset) {
      ticketData = eventOrData.target.dataset.ticketData;
    } else {
      ticketData = eventOrData;
    }

    const eventDetail = {
      ...this.data.detailEvent,
      ticketCategories: this.data.ticketDataList || this.data.detailEvent.ticketCategories || []
    };

    const templateId = this.data.templateId || (eventDetail && (eventDetail.templateId || eventDetail.selected_template || eventDetail.selectedTemplate)) || 1;

    console.log("[Index] Navigating to book-ticket with templateId:", templateId, ticketData, eventDetail);
    customNavigateTo({
      url: "/src/app/pages/book-ticket/book-ticket",
      data: {
        templateId: templateId,
        ticketData: ticketData || (eventDetail.ticketCategories && eventDetail.ticketCategories[0]),
        eventDetail: eventDetail,
        runningData: eventDetail
      }
    });
  },

  goToTransactionHistory() {
    customNavigateTo({
      url: "/src/app/pages/transaction-history/transaction-history",
      data: {}
    });
  },

  popupPromoClose() {
    this.setData({ isFullscreen: false });
  }
});