function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? Object(arguments[r]) : {}, o = Object.keys(t); "function" == typeof Object.getOwnPropertySymbols && o.push.apply(o, Object.getOwnPropertySymbols(t).filter(function (e) { return Object.getOwnPropertyDescriptor(t, e).enumerable; })), o.forEach(function (r) { _defineProperty(e, r, t[r]); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Component({
  mixins: [],
  data: {
    selection: Number(0),
    toView: String('red'),
    isLoading: Boolean(false),
    slideLeft: String('')
  },
  props: {
    /**
    * type: "toggle | primary | secondary | icons"
    * default: "toggle"
    */
    type: String('toggle'),
    /**
    * background: "Hex color code for the background of the tabs"
    * default: "bg-white"
    */
    background: String,
    /**
    * items: "data array of object of the tabs include title,badge,icons"
    * default: "Array"
    */
    items: Array,
    /**
     * onChange: callback function that can be triggered the  tab tapped
     * default: Void
     */
    onChange: Function,
    /**
     * current: set for data current index for the tab
     * default: Void
     */
    current: Number(0),
    /**
    * width: width pixel of icons
    * default: 38rpx
    */
    width: String('38rpx'),
    /**
    * height: height pixel of icons
    * default: 38rpx
    */
    height: String('38rpx'),
    /**
    * activeColor: set css active tabs
    * default: Void
    */
    activeColor: String('bg-lime-200'),
    /**
     * pasiveColor: set css pasive tabs
     * default: Void
     */
    pasiveColor: String('bg-white'),
    /**
     * scrollFocus: set focus view scroll
     * default: Void
     */
    scrollFocus: Number,
    /**
     * scrollView:  scrolling to that element, element top aligning with scroll region top.
     * default: Void
     */
    scrollView: String,
    /**
     * onScroll:  Trigger on scroll, event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth}..
     * default: Void
     */
    onScroll: String,
    /**
    * isLoading:  Trigger loading shimmer
    * default: false
    */
    isLoading: Boolean(false),
    /**
    * isAnimation: Swith with animation  (only toggle type)
    * default: false
    */
    isAnimation: Boolean(false),
    /**
    * heightShimmer: height for adjust shimmer loading
    * default: 45.70rpx
    */
    heightShimmer: String('91.4rpx'),
    /**
    * disabled: handle disbled for click button
    * default: false
    */
    disabled: Boolean(false),
    /**
     * pixel is a prop that allows us to use pixels in styling
     */
    pixel: Boolean(false)
  },
  didMount: function didMount() {
    this.setData(_objectSpread({}, this.props, {
      selection: this.props.current
    }));
  },
  didUpdate: function didUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setData(_objectSpread({}, this.props, {
        selection: this.props.current
      }));
      if (this.props.isAnimation) {
        this.getSlideInfo();
      }
    }
  },
  methods: {
    handleClick: function handleClick(e) {
      var num = e.target.dataset.num;
      this.props.onChange(e);
      this.setData({
        selection: num
      });
      if (this.data.isAnimation) {
        this.getSlideInfo();
      }
    },
    getSlideInfo: function getSlideInfo() {
      var _this = this;
      if (this.props.isLoading) {
        this.setData({
          isShowSlide: false,
          slideLeft: '',
          slideHeight: '0px',
          slideWidth: '0px'
        });
      } else {
        my.createSelectorQuery()["in"](this).select('.active-tab').boundingClientRect().exec(function (res) {
          if (res[0].left == 0 && res[0].height == 0 && res[0].width == 0) {
            _this.setData({
              isShowSlide: false,
              slideLeft: '',
              slideHeight: '0px',
              slideWidth: '0px'
            });
          } else {
            _this.setData({
              isShowSlide: true,
              slideLeft: res[0].left,
              slideHeight: res[0].height + 'px',
              slideWidth: res[0].width + 'px'
            });
          }
        });
      }
    }
  }
});