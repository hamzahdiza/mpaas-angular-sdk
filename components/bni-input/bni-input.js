Component({
  mixins: [],
  ref: function ref() {
    var _this = this;
    return {
      plus: function plus() {
        return _this.onClose();
      }
    };
  },
  data: {
    inputFocusStatus: false,
    showKeybord: false,
    visible: false,
    birthDateFocusStatus: "",
    birthDateFormat: []
  },
  props: {
    /**
     * maxChar is to put maximal character on the input component
     */
    maxChar: Number(200),
    /**
     * inputValue is to put input value on the input component
     * 
     * for type "birthDate" an object value  with day,month,year key needed
     * {
     *  day:"",
     *  month:"",
     *  year:""
     * }
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
     * suffixIcon is to put icon on the suffix input component
     */
    suffixIcon: String(""),
    clearIcon: String(""),
    /**
     * inputLabel is to put label on the input component
     */
    inputLabel: String(""),
    /**
     * placeholder is to put placeholder on the input component
     */
    placeholder: String(""),
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
    onClear: Function,
    /**
     * visible = "true | false"
     */
    counter: Boolean(true),
    /**
     * onFocusStatus is a callback to get focus status from input component
     */
    onFocusStatus: Function,
    keyboardDeleteIcon: String(""),
    keyboardbuttonText: String(""),
    /**
     * formatDate only used when type is "birthDate"
     * this props is format to show which format you want to show such as 
     * month , year , day << the only valid value
     * every format you pick is must be separated by "-"
     * example: day-month-year , month-day , day-month, month
     */
    formatDate: String("day-month-year"),
    /**
     * focus status for birthdate type
     * 
     */
    birthDateFocusStatus: Function,
    /**
     * pixel is a prop that allows us to use pixels in styling
     */
    pixel: Boolean(false),
    variant: String(""),
    onChangeCustomKeyboard: Function,
    prefixIconTextStyle: String(""),
    prefixIconTextClass: String(""),
    prefixIconText: String(""),
    suffixIconTextStyle: String(""),
    suffixIconTextClass: String(""),
    suffixIconText: String(""),
    onKeyboardClose: Function
  },
  didMount: function didMount() {
    if (this.props.type === "birthDate") {
      var formatPattern = /^(day|month|year)(-(day|month|year))*$/;
      if (formatPattern.test(this.props.formatDate)) {
        this.setData({
          birthDateFormat: this.props.formatDate.split("-")
        });
      }
    }
  },
  didUpdate: function didUpdate(prevProps) {
    var _this2 = this;
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      if (this.props.type === "birthDate") {
        this.setData({
          birthDateFocusStatus: this.props.birthDateFocusStatus,
          birthDateFormatActiveIndex: this.data.birthDateFormat.findIndex(function (val) {
            return val === _this2.props.birthDateFocusStatus;
          }) || null
        });
      }
    }
  },
  methods: {
    onFocused: function onFocused() {
      this.setData({
        inputFocusStatus: true
      });
      if (this.props.type === 'amountType' || this.props.type === 'amountWithClear') {
        this.setData({
          showKeybord: true
        });
      }
      this.onFocusStatus();
    },
    onChange: function onChange(e) {
      this.props.onChange(e.detail.value);
    },
    onBlur: function onBlur() {
      if (this.props.type === 'amountType' || this.props.type === 'amountWithClear' && this.data.showKeybord === true) {
        this.setData({
          inputFocusStatus: true
        });
      } else {
        this.setData({
          inputFocusStatus: false
        });
      }
      this.onFocusStatus();
    },
    onClose: function onClose() {
      this.setData({
        inputFocusStatus: false,
        showKeybord: false
      });
      this.onFocusStatus();
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
    onFocusStatus: function onFocusStatus() {
      this.props.onFocusStatus(this.data.inputFocusStatus);
    },
    onHandleClick: function onHandleClick(e) {
      var newInputValue = this.props.inputValue + e.target.dataset.attr;
      this.props.onChange(newInputValue);
    },
    onHandleClickDelete: function onHandleClickDelete() {
      var newInputValue = this.props.inputValue.replace(/\,/g, '').replace(/\./g, ''); // eslint-disable-line
      var newInputValue2 = newInputValue.split('');
      newInputValue2.splice(newInputValue2.length - 1, 1);
      this.props.onChange(newInputValue2.toString().replace(/\,/g, '').replace(/\./g, '')); // eslint-disable-line
    },
    handlePopupClose: function handlePopupClose() {
      this.setData({
        inputFocusStatus: false,
        showKeybord: false
      });
      this.onFocusStatus();
    },
    onPopupFocused: function onPopupFocused() {
      this.setData({
        inputFocusStatus: true
      });
      this.onFocusStatus();
    },
    onNumberFocus: function onNumberFocus(e) {
      if (this.props.disabled) {
        return;
      }
      if (!this.props.customKeyboard) {
        this.setData({
          visible: true,
          birthDateFocusStatus: e.currentTarget.dataset.field
        });
      } else {
        this.setData({
          visible: true,
          inputFocusStatus: true
        });
      }
      this.props.onFocusStatus(e.currentTarget.dataset.field);
    },
    onChangeBirthDate: function onChangeBirthDate(e) {
      this.props.onChange(e);
    },
    onCloseNumberKeyboard: function onCloseNumberKeyboard() {
      if (this.props.onKeyboardClose) {
        this.props.onKeyboardClose();
      }
      if (!this.props.customKeyboard) {
        this.setData({
          visible: false
        });
      } else {
        this.setData({
          visible: false,
          inputFocusStatus: false
        });
      }
    }
  }
});