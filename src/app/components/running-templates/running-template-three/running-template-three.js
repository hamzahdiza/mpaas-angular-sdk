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
    const data = this.props.data
    console.log(data,222);
    const runningData = {
      ...data,
      categories: (data.categories).map((item) => ({
        ...item,
        formatPrice: currencyFormat({
          value: item.price
        }),
        tickets: (item.tickets).map((el) => ({
          ...el,
          formatPrice: currencyFormat({
            value: el.price
          }),
          formatNormalPrice: currencyFormat({
            value: el.normalPrice
          })
        }))
      }))
    }
    this.setData({
      data:runningData,
    })
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