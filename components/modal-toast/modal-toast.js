function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? Object(arguments[r]) : {}, o = Object.keys(t); "function" == typeof Object.getOwnPropertySymbols && o.push.apply(o, Object.getOwnPropertySymbols(t).filter(function (e) { return Object.getOwnPropertyDescriptor(t, e).enumerable; })), o.forEach(function (r) { _defineProperty(e, r, t[r]); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Component({
  data: {
    statusBarHeight: 0,
    extStyle: {
      zIndex: 10000,
      fullHeight: 0
    }
  },
  props: {
    showToast: Boolean(false),
    title: String("Your Title"),
    content: String("Your content text should be here"),
    type: String("success"),
    btnText: String("Button Text"),
    btnText2: String(''),
    language: String("ID"),
    urlPage: String(''),
    pixel: Boolean(false)
  },
  didMount: function didMount() {
    this.setData(_objectSpread({
      'extStyle.fullHeight': this.props.fullscreen && "".concat(my.getSystemInfoSync().statusBarHeight, "rpx")
    }, this.props));
  },
  didUpdate: function didUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setData({
        showToast: this.props.showToast,
        title: this.props.title,
        content: this.props.content,
        type: this.props.type,
        btnText: this.props.btnText,
        language: this.props.language,
        urlPage: this.props.nextPage,
        'extStyle.zIndex': parseInt((new Date().getTime() + '').slice(-7))
      });
    }
  },
  methods: {
    successHandler: function successHandler() {
      if (this.props.urlPage) {
        my.navigateTo({
          url: this.props.urlPage
        });
      } else {
        this.props.onCloseToastHandler();
      }
    },
    closeModalHandler: function closeModalHandler() {
      this.props.onCloseToastHandler();
    },
    onPrimary: function onPrimary() {
      this.props.onPrimary();
    },
    onDefault: function onDefault() {
      this.props.onDefault();
    }
  }
});