import {
  triggerEventOnly,
} from 'antd-mini/es/_util/simply';

Component({
  data: {
    numArr: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
  },
  props: {
    /**
     * Defines the keyboard type ('custom' | 'numeric').
     * @type {String}
     */
    type: String('custom'),

    /**
     * Indicates whether the keyboard is open or closed.
     * @type {Boolean}
     * @default false
     */
    isOpen: Boolean(false),

    /**
     * Defines the label for the CTA (Call-To-Action) button.
     * @type {String}
     */
    ctaLabel: String(),

  /**
     * Defines the position of the CTA (Call-To-Action) button.
     * Acceptable values: 'bottom' | 'top' | 'none'.
     * @type {String}
     * @default 'bottom'
     */
    ctaPosition: String('bottom'),

    /**
     * Defines the custom button type displayed at the bottom-left of the keyboard.
     * Acceptable values: 'empty' | 'thousand' | 'decimal'.
     * @type {String}
     * @default 'empty'
     */
    bottomLeftButtonType: String('empty'),

    /**
     * Defines the language used for number formatting.
     * This value is passed down from the parent input component.
     * @type {String}
     */
    language: String(),

    /**
     * Allow to dissmiss keyboard when tap outside the keyboard.
     * @type {Boolean}
     * @default false
     */
    dismissEverywhere: Boolean(false),

    /**
     * Callback triggered when the keyboard is closed.
     * This function is passed down from the parent component.
     * @type {Function}
     */
    onClose: Function(),

    /**
     * Callback triggered when a number key is pressed down.
     * Returns an event object: `{ value, event }`, where:
     * - `value` is a string representing the input value.
     * - `event` is an enum of type `'input' | 'delete'`.
     * @type  {(value: number, event: string) => void}
     */
    onPressDownNumber: Function(),
  },
  didMount() {
    this.setData({
      ...this.props
    })
  },
  didUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setData({
        ...this.props
      })
    }
  },
  methods: {
    handlePressDownNumber(e) {
      this.vibrate();
      const value = this.data.type === 'custom' ? e.currentTarget.dataset.key : (e === '' ? 'del' : e)
      const res = {}
      if (value === 'del') {
        res['event'] = 'delete'
      } else {
        res['event'] = 'input'
        res['value'] = value
      }
      this.props.onPressDownNumber(res)
    },
    handleHide() {
      triggerEventOnly(this, 'close');
    },
    vibrate() {
      my.canIUse('vibrateShort') && my.vibrateShort()
    },
    handleTest() {
      triggerEventOnly(this, 'close', {
        a: 1
      });
      triggerEventOnly(this, 'elseclose', {
        a: 1
      });
    }
  },
})