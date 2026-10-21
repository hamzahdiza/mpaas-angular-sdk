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
    isLoading: true,
  },

  onLoad() {
    setTimeout(()=>{
      this.setData({
        isLoading: false
      })
    }, 2000)

    my.setNavigationBarTitle({
      title: ""
    })
  },

  onPageScroll(e) {
    let isScrolled = Math.round(e.detail.scrollTop) > 100
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
      titleChiButton: "50074"
    })
  }
});