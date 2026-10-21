Page({
  data: {
    count: 0,
    classReferal: "border-dash-chip",
    titleChiButton: "Kode Referal",
    scrollTriggerTimer: null,
    typeSelections:[
      'Semua',
      'PasarUang',
      'Pendapatan Tetap',
      'Campuran',
      'Saham',
    ],
    tapStatus: Boolean(false)
  },

  onLoad() {

    my.setNavigationBarTitle({
      title: ""
    })
  },

  onPageScroll(e) {
    let isScrolled = Math.round(e.scrollTop) > 300
    this.setData({
      isScrolled
    })
  },

  handleIconTap() {
    my.navigateTo({
      url: '../page2/page2'
    });

    this.setData({
      someStateVariable: "newValue"
    });
  },

  handleIconLTap() {
    this.setData({
      count: this.data.count + 1
    })
  },

  handleTapChipButton() {
    this.setData({
      classReferal: "border-green-chip",
      titleChiButton: "50074",
      tapStatus: true
    })
  },

  handleResetChipButton() {
    this.setData({
      classReferal: "border-dash-chip",
      titleChiButton: "Kode Referal",
      tapStatus: false
    })
  }
});