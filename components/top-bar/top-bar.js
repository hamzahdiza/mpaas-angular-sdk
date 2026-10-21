Component({
  mixins: [],
  data: {
    titleBarHeight: '44px',
    statusBarHeight: '24px'
  },

  props: {
    /**
     * type: "primary" | "userInfo" | "navigation" | "chipButton"
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
     * onIconLTap is a callback to handle Left button.
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
     * onChipButtonTap is a callback to handle Chip Button
     */
    onChipButtonTap: Function(),
    /**
     * onChipResetTap is a callback to reset Chip state
     */
    onChipResetTap: Function(),
    /**
     * Whether to exit mini program
     */
    exit: Boolean(false),
    /**
     * safeArea is prop to add space on the top bar *default value = false
     */
    safeArea: Boolean(false),
    /**
     * titleChipButton is prop to adding text title in your chip button in type = "chipButton"
     */
    titleChipButton: String(""),
    classChipButton: String(""),
    /**
     * disabledChipButton is prop to make your chip button inactive
     */
    disabledChipButton: Boolean(false),
    /**
     * pixel is a prop that allows us to use pixels in styling
     */
    pixel: Boolean(false),
    /**
     * prop that need to be trigger when scrolled
     */
    isScrolled: Boolean(false),
    titlePosition: String(""),
    tapStatus: Boolean(false)
  },
  didMount() {
    this.setData({
      ...this.props
    });
    this.resolveSystemInfo();
  },
  didUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setData({
        ...this.props
      });
      this.resolveSystemInfo();
    }
  },
  methods: {
    resolveSystemInfo() {
      const isPixel = this.props.pixel;
      try {
        const sys = (typeof my !== 'undefined' && my.getSystemInfoSync && my.getSystemInfoSync()) || {};
        const rawStatus = (sys && sys.statusBarHeight) || 24;
        const rawTitle = (sys && sys.titleBarHeight) || 44;
        const statusBarHeight = isPixel ? `${rawStatus}px` : `${rawStatus * 2}rpx`;
        const titleBarHeight = isPixel ? `${rawTitle}px` : `${rawTitle * 2}rpx`;

        this.setData({
          titleBarHeight,
          statusBarHeight
        });
      } catch (e) {}

      if (typeof my !== 'undefined' && my.getSystemInfo) {
        my.getSystemInfo({
          success: (res) => {
            const rawStatus = (res && res.statusBarHeight) || 24;
            const rawTitle = (res && res.titleBarHeight) || 44;
            const statusBarHeight = isPixel ? `${rawStatus}px` : `${rawStatus * 2}rpx`;
            const titleBarHeight = isPixel ? `${rawTitle}px` : `${rawTitle * 2}rpx`;

            this.setData({
              titleBarHeight,
              statusBarHeight
            });
          }
        });
      }
    },

    onIconLTapDefault() {
      if (this.props.navigate && this.props.iconL && this.props.iconL.length > 1 && this.props.onIconLTap === undefined) {
        my.navigateBack();
      }
    },

    onIconLTap() {
      if (this.props.navigate && this.props.iconL && this.props.iconL.length > 1 && this.props.onIconLTap !== undefined) {
        this.props.onIconLTap();
      }
    },

    onIconRTap() {
      if (this.props.onIconRTap && this.props.iconR && this.props.iconR.length > 1) {
        this.props.onIconRTap();
      }
    },

    onIconRTapSecondary() {
      if (this.props.onIconRTapSecondary && this.props.iconRSecondary && this.props.iconRSecondary.length > 1) {
        this.props.onIconRTapSecondary();
      }
    },

    onIconRTapTertiary() {
      if (this.props.onIconRTapTertiary && this.props.iconRTertiary && this.props.iconRTertiary.length > 1) {
        this.props.onIconRTapTertiary();
      }
    },

    onChipButtonTap() {
      if (this.props.onChipButtonTap) {
        this.props.onChipButtonTap();
      }
    },

    onChipResetTap() {
      if (this.props.onChipResetTap) {
        this.props.onChipResetTap();
      }
    }
  }
});