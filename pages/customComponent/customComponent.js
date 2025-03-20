Page({
  data: {
    list: []
  },
  onLoad() {
    this.setList();
  },
  setList() {
    let tempList = new Array(31).fill(0).map((_, i) => i + 1);

    this.setData({
      list: tempList
    });
  }
});
