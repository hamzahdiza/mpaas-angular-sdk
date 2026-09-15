Component({
  props: {
    data: {},
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
    }
  }
});