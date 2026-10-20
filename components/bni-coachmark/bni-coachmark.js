function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? Object(arguments[r]) : {}, o = Object.keys(t); "function" == typeof Object.getOwnPropertySymbols && o.push.apply(o, Object.getOwnPropertySymbols(t).filter(function (e) { return Object.getOwnPropertyDescriptor(t, e).enumerable; })), o.forEach(function (r) { _defineProperty(e, r, t[r]); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Component({
  data: {
    statusBarHeight: 0
  },
  props: {
    /**
     * showCoachmark - Controls the visibility of the coachmark.
     * Default is false.
     * Example: showCoachmark="true"
     */
    showCoachmark: Boolean(false),
    /**
     * title - The title text displayed in the coachmark.
     * Example: title="Configure your financial recap here"
     */
    title: String(""),
    /**
     * description - The description text displayed in the coachmark.
     * Example: description="You can configure your period starting date and get notified of your spendings, according to your needs."
     */
    description: String(""),
    /**
     * buttonText - The text displayed on the button within the coachmark.
     * Example: buttonText="Got it"
     */
    buttonText: String(""),
    /**
     * centerPosition - Determines if the coachmark should be centered on the screen.
     * Example: centerPosition="true"
     */
    centerPosition: Boolean(false),
    /**
     * highlightPosition - Specifies the position and size of the highlight area for the coachmark.
     * Default is an object with top, right, width, and height set to 0.
     * Example: highlightPosition="{ top: 100, right: 50, width: 200, height: 150 }"
     */
    highlightPosition: {
      top: 0,
      right: 0,
      width: 0,
      height: 0
    },
    /**
     * onButtonTap - Callback function triggered when the button within the coachmark is tapped.
     * Example: onButtonTap="handleButtonTap"
     */
    onButtonTap: function onButtonTap() {},
    /**
    * dynamic - left margin follow right margin width.
    * Example: dynamic="true"
    */
    dynamicWidth: Boolean(false),
    /**
    * idCoachmark: to give an ID to the coachmark. 
    */
    idCoachmark: String("")
  },
  didMount: function didMount() {
    var _this = this;
    this.setData(_objectSpread({}, this.props));
    my.getSystemInfo({
      success: function success(res) {
        _this.setData({
          statusBarHeight: res.statusBarHeight
        });
      }
    });
  },
  didUpdate: function didUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setData(_objectSpread({}, this.props));
    }
  },
  methods: {
    onTapButton: function onTapButton() {
      this.props.onButtonTap();
    }
  }
});