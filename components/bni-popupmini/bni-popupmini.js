Component({
  mixins: [],
  data: {
    basicVisible: false
  },
  props: {
    basicVisible: Boolean(false),
    pixel: Boolean(false)
  },
  didUpdate: function didUpdate() {
    this.setData({
      basicVisible: this.props.basicVisible
    });
  },
  methods: {
    handlePopupClose: function handlePopupClose() {
      this.setData({
        basicVisible: false
      });
      this.props.onClose();
    }
  }
});