/* JShield-obfus:enable */
Component({
  mixins: [],
  data: {
    errorInternet: false
  },
  props: {},
  didMount() {
    this.$page.currentInternetErrorCom = this
    my.errorInternetModalFunc = (flag) => {
      const _this_ = getCurrentPages()[getCurrentPages().length - 1].currentInternetErrorCom
      my.call("enableSwipe", { isSwipe: false }, () => {})
      my.hideKeyboard()
      setTimeout(() => {
        _this_.setData({
          errorInternet: flag,
          lang: getApp().globalData.languagePack
        })
      }, 300);
        _this_.$page.setData({
        lottieLoading: false,
        submitting: false,
        productDetailIsLoading: false
      })
    }
    my.getNetworkType({
      success: (res) => {
        if (!res.networkAvailable) {
          my.errorInternetModalFunc(true);
        }
      }
    })
  },
  didUpdate() {},
  didUnmount() {},
  methods: {},
});

/* JShield-obfus:disable */