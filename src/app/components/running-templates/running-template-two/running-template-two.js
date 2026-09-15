Component({
  props: {
    data: {
      isDescOpen:false,
      isTncOpen:false
    },
    onScreenChange: () => {}
  },

  didMount(){
    console.log(this.props.runningData,"component");
    console.log(this.data.data,"component");
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