import { getAllEvents, getAllHotels } from "/src/public/api";
import { currencyFormat } from "/src/utils/currency-util";
import { customNavigateTo } from "/src/utils/route-util";
import generalError from "/src/utils/generalError";
import getNetWork from "/src/utils/getNetWork";

Page({
  data: {
    eventList: [],
    isLoading: true,
    successFetch: false,
    lang: {},
  },

  onLoad() {
    this.fetchHotels();
  },

  onShow() {
    getNetWork();
    my.call("hideAppBar"); // Mengikuti style landing yang custom bar
  },

  async fetchHotels() {
    this.setData({ isLoading: true });
    try {
      console.log(1111);
      // Mocking call ke /lifestyle/v1/all-hotels
      
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
        eventList: formatted,
        successFetch: true,
        isLoading: false
      });
    } catch (error) {
      console.log(error, "<<< ERROR list event");
      this.setData({ isLoading: false, successFetch: false });
      generalError({ err: error, isSwipe: true });
    }
  },

  goToDetail(e) {
    const { id } = e.currentTarget.dataset;
    const selectedEvent = this.data.eventList.find(event => event.id === id);
    console.log(selectedEvent);

    if (selectedEvent) {
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
        },
      });
    }
  },


  onGoBack() {
    my.navigateBack();
  }
});