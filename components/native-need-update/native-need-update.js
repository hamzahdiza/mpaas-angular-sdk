Component({
  mixins: [],
  data: {
    nativeUpdateModal: false
  },
  props: {},
  didMount() {
    this.$page.currentFeatureCom = this
    my.nativeNeeUpdateFunc = (flag) => {
      const _this_ = getCurrentPages()[getCurrentPages().length - 1].currentFeatureCom
      my.call("enableSwipe", {
        isSwipe: false
      }, () => {})
      setTimeout(() => {
        _this_.setData({
          nativeUpdateModal: flag,
          lang: getApp().globalData.languagePack
        })
      }, 300);
    }
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    onClickUpdate() {
      let userAgent = getApp().globalData.nativeData.userAgent
      my.call("getAppConfig", {
        "keys": [
          "mpaas.mobile.app.defaultAndroidStoreDeeplink",
          "mpaas.mobile.app.defaultIosStoreDeeplink"
        ],
        success: (res) => {
          let urlUpdate = userAgent.toLowerCase() == "android" ? res["mpaas.mobile.app.defaultAndroidStoreDeeplink"] : res["mpaas.mobile.app.defaultIosStoreDeeplink"]
          my.call("openURL", {
            url: urlUpdate
          });
        }
      });
    },

    onCloseOverlay() {
      const _this_ = getCurrentPages()[getCurrentPages().length - 1].currentFeatureCom
      _this_.setData({
        nativeUpdateModal: false
      })
    }
  },
});