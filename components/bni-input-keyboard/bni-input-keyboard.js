function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? Object(arguments[r]) : {}, o = Object.keys(t); "function" == typeof Object.getOwnPropertySymbols && o.push.apply(o, Object.getOwnPropertySymbols(t).filter(function (e) { return Object.getOwnPropertyDescriptor(t, e).enumerable; })), o.forEach(function (r) { _defineProperty(e, r, t[r]); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Component({
  mixins: [],
  data: {
    inputFocusStatus: Boolean(false)
  },
  props: {
    /**
     * Caption visible = "true | false"
     */
    isCaptionVisible: Boolean(true),
    /**
     * maxChar is to put maximal character on the input component
     */
    maxChar: Number(200),
    /**
     * inputValue is to put input value on the input component
     */
    inputValue: String(""),
    /**
     * caption is to put caption on the input component
     */
    caption: String(""),
    /**
     * prefixIcon is to put icon on the prefix input component
     */
    prefixIcon: String(""),
    /**
     * prefixText is to currency before value on the prefix input component for type basic input
     */
    prefixText: String(""),
    /**
     * suffixIcon is to put icon on the suffix input component
     */
    suffixIcon: String(""),
    /**
     * clearIcon is to put icon fot delete value input
     */
    clearIcon: String(""),
    /**
     * inputLabel is to put label on the input component
     */
    inputLabel: String(""),
    /**
     * placeholder is to put placeholder on the input component, deefault "0"
     */
    placeholder: String("0"),
    /**
     * type:"read-only | disabled | amount | search"
     */
    type: String(""),
    /**
     * error = "false | true"
     */
    error: Boolean(false),
    /**
     * success = "false | true"
     */
    success: Boolean(false),
    /**
     * onSuffix is a callback to handle suffix function input component
     */
    onSuffix: Function,
    /**
     * onPrefix is a callback to handle prefix function input component
     */
    onPrefix: Function,
    /**
     * onChange is a callback to handle onChange input component
     */
    onChange: Function,
    /**
     * onClear is a callback to handle onClear input component
     */
    onClear: Function,
    /**
     * onClose is a callback to handle onClose input component
     */
    onClose: Function,
    /**
     * visible = "true | false"
     */
    counter: Boolean(true),
    /**
     * keyboardbuttonText is to put finish text on keyboard
     */
    keyboardbuttonText: String(""),
    pixel: Boolean(false)
  },
  didUpdate: function didUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setData(_objectSpread({}, this.props));
    }
  },
  methods: {
    onLongTap: function onLongTap() {
      if (!this.props.disabled) {
        this.setData({
          showCopy: true
        });
      }
    },
    onCopy: function onCopy() {
      var amount = this.props.inputValue.replace(/\./g, "");
      my.setClipboard({
        text: amount
      });
      this.setData({
        showCopy: false
      });
    },
    onPaste: function onPaste() {
      this.props.onPaste();
      this.setData({
        showCopy: false,
        inputFocusStatus: true
      });
    },
    onFocused: function onFocused() {
      if (this.props.type === 'disabled' || this.props.type === 'read-only') {
        this.setData({
          inputFocusStatus: false
        });
      } else {
        this.setData({
          inputFocusStatus: true
        });
      }
    },
    onChange: function onChange(e) {
      this.props.onChange(e.detail.value);
    },
    onClose: function onClose() {
      this.setData({
        inputFocusStatus: false
      });
    },
    onSuffix: function onSuffix() {
      this.props.onSuffix();
    },
    onPrefix: function onPrefix() {
      this.props.onPrefix();
    },
    onClear: function onClear() {
      this.props.onClear();
    },
    onHandleClick: function onHandleClick(e) {
      this.setData({
        showCopy: false
      });
      var newInputValue = this.props.inputValue + e.target.dataset.attr;
      if (newInputValue.length < 16) {
        this.props.onChange(newInputValue);
      }
    },
    onHandleClickDelete: function onHandleClickDelete() {
      var newInputValue = this.props.inputValue.replace(/,/g, '').replace(/\./g, '');
      var newInputValue2 = newInputValue.split('');
      newInputValue2.splice(newInputValue2.length - 1, 1);
      this.props.onChange(newInputValue2.toString().replace(/,/g, '').replace(/\./g, ''));
    },
    handlePopupClose: function handlePopupClose() {
      if (this.props.onClose) {
        this.props.onClose();
        this.setData({
          inputFocusStatus: false
        });
      } else {
        this.setData({
          inputFocusStatus: false
        });
      }
    }
  }
});