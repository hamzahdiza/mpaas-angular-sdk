Page({
  data: {
    toggleStatus : false
  },
  onLoad() {
  },
  onClick(){
    this.setData({toggleStatus : !this.data.toggleStatus})
  }
});
