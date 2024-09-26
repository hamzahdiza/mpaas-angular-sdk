Component({
  mixins: [],
  data: {
    titleBarHeight: 0,
    statusBarHeight: 0
  },

  props: {
    /**
     * type: "primary" | "userInfo" | "navigation"
     */
    type: String("navigation"),

    /**
     *  navigate is prop to activate navigation back in type = "navigation"
     */
    navigate: Boolean(false),

    /**
     *  isNotify is prop to activate notification badge in type = "userInfo"
     */
    isNotify: Boolean(false),

    /**
     *  iconNotify is prop to Icon badge notification in type = "userInfo"
     */
    iconNotify: String(""),
    /**
     * backgroundColor: "Class Name" | "Hex Color". Default background Color : #FFFFFF
     */
    backgroundColor: String("bg-off-white"),

    /**
     * color: "Class Name" | "Hex Color". Default background Color : #000000
     */
    color: String("txt-black"),

    /**
     * username is prop to adding text username in your top bar in type = "userInfo"
     */
    username: String(""),

    /**
     * title is prop to adding text title in your top bar in type = "navigation"
     */
    title: String(""),

    /**
     * iconLogo is prop to Icon Logo
     */
    iconLogo: String(""),

    /**
     * photoProfile is prop to fill user's photo profile
     */
    photoProfile: String(""),

    /**
     * If you want to activate navigation back, besides having to add the "iconL" prop, you also have to add the "navigate" prop to true
     */
    iconL: String(""),
    /**
     * iconR is prop to Icon R 
     */
    iconR: String(""),
    /**
     * iconRSecondary is prop to Icon R Secondary
     */
    iconRSecondary: String(""),
    /**
     * iconRTertiary is prop to Icon R Tertiary
     */
    iconRTertiary: String(""),
    /**
     * onIconLTap is a callback to handle Left button. You can perform custom functions on iconL. By default, if you don't write the "onIconLTap" prop, iconL functions as a back button, to navigate to the previous page
     */
    onIconLTap: Function(),
    /**
     * onIconRTap is a callback to handle Right button
     */
    onIconRTap: Function(),
    /**
     * onIconRTapSecondary is a callback to handle Secondary R button
     */
    onIconRTapSecondary: Function(),
    /**
     * onIconRTapTertiary is a callback to handle Tertiary R button
     */
    onIconRTapTertiary: Function(),
    /**
     * Whether to exit mini program
     */
    exit: Boolean(false)
  },
  didMount() {
    this.setData({
      ...this.props
    })
    my.getSystemInfo({
      success: (res) => {
        this.setData({
          titleBarHeight: res.titleBarHeight,
          statusBarHeight: res.statusBarHeight
        })
      }
    })
  },
  methods: {
    onIconLTapDefault() {
      if (this.props.navigate && this.props.iconL.length > 1 && this.props.onIconLTap === undefined) {
        my.navigateBack()
      }
    },
    
    onIconLTap() {
      if (this.props.navigate && this.props.iconL.length > 1 && this.onIconLTap !== undefined) {
        this.props.onIconLTap()
      }
    },

    onIconRTap() {
      if (this.props.onIconRTap && this.props.iconR.length > 1) {
        this.props.onIconRTap()
      }
    },

    onIconRTapSecondary() {
      if (this.props.onIconRTapSecondary && this.props.iconRSecondary.length > 1) {
        this.props.onIconRTapSecondary()
      }
    },

    onIconRTapTertiary() {
      if (this.props.onIconRTapTertiary && this.props.iconRTertiary.length > 1) {
        this.props.onIconRTapTertiary()
      }
    },

  },
  didUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setData({
        ...this.props
      })
    }
  },
});