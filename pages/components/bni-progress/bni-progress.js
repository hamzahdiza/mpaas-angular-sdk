Page({
  data: {
    percent: 30,
    initialFill : 0
  },
  onLoad() {},
  onIncrease(){
    this.setData({
      percent : this.data.percent + 10,
      initialFill: this.data.percent
    })
  },
  onDecrease(){
    this.setData({
      percent : this.data.percent - 10,
      initialFill : this.data.percent
    })
  }
});
