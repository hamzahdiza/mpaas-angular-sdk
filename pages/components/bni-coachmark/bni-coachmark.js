Page({
  data: {
    showCoachmark1: true,
    highlightPosition1: {
      top: 450,
      right: 19,
      width: 40,
      height: 40,
    },
    showCoachmark2: false,
    highlightPosition2: {
      top: 135,
      right: 25,
      height: 230,
    },
  },
  onLoad() {},
  closeCoachmark1() {
    this.setData({
      showCoachmark1: false,
      showCoachmark2: true
    })
  },
  closeCoachmark2() {
    this.setData({
      showCoachmark2: false
    })
  }
});