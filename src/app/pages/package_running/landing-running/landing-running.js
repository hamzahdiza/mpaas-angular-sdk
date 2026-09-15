import { getAllRunning } from "/src/public/api";
import { currencyFormat } from "/src/utils/currency-util";
import { customNavigateTo } from "/src/utils/route-util";
import generalError from "/src/utils/generalError";
import getNetWork from "/src/utils/getNetWork";

Page({
  data: {
    hotelList: [],
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
      // Mocking call ke /lifestyle/v1/all-hotels
      const res = await getAllRunning();
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
        
        // console.log(formattedHotels, "<<< hotel");
        this.setData({
          hotelList: formatted,
          successFetch: true,
          isLoading: false
        });
      
    } catch (error) {
      console.log(error, "<<< ERROR list hotrls");
      this.setData({ isLoading: false, successFetch: false });
      generalError({ err: error, isSwipe: true });
    }
  },

  goToDetail(e) {
    const { id } = e.currentTarget.dataset;
    const runningData =
      e.currentTarget.dataset.runningData ||
      e.currentTarget.dataset.runningdata ||
      (e.target && (e.target.dataset.runningData || e.target.dataset.runningdata));
    const selectedHotel = this.data.hotelList.find(hotel => hotel.id === id) || runningData;

    if (selectedHotel) {
      const isExternal =
        selectedHotel.entryMode === 'external' ||
        selectedHotel.entry_mode === 'external' ||
        Boolean(selectedHotel.externalUrl) ||
        Boolean(selectedHotel.external_url);
      const extUrl = selectedHotel.externalUrl || selectedHotel.external_url;

      if (isExternal && extUrl) {
        my.navigateTo({
          url: `/src/app/pages/webview/webview?url=${encodeURIComponent(extUrl)}`
        });
        return;
      }

      customNavigateTo({
        url: "/src/app/pages/package_running/index/index",
        data: { 
          source: 'landing_lifestyle',
          runningData: selectedHotel
        }
      });
    }
  },


  onGoBack() {
    my.navigateBack();
  }
});