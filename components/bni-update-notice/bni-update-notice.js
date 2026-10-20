/* JShield-obfus:enable */
Component({
  mixins: [],
  data: {
    overlayNoticeVisible: false,
  },
  props: {
    /**
     * popupVisible: use to trigger popup, 
     * default: false
     */
    popupVisible: Boolean(false),
    /**
     * imgUrl: use to Render Image, 
     * default: ""
     */
    contentObj: Object({
      imgUrl: String(''),
      /**
       * swipeOut: use to Render Title Content Text, 
       * default: ""
       */
      titleText: String(''),
      /**
       * swipeOut: use to Render Content Text, 
       * default: ""
       */
      contentText: String(''),
      /**
       * swipeOut: use to Primary Button Text, 
       * default: ""
       */
      btnPrimaryText: String(''),
      /**
       * swipeOut: use to Secondary Button Text, 
       * default: ""
       */
      btnSecondaryText: String(''),
    }),
    /**
     * swipeOut: callback function that can be triggered the Update Redirect to Update Page / JSAPI CALL, 
     * default: ""
     */
    onHandleUpdate: Function()
  },
  didMount() {
    this.setData({
      ...this.props,
      overlayNoticeVisible: this.props.popupVisible
    })
  },
  didUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setData({
        ...this.props,
        overlayNoticeVisible: this.props.popupVisible
      })
    }
  },
  methods: {
    closeUpdateNotice() {
      this.setData({
        overlayNoticeVisible: false
      })
    },
    handleEvent(e){
      this.props.onHandleUpdate(e)
    }
  },
});
/* JShield-obfus:disable */
