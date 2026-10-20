import { getAllEvents } from "/src/public/api";
import { customNavigateTo } from "/src/utils/route-util";
import generalError from "/src/utils/generalError";
import getNetWork from "/src/utils/getNetWork";

Page({
  data: {
    isLoading: true,
    searchQuery: '',
    selectedCategory: 'ALL',
    allEvents: [],
    filteredEvents: [],
    
    // Universal Category Filter Chips
    filterCategories: [
      { id: 'ALL', label: 'Semua Event', icon: '✨' },
      { id: 'konser', label: 'Konser & Musik', icon: '🎵' },
      { id: 'olahraga', label: 'Olahraga & Lari', icon: '🏃' },
      { id: 'festival', label: 'Festival & Seni', icon: '🎪' },
      { id: 'seminar', label: 'Seminar & Edukasi', icon: '💡' }
    ]
  },

  onLoad(query) {
    if (query && query.category) {
      this.setData({ selectedCategory: query.category });
    }
    this.fetchEvents();
  },

  onShow() {
    getNetWork();
    my.call("showAppBar", { isShow: false, title: "" }, () => {});
  },

  onPullDownRefresh() {
    this.fetchEvents(() => {
      my.stopPullDownRefresh();
    });
  },

  async fetchEvents(callback) {
    this.setData({ isLoading: true });
    try {
      const res = await getAllEvents();
      let rawEvents = [];
      if (res && res.data && Array.isArray(res.data.data)) {
        rawEvents = res.data.data;
      } else if (res && Array.isArray(res.data)) {
        rawEvents = res.data;
      }

      const formatted = rawEvents.map((ev) => {
        const rawPrice = Number(ev.price || 0);
        const rawNormalPrice = Number(ev.normalPrice || ev.normal_price || ev.maxPrice || ev.max_price || 0);
        const rawDiscount = Number(ev.discountedPrice || 0);

        let price = rawPrice;
        let normalPrice = rawNormalPrice;
        if (rawDiscount > 0 && rawDiscount < rawPrice) {
          price = rawDiscount;
          normalPrice = rawPrice;
        }

        // Detect universal category tag
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
          location: ev.location || ev.venue || 'Lokasi Tertera di Tiket'
        };
      });

      this.setData({
        allEvents: formatted,
        isLoading: false
      });

      this.applyFilters();
    } catch (error) {
      console.error("Error fetching events in landing-event:", error);
      this.setData({ isLoading: false });
      generalError({ err: error, isSwipe: true });
    } finally {
      if (callback) callback();
    }
  },

  filterByCategory(e) {
    const catId = e.currentTarget.dataset.id;
    this.setData({ selectedCategory: catId }, () => {
      this.applyFilters();
    });
  },

  onSearchInput(e) {
    const query = (e.detail.value || '').toLowerCase().trim();
    this.setData({ searchQuery: query }, () => {
      this.applyFilters();
    });
  },

  applyFilters() {
    const { allEvents, selectedCategory, searchQuery } = this.data;
    let list = [...allEvents];

    // 1. Filter by category
    if (selectedCategory && selectedCategory !== 'ALL') {
      list = list.filter(ev => {
        const cat = (ev.category || '').toLowerCase();
        const name = (ev.name || '').toLowerCase();
        if (selectedCategory === 'konser') {
          return cat.includes('konser') || cat.includes('music') || cat.includes('musik') || name.includes('concert') || name.includes('jazz');
        } else if (selectedCategory === 'olahraga') {
          return cat.includes('lari') || cat.includes('run') || cat.includes('marathon') || cat.includes('sport') || name.includes('run') || name.includes('marathon');
        } else if (selectedCategory === 'festival') {
          return cat.includes('festival') || cat.includes('pameran') || cat.includes('expo') || cat.includes('art');
        } else if (selectedCategory === 'seminar') {
          return cat.includes('seminar') || cat.includes('workshop') || cat.includes('edukasi') || cat.includes('tech');
        }
        return true;
      });
    }

    // 2. Filter by search query
    if (searchQuery) {
      list = list.filter(ev => {
        const matchName = ev.name && ev.name.toLowerCase().includes(searchQuery);
        const matchLoc = ev.location && ev.location.toLowerCase().includes(searchQuery);
        const matchCat = ev.category && ev.category.toLowerCase().includes(searchQuery);
        return matchName || matchLoc || matchCat;
      });
    }

    this.setData({ filteredEvents: list });
  },

  goToDetail(e) {
    const { id } = e.currentTarget.dataset;
    const selectedEvent = this.data.allEvents.find(event => event.id === id);
    if (!selectedEvent) return;

    const isExternal =
      selectedEvent.entryMode === 'external' ||
      selectedEvent.entry_mode === 'external' ||
      Boolean(selectedEvent.externalUrl) ||
      Boolean(selectedEvent.external_url);
    const extUrl = selectedEvent.externalUrl || selectedEvent.external_url;

    if (isExternal && extUrl) {
      my.navigateTo({
        url: `/src/app/pages/webview/webview?url=${encodeURIComponent(extUrl)}`
      });
      return;
    }

    customNavigateTo({
      url: `/src/app/pages/index/index`,
      data: {
        id: id,
        eventData: selectedEvent
      }
    });
  }
});