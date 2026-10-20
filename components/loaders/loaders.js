function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? Object(arguments[r]) : {}, o = Object.keys(t); "function" == typeof Object.getOwnPropertySymbols && o.push.apply(o, Object.getOwnPropertySymbols(t).filter(function (e) { return Object.getOwnPropertyDescriptor(t, e).enumerable; })), o.forEach(function (r) { _defineProperty(e, r, t[r]); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Component({
  mixins: [],
  data: {
    ring: {
      diameter: {
        small: '48rpx',
        medium: '96rpx',
        big: '144rpx'
      },
      tip: {
        small: '8rpx',
        medium: '16rpx',
        big: '24rpx'
      },
      mask: {
        small: '16rpx',
        medium: '32rpx',
        big: '48rpx'
      }
    },
    ringpixel: {
      diameter: {
        small: '24px',
        medium: '48px',
        big: '72px'
      },
      tip: {
        small: '4px',
        medium: '8px',
        big: '12px'
      },
      mask: {
        small: '8px',
        medium: '16px',
        big: '24px'
      }
    }
  },
  props: {
    /**
     * color: Hex color of loading ring, 
     * default: "#F56F19"
     */
    color: String('#F56F19'),
    /**
     * failMessage: message to display when fail
     * default: "Muat Ulang"
     */
    failMessage: String("Muat Ulang"),
    /**
     * reloadIcon: path to your icon file
     * default: ""
     */
    reloadIcon: String(),
    /**
     * type: "small" | "medium" | "big" | "full"
     * default: "small"
     */
    type: String('small'),
    /**
     * fail: set loading to fail state
     * default: false
     */
    fail: Boolean(false),
    /**
     * loading: set loading state
     * default: true
     */
    loading: Boolean(true),
    /**
     * onReload: callback function that can be triggered when fail
     * default: Void
     */
    onReload: Function(),
    /**
     * pixel is a prop that allows us to use pixels in styling
     */
    pixel: Boolean(false)
  },
  didMount: function didMount() {
    var _this$props = this.props,
      type = _this$props.type,
      loading = _this$props.loading,
      fail = _this$props.fail,
      color = _this$props.color,
      failMessage = _this$props.failMessage,
      reloadIcon = _this$props.reloadIcon;
    this.setData({
      type: type,
      loading: loading,
      color: color,
      fail: fail,
      failMessage: failMessage,
      reloadIcon: reloadIcon
    });
  },
  didUpdate: function didUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setData(_objectSpread({}, this.props));
    }
  },
  methods: {
    onReload: function onReload() {
      return this.props.onReload();
    }
  }
});