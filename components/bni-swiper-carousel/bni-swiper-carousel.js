function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? Object(arguments[r]) : {}, o = Object.keys(t); "function" == typeof Object.getOwnPropertySymbols && o.push.apply(o, Object.getOwnPropertySymbols(t).filter(function (e) { return Object.getOwnPropertyDescriptor(t, e).enumerable; })), o.forEach(function (r) { _defineProperty(e, r, t[r]); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Component({
  data: {
    activeIndex: 0
  },
  props: {
    /**
     * items is to define the length of the indicator and require an array of object
     */
    items: Array,
    /**
     * autoplay is a boolean props to define whether the swiper is a carousel or not
     */
    autoplay: Boolean,
    /**
     * vertical is to define if the swiper is swipes vertically or not
     */
    vertical: Boolean,
    /**
     * circular is to define if the swiper will be continuously swiping or not
     */
    circular: Boolean,
    /**
     * interval is a number props to define the carousel interval between its swiper item (autoplay required)
     */
    interval: Number,
    /**
     * duration is a number props to define the duration of the carousel from beginning until the end (autoplay required)
     */
    duration: Number,
    /**
     * indicatorType:"dots | scrollbar | null"
     */
    indicatorType: String("dots"),
    /**
     * nextMargin is to define the next margin of the whole swiper items
     */
    nextMargin: String,
    /**
     * prevMargin is to define the previous margin of the whole swiper items
     */
    prevMargin: String,
    /**
     * pixel is a prop that allows us to use pixels in styling
     */
    pixel: Boolean(false)
  },
  methods: {
    onChange: function onChange(e) {
      this.setData({
        activeIndex: e.detail.current
      });
    },
    onDotTap: function onDotTap(e) {
      var index = e.target.dataset.index;
      this.setData({
        activeIndex: index
      });
    }
  },
  didMount: function didMount() {
    this.setData(_objectSpread({}, this.props));
  }
});