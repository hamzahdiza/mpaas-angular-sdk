Page({
  data: {
    currentIndex: Number(0),
    type: String(''),
    dataStory: []
  },

  onLoad(query) {
    let lang = getApp().globalData.languagePack;
    const dataStory = [{
        title: 'Kapan ya waktu paling pas buat beli produk investasi?1',
        subTitle: 'Jangan sampai kegalauan begini bikin kamu ragu konsisten berinvestasi.  Rutinin dulu aja!1',
        image: "/image/asvg_investment_20_RSP_intro_first.svg"
      },
      {
        title: 'Kapan ya waktu paling pas buat beli produk investasi?2',
        subTitle: 'Jangan sampai kegalauan begini bikin kamu ragu konsisten berinvestasi.  Rutinin dulu aja!2',
        image: "/image/asvg_investment_20_RSP_intro_second.svg"
      },
      {
        title: 'Kapan ya waktu paling pas buat beli produk investasi?3',
        subTitle: 'Jangan sampai kegalauan begini bikin kamu ragu konsisten berinvestasi.  Rutinin dulu aja!3',
        image: "/image/asvg_investment_20_RSP_intro_third.svg"
      },
    ]
    console.log(getApp().globalData.inputValueRsp);
    this.setData({
      lang,
      dataStory,
      timeoutRsp: getApp().globalData.inputValueRsp
    })

    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      this.setData({
        count: counter
      });

      if (counter >= getApp().globalData.inputValueRsp / 1000) {
        clearInterval(interval);
      }
    }, 1000);
  },

  onSwiperChange(e) {
    this.setData({
      currentIndex: e.detail.current
    });
  },

  navBack() {
    my.navigateBack()
  },

  handleClick(e) {
    const data = e.target.dataset.props
    this.setData({
      type: data === "story" ? "storyWithoutProgress" : data === "dots" ? "storyWithDots" : "storyProgressBar",
      show: false
    })
  },

  scrollToNext() {
    this.setData({
      count: 0
    })
    const {
      currentIndex
    } = this.data;
    if (currentIndex < this.data.dataStory.length) {
      this.setData({
        currentIndex: currentIndex + 1
      });
    }

    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      this.setData({
        count: counter
      });

      if (counter >= getApp().globalData.inputValueRsp / 1000) {
        clearInterval(interval);
      }
    }, 1000);
  },

  scrollToPrev() {
    this.setData({
      count: 0
    })
    const {
      currentIndex
    } = this.data;
    if (currentIndex > 0) {
      this.setData({
        currentIndex: currentIndex - 1
      });
    }
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      this.setData({
        count: counter
      });

      if (counter >= getApp().globalData.inputValueRsp / 1000) {
        clearInterval(interval);
      }
    }, 1000);
  },

  handleMoveScreen() {

  }
});