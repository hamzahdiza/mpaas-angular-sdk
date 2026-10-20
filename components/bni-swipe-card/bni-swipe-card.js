function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? Object(arguments[r]) : {}, o = Object.keys(t); "function" == typeof Object.getOwnPropertySymbols && o.push.apply(o, Object.getOwnPropertySymbols(t).filter(function (e) { return Object.getOwnPropertyDescriptor(t, e).enumerable; })), o.forEach(function (r) { _defineProperty(e, r, t[r]); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Component({
  mixins: [],
  data: {
    swipeOut: false
  },
  props: {
    /**
     * swipeOut: use to trigger animation, 
     * default: false
     */
    swipeOut: Boolean(false),
    /**
     * cardEffectDuration: card stack animation duration, 
     * default: 100
     */
    cardEffectDuration: Number(500),
    /**
     * swipeOutDuration: card swipe out animation duration, 
     * default: 500
     */
    swipeOutDuration: Number(500),
    /**
     * customButtons: option to use custom button,
     * default: "false"
     */
    customButtons: Boolean(false),
    /**
     * confirmText: confirm button text, 
     * default: "Oke"
     */
    confirmText: String("Oke"),
    /**
     * editText: edit button text, 
     * default: "Ubah Kategori"
     */
    editText: String("Ubah Kategori"),
    /**
     * onTapConfirm: callback function that can be triggered the confirm button tapped
     * default: Void
     */
    onTapConfirm: Function(),
    /**
     * onTapConfirm: callback function that can be triggered the edit button tapped
     * default: Void
     */
    onTapEdit: Function(),
    pixel: Boolean(false)
  },
  didMount: function didMount() {
    this.setData(_objectSpread({}, this.props, {
      editText: this.props.editText.toString(),
      confirmText: this.props.confirmText.toString()
    }));
  },
  didUpdate: function didUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setData(_objectSpread({}, this.props, {
        editText: this.props.editText.toString(),
        confirmText: this.props.confirmText.toString()
      }));
    }
  },
  methods: {
    onTapConfirm: function onTapConfirm() {
      var _this = this;
      if (this.props.customButtons) return;
      this.setData({
        swipeOut: true
      });
      setTimeout(function () {
        return _this.onSwipeEnd();
      }, this.props.swipeOutDuration);
    },
    onTapEdit: function onTapEdit() {
      if (this.props.customButtons) return;
      return this.props.onTapEdit();
    },
    onSwipeEnd: function onSwipeEnd() {
      this.setData({
        swipeOut: false
      });
      this.props.onTapConfirm();
    }
  }
});