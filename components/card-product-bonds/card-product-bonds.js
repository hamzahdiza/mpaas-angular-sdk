/* JShield-obfus:enable */
Component({
  mixins: [],
  data: {},
  props: {
    dataProduct: {
      id: String(""),
      image: String(""),
      seri: String(""),
      seriName: String(""),
      currency: String(""),
      remainingQuotaNationalFormatted: String(""),
      remainingQuotaPercentageFormatted: Number(),
      couponRate: String(""),
      startPurchasePeriod: String(""),
      endPurchasePeriod: String(""),
      couponType: String(""),
      startDateFormatted: String(""),
      endDateFormatted: String(""),
      isShrink: Boolean(false)
    },
  },
  didMount() {
    let lang = getApp().globalData.languagePack;
    const remainingQuotaPercentage = this.props.dataProduct.remainingQuotaPercentageFormatted

    const startDateFormatted = this.props.dataProduct.startDateFormatted;
    const yearPattern = /\d{4}/
    const isShrink = yearPattern.test(startDateFormatted);

    this.setData({
      lang,
      status: remainingQuotaPercentage || remainingQuotaPercentage == 0 ? 'available' : 'incoming',
      isShrink,
    })

  },

  didUpdate(prevProps) {
    if (JSON.stringify(prevProps) != JSON.stringify(this.props)) {
      this.setData({
        ...this.props,
      });
    }
  },

  didUnmount() {},
  methods: {
    checkIconBroken() {
      this.setData({
        dataProduct: {
          ...this.props.dataProduct,
          image: this.props.dataProduct.imageBroken,
        },
      });
    },
    
    cardOnTap() {
      this.props.onCardTap({
        availableProduct: this.props.dataProduct
      })
    },
  },
});
/* JShield-obfus:disable */