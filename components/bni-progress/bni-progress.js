function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? Object(arguments[r]) : {}, o = Object.keys(t); "function" == typeof Object.getOwnPropertySymbols && o.push.apply(o, Object.getOwnPropertySymbols(t).filter(function (e) { return Object.getOwnPropertyDescriptor(t, e).enumerable; })), o.forEach(function (r) { _defineProperty(e, r, t[r]); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Component({
  mixins: [],
  data: {
    rightTransform: 'rotate(45deg)',
    leftTransform: 'rotate(45deg)',
    animationKey: 1
  },
  props: {
    /**
     * type: "line | circle | steps | custom-circle"
     * default: "line"
     */
    type: String("line"),
    /**
     * percent: Percentage value to indicate the progress,
     * default: 0
     */
    percent: Number(0),
    /**
     * backgroundColor: Hex color code for the background of the progress circle,
     * applicable for: type "circle",
     * default: "#ECF789"
     */
    backgroundColor: String('#ECF789'),
    /**
     * foregroundColor: Hex color code for the foreground of the progress circle,
     * applicable for: type "circle" and "steps",
     * default: "#68702A"
     */
    foregroundColor: String('#68702A'),
    /**
     * warning: Set to true to change the color of the progress line to red,
     * applicable for: type "line",
     * default: false
     */
    warning: Boolean(false),
    /**
     * foregroundColor: Hex color code for the foreground of the progress circle,
     * applicable for: type "steps",
     * default: "#71DBD3"
     */
    progressColor: String("#71DBD3"),
    /**
     * strokeWidth: Width for the stroke color,
     * applicable for: type "circle",
     * default: 20
     */
    strokeWidth: Number(20),
    /**
     * width :  Define the width for the progress bar,
     * applicable for : type "steps | circle",
     * default: "70"
     */
    width: String("70"),
    /**
     * height :  Define the height for the progress bar,
     * applicable for : type "steps",
     * default: "70"
     */
    height: String("10px"),
    /**
     * Whether to display in animation form
     * default: true
     */
    animation: Boolean(true),
    /**
     * To display initial percent (for animation purpose)
     * applicable for : type "steps"
     * default : 0
     */
    initialFill: Number(0),
    /**
     * pixel is a prop that allows us to use pixels in styling
     */
    pixel: Boolean(false)
  },
  didMount: function didMount() {
    var _this = this;
    switch (this.props.type) {
      case 'custom-circle':
        {
          var progree = 0;
          var timerId = setInterval(function () {
            if (progree >= _this.props.percent) {
              clearInterval(timerId);
            }
            _this.transformCircle(progree);
            progree++;
          }, 10);
          break;
        }
    }
  },
  onInit: function onInit() {
    this.setData(_objectSpread({}, this.props));
  },
  didUpdate: function didUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      if (this.props.type === "steps") {
        this.setData({
          animationKey: this.data.animationKey == 1 ? '2' : '1'
        });
      }
      this.setData(_objectSpread({}, this.props));
    }
  },
  methods: {
    transformCircle: function transformCircle(degree) {
      if (degree <= 50) {
        this.setData({
          rightTransform: "rotate(".concat(45 + 180 / 50 * degree, "deg)")
        });
      } else {
        this.setData({
          rightTransform: "rotate(".concat(45 + 180 / 50 * 50, "deg)"),
          leftTransform: "rotate(".concat(45 + 180 / 50 * (degree - 50), "deg)")
        });
      }
    }
  }
});