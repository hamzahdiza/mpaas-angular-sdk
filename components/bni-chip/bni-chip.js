function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? Object(arguments[r]) : {}, o = Object.keys(t); "function" == typeof Object.getOwnPropertySymbols && o.push.apply(o, Object.getOwnPropertySymbols(t).filter(function (e) { return Object.getOwnPropertyDescriptor(t, e).enumerable; })), o.forEach(function (r) { _defineProperty(e, r, t[r]); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Component({
  mixins: [],
  data: {},
  props: {
    /**
     * type="small | medium".
     *  Example: type="small"
     */
    type: String("small"),
    /**
     * backgroundColor - Background color of the tag. Use a hex color code.
     * Default is "#ffffff".
     * Example: backgroundColor="#ffffff"
     */
    backgroundColor: String("#ffffff"),
    /**
     * textColor - Color of the label text. Only used when type is "text".
     * Default is "#000000".
     * Example: textColor="#000000"
     */
    textColor: String("#000000"),
    /**
     * label - The text label for the tag.
     * Example: label="pasar uang"
     */
    label: String(""),
    /**
     * iconRightUrl - URL for an icon to display on the right side of the label. If you filled this props, it automatically add an icon on the right side of the label.
     * Example: iconRightUrl="/pages/assets/icons/ic_common_info_outlined.svg"
     */
    iconRightUrl: String(""),
    /**
     * iconRightUrl - URL for an icon to display on the right side of the label. If you filled this props, it automatically add an icon on the left side of the label.
     * Example: iconRightUrl="/pages/assets/icons/ic_common_info_outlined.svg"
     * 
     */
    iconLeftUrl: String(""),
    /**
     * pixel is a prop that allows us to use pixels in styling
     */
    pixel: Boolean(false)
  },
  didMount: function didMount() {},
  didUpdate: function didUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setData(_objectSpread({}, this.props));
    }
  },
  onInit: function onInit() {
    this.setData(_objectSpread({}, this.props));
  },
  methods: {}
});