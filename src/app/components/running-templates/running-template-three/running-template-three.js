import {
  currencyFormat
} from "/src/utils/currency-util"
Component({
  props: {
    data: {
      isDescOpen:false,
      isTncOpen:false
    },
    onScreenChange: () => {}
  },

  didMount(){
    const data = this.props.data || {};
    const categories = (data.categories || []).map((item) => {
      const price = Number(item.price || 0);
      const normalPrice = Number(item.normalPrice || item.normal_price || item.maxPrice || item.max_price || item.originalPrice || 0);
      return {
        ...item,
        price,
        normalPrice,
        formatPrice: currencyFormat({ value: price }),
        formatNormalPrice: (normalPrice > price && normalPrice > 0) ? currencyFormat({ value: normalPrice }) : '',
        tickets: (item.tickets || []).map((el) => {
          const tPrice = Number(el.price || price || 0);
          const tNormalPrice = Number(el.normalPrice || el.normal_price || el.maxPrice || el.max_price || normalPrice || 0);
          return {
            ...el,
            price: tPrice,
            normalPrice: tNormalPrice,
            formatPrice: currencyFormat({ value: tPrice }),
            formatNormalPrice: (tNormalPrice > tPrice && tNormalPrice > 0) ? currencyFormat({ value: tNormalPrice }) : ''
          };
        })
      };
    });

    const eventPrice = Number(data.price || 0);
    const eventNormalPrice = Number(data.normalPrice || data.normal_price || data.maxPrice || data.max_price || data.originalPrice || 0);

    const runningData = {
      ...data,
      formattedPrice: currencyFormat({ value: eventPrice }),
      formattedNormalPrice: (eventNormalPrice > eventPrice && eventNormalPrice > 0) ? currencyFormat({ value: eventNormalPrice }) : '',
      categories
    };
    this.setData({
      data: runningData,
    });
  },
  methods: {
    handleRoomTap(e) {
      const { ticket } = e.currentTarget.dataset;
      this.props.onScreenChange(ticket);
    },

    toggleDescription() {
      this.setData({
        isDescOpen: !this.data.isDescOpen
      });
    },

    toggleTnc() {
      this.setData({
        isTncOpen: !this.data.isTncOpen
      });
    },

    toggleReadMore() {
      this.setData({
        isDescExpanded: !this.data.isDescExpanded
      });
    },
  }
});