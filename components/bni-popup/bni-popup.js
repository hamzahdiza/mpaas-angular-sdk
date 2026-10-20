Component({
  mixins: [],
  data: {
    scrollId: String(),
    reachedBottom: Boolean(false)
  },
  props: {
    /**
     * Defines the type of popup (modal, fullscreen, bottom-sheet)
     * @type {Boolean}
     */
    type: String('modal'),
    /**
     * Defines title of the popup/modal
     * @type {String}
     */
    title: String(),
    /**
     * Defines the icon of the popup/modal (success, warning, error)
     * @type {String}
     */
    icon: String(),
    /**
     * Defines whether the popup is openend
     * @type {Boolean}
     */
    isOpen: Boolean(false),
    /**
     * Defines the text of the content if using props 
     * @type {String}
     */
    paragraph: String(),
    /**
     * Defines the illustration path if using props 
     * @type {String}
     */
    illustration: String(), // illustration path
    /**
     * Defines the illustration size if using props (normal, large)
     * @type {String}
     */
    illustrationSize: String("normal"), // normal, large
    /**
     * Function to close the modal
     * @type {Function}
     */
    onClose: Function() || undefined,
    /**
     * Sheet height in px (ex: '500px')
     * @type {String}
     */
    sheetHeight: String() || undefined,
    /**
     * To show button to scroll to bottom
     * @type {Boolean}
     */
    withScrollButton: Boolean() || undefined,
    /**
     * To use slot content
     * @type {Boolean}
     */
    useSlotContent: Boolean() || undefined,
    /**
     * ids for close button
     * @type {String}
     */
    idClose: String() || null,
    /**
     * ids for content container
     * @type {String}
     */
    idContentContainer: String() || null,
    /**
     * ids for illustration
     * @type {String}
     */
    idIllustration: String() || null,
    /**
     * ids for title icon
     * @type {String}
     */
    idIcon: String() || null,
    /**
     * ids for title
     * @type {String}
     */
    idTitle: String() || null,
    /**
     * ids for paragraph/text description
     * @type {String}
     */
    idParagraph: String() || null,
    /**
     * ids for CTA1 if using props
     * @type {String}
     */
    idCTA1: String() || null,
    /**
     * ids for CTA2 if using props
     * @type {String}
     */
    idCTA2: String() || null,
    /**
     * ids for CTA3 if using props
     * @type {String}
     */
    idCTA3: String() || null,
    /**
     * ids for scroll to bottom button
     * @type {String}
     */
    idScrollButton: String() || null,
    /**
     * ids for sheet container
     * @type {String}
     */
    idSheetContainer: String() || null,
    /**
     * icon for close button full screen modal
     * @type {String}
     */
    closeIconPath: String() || null,
  },
  didMount() {
    const systemInfo = my.getSystemInfoSync()
    const safeAreaDistance = {
      top: systemInfo.safeArea.top,
      bottom: this.props.safeArea ? (systemInfo.screen.height - systemInfo.safeArea.bottom) : 0
    }
    this.setData({
      safeAreaDistance,
      ...this.props,
    })
  },
  didUpdate(prevProps) {
    if (JSON.stringify(prevProps) != JSON.stringify(this.props)) {
      const systemInfo = my.getSystemInfoSync()
      const safeAreaDistance = {
        top: systemInfo.safeArea.top,
        bottom: this.props.safeArea ? (systemInfo.screen.height - systemInfo.safeArea.bottom) : 0
      }
      this.setData({
        safeAreaDistance,
        ...this.props,
      })
    }
  },
  methods: {
    onClose() {
      if (this.props.onClose) {
        this.props.onClose()
        this.setData({
          topScroll: 0,
        });
      }
    },
    onScroll(e) {
      this.setData({
        topScroll: e.detail.scrollTop,
      });
    },
    onTapCTA1(e) {
      if (this.props.onTapCTA1) {
        this.props.onTapCTA1(e)
      }
    },
    onTapCTA2(e) {
      if (this.props.onTapCTA2) {
        this.props.onTapCTA2(e)
      }
    },
    onTapCTA3(e) {
      if (this.props.onTapCTA3) {
        this.props.onTapCTA3(e)
      }
    },
    onScrollToBottom() {
      this.setData({
        scrollId: 'bottom-end',
        reachedBottom: true
      })
    },
  },
});