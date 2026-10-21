Page({
  data: {
    bottomSafeArea: true,
    typeSelected: 'modal',
    illustrationSelected: undefined,
    illustrationSizeSelected: undefined,
    illustrationPath: "./illustration.svg",
    iconSelected: undefined,
    ctaSelected: false,
    withScrollButton:true,
    isOpen: false,
    title: String("TitleHeadlineTitleHeadlineTitleHeadlineTitleHeadline"),
    paragraph: String("Lorem ipsum dolor sit amet consectetur. A integer arcu nunc morbi. Nulla diam nisi dignissim imperdiet cursus auctor egestas elit in. Neque auctor turpis lobortis ac."),
    ctaLabel: ['CTA Label 1', 'CTA Label 2', 'CTA Label 3'],
    options: {
      props: {
        type: [{
            text: 'modal',
            value: 'modal'
          },
          {
            text: 'fullscreen',
            value: 'fullscreen'
          }, {
            text: 'bottom-sheet',
            value: 'bottom-sheet'
          },
        ],
        illustration: [{
            text: 'props',
            value: 0
          },
          {
            text: 'slot',
            value: 1
          },
        ],
        illustrationSize: [{
            text: 'normal',
            value: 0
          },
          {
            text: 'large',
            value: 1
          },
        ],
        icon: [{
            text: 'success',
            value: 0
          },
          {
            text: 'warning',
            value: 1
          },
          {
            text: 'error',
            value: 2
          },
        ],
        cta: [{
            text: '1',
            value: 1
          },
          {
            text: '2',
            value: 2
          },
          {
            text: '3',
            value: 3
          },
        ],
        withScrollButton: [{
          text: 'true',
          value: true
        }],
      },
      slot: [{
          text: '1',
          value: 1
        },
        {
          text: '2',
          value: 2
        },
        {
          text: '3',
          value: 3
        },
      ]
    },
  },
  onLoad() {},
  onShow() {
    setTimeout(() => {
      this.triggerPopup()
    }, 1)
  },
  triggerPopup() {
    this.setData({
      isOpen: !this.data.isOpen
    })
  },
  onTapCTA1() {
  },
  onTapCTA2() {
  },
  onTapCTA3() {
  },
  handlePropsTypeSelection(value) {
    this.setData({
      typeSelected: value ? value : 'modal',
    })
  },
  handlePorpsTitle(value, e) {
    this.setData({
      title: value
    })
  },
  handlePropsIllustrationSelection(value) {
    this.setData({
      illustrationSelected: value,
    })
  },
  handlePropsIllustrationSizeSelection(value) {
    this.setData({
      illustrationSizeSelected: this.data.options.props.illustrationSize[value] ? this.data.options.props.illustrationSize[value].text : null,
    })
  },
  handlePropsIconSelection(value) {
    this.setData({
      iconSelected: this.data.options.props.icon[value] ? this.data.options.props.icon[value].text : null,
    })
  },
  handlePropsParagraph(value) {
    this.setData({
      paragraph: value,
    })
  },
  handlePropsCTASelection(value) {
    this.setData({
      ctaSelected: value ? value : false,
    })
  },
  handleSlotSelection(value) {
    this.setData({
      slotSelected: value ? value : false,
    })
  },
  handleScrollButtonSelection(value) {
    this.setData({
      withScrollButton: value ? value : false,
    })
  },
})