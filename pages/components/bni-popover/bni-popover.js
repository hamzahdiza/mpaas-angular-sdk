Page({
  data: {
    isControlledOpen: false,
  },
  onLoad() {},
  handleBackButton() {
    my.navigateBack();
  },
  toggleControlled() {
    this.setData({
      isControlledOpen: !this.data.isControlledOpen,
    });
  },
  handleControlledChange(visible) {
    this.setData({
      isControlledOpen: visible,
    });
  },
});
