Page({
  data: {
    isFocused: false,
    value: 0,
    valueString: '',
    options: {
      props: {
        legacy: [{
          text: 'true',
          value: true,
        }],
        dropdown: [{
          text: 'true',
          value: true,
        }],
        type: [{
            text: 'amountType',
            value: 'amountType',
            subText: 'legacy'
          },
          {
            text: 'amountWithClear',
            value: 'amountWithClear',
            subText: 'legacy'
          }, {
            text: 'amount',
            value: 'amount'
          }, {
            text: 'tip-amount',
            value: 'tip-amount'
          }, {
            text: 'limit',
            value: 'limit'
          }, {
            text: 'multi-currency',
            value: 'multi-currency'
          }, {
            text: 'multi-currency-tip',
            value: 'multi-currency-tip'
          },
          {
            text: 'basic',
            value: 'basic'
          },
        ],
        state: [{
          text: 'success',
          value: 'success'
        }, {
          text: 'error',
          value: 'error'
        }, ],
        currency: [{
            text: 'Rp',
            value: 'Rp'
          }, {
            text: 'IDR',
            value: 'IDR'
          },
          {
            text: 'USD',
            value: 'USD'
          },
          {
            text: 'gram',
            value: 'gram'
          },
        ],
        language: [{
          text: 'id',
          value: 'id'
        }, {
          text: 'en',
          value: 'en'
        }, ],
        KB_ctaPosition: [{
          text: 'bottom',
          value: 'bottom'
        }, {
          text: 'top',
          value: 'top'
        }, ],
        KB_bottomLeftButton: [{
          text: 'empty',
          value: 'empty'
        }, {
          text: 'thousand (000)',
          value: 'thousand'
        }, {
          text: 'decimal',
          value: 'decimal'
        }, ],
        readOnly: [{
          text: 'readOnly',
          value: true
        }],
        disabled: [{
          text: 'disabled',
          value: true
        }]
      },
    },
    default: {
      legacy: false,
      dropdown: false,
      type: 'multi-currency',
      state: 'default',
      KB_ctaPosition: 'bottom',
      KB_bottomLeftButton: 'empty',
      currency: 'Rp'
    },
    selected: {
      legacy: false,
      dropdown: false,
      state: 'default',
      type: 'multi-currency',
      readOnly: false,
      disabled: false,
      KB_ctaPosition: 'bottom',
      KB_bottomLeftButton: 'empty',
      currency: 'Rp'
    },
    label: 'Input Label',
    caption: 'This is a sampel of caption',
    placeholder: "0",
    KB_ctaLabel: 'Done'
  },
  onLoad() {
    const {
      default: defaultVar,
      selected
    } = this.data
    defaultVar.language = getApp().globalData.nativeData.language
    selected.language = getApp().globalData.nativeData.language
    this.setData({
      default: defaultVar,
      selected
    })
    this.handlePropLegacy(this.data.default.legacy)
  },
  handlePropTypeSelection(value) {
    const {
      selected
    } = this.data
    selected.type = value ? value : this.data.default.type,
      this.setData({
        selected
      })
  },
  handlePropState(value) {
    const {
      selected
    } = this.data
    selected.state = value ? value : this.data.default.state,
      this.setData({
        selected
      })
  },
  handlePropReadOnly(value) {
    const {
      selected
    } = this.data
    selected.readOnly = value ? value : false,
      this.setData({
        selected
      })
  },
  handlePropDisabled(value) {
    const {
      selected
    } = this.data
    selected.disabled = value ? value : false,
      this.setData({
        selected
      })
  },
  handlePropLegacy(value) {
    const {
      selected,
      options
    } = this.data
    selected.legacy = value ? value : false
    options.props.type.map((item) => {
      item['disabled'] = (item.text === 'amountType' || item.text === 'amountWithClear') ? !selected.legacy : selected.legacy
    })
    selected.type = selected.legacy ? 'amountType' : 'amount'
    this.setData({
      options,
      selected
    })
  },
  handlePropDropdown(value) {
    const {
      selected,
    } = this.data
    selected.dropdown = value ? value : false
    this.setData({
      selected
    })
  },
  handlePropLanguage(value) {
    const {
      selected
    } = this.data
    selected.language = value ? value : getApp().globalData.nativeData.language,
      this.setData({
        selected
      })
  },
  handlePropCurrency(value) {
    const {
      selected
    } = this.data
    selected.currency = value ? value : this.data.default.currency,
      this.setData({
        selected
      })
  },
  handlePropCaption(value) {
    this.setData({
      caption: value,
    })
  },
  handlePropLabel(value) {
    this.setData({
      label: value,
    })
  },
  handlePropBottomLeftButton(value) {
    const {
      selected
    } = this.data
    selected.KB_bottomLeftButton = value ? value : this.data.default.KB_bottomLeftButton,
      this.setData({
        selected
      })
  },
  handlePropCTALabel(value) {
    this.setData({
      KB_ctaLabel: value,
    })
  },
  handlePropPlaceholder(value) {
    this.setData({
      placeholder: value,
    })
  },
  handlePropCTAPosition(value) {
    const {
      selected
    } = this.data
    selected.KB_ctaPosition = value ? value : this.data.default.KB_ctaPosition,
      this.setData({
        selected
      })
  },
  onChange(e) {
    const {
      selected
    } = this.data
    if (selected.legacy) {
      this.setData({
        valueString: e
      })
    } else {
      this.setData({
        value: e.value,
        valueString: e.valueString,
        isFocused: e.isFocused
      })
    }
  },
  onMinus(e) {
    // console.log(e)
  },
  onPlus(e) {
    // console.log(e)
  },
  onTapDropDown(e) {
    // console.log(e)
  },
  onClose(e) {
    // console.log(e,'onClose')
  },
  onBlur(e) {
    // console.log(e,'onBlur(')
  },
  onDismissKeyboard(e) {
    // console.log(e,'onDismissKeyboard(')
  }
})