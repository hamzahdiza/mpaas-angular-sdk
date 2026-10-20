function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? Object(arguments[r]) : {}, o = Object.keys(t); "function" == typeof Object.getOwnPropertySymbols && o.push.apply(o, Object.getOwnPropertySymbols(t).filter(function (e) { return Object.getOwnPropertyDescriptor(t, e).enumerable; })), o.forEach(function (r) { _defineProperty(e, r, t[r]); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Component({
  mixins: [],
  data: {
    slotsCount: 0
  },
  props: {
    /**
     * type : "primary | outline | sticky"
     */
    type: String("primary"),
    className: String,
    onTap: Function,
    /**
     * formType: "submit | reset" optional
     */
    formType: String,
    compact: Boolean,
    ghost: Boolean,
    /**
     * shadow: To provide a shadow effect on the top of the container. *these props can be used if type= 
    "sticky"
     */
    shadow: String,
    /**
     * 
      titlePrimaryButton: Used to give a title to your primary button. *these props can be used if type= 
    "sticky"
     */
    titlePrimaryButton: String("Your Title Button"),
    /**
    * 
     titleSecondaryButton: Used to give a title to your secondary button. *these props can be used if type= 
    "sticky"
    */
    titleSecondaryButton: String(),
    /**
     * onTapPrimaryButton: is a callback to handle primary button. *these props can be used if type= 
    "sticky"
     */
    onTapPrimaryButton: Function,
    /**
     * onTapSecondaryButton: is a callback to handle secondary button. *these props can be used if type= 
    "sticky"
     */
    onTapSecondaryButton: Function,
    /**
     * disabledPrimaryButton: Used to disable primary button. *these props can be used if type= 
    "sticky"
     */
    disabledPrimaryButton: Boolean(false),
    /**
     * disabledSecondaryButton: Used to disable secondary button. *these props can be used if type= 
    "sticky"
     */
    disabledSecondaryButton: Boolean(false),
    /**
     * idPrimaryButton: to give an ID to the primary sticky button. *these props can be used if type= 
    "sticky"
     */
    idPrimaryButton: String(),
    /**
     * idSecondaryButton: to give an ID to the secondary sticky button. *these props can be used if type= 
    "sticky"
     */
    idSecondaryButton: String(),
    /**
     * pixel is a prop that allows us to use pixels in styling
     */
    pixel: Boolean(false)
  },
  didMount: function didMount() {},
  onInit: function onInit() {
    this.setData(_objectSpread({}, this.props));
  },
  didUpdate: function didUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setData(_objectSpread({}, this.props));
    }
  },
  methods: {
    handleEvent: function handleEvent(e) {
      this.props.onTap(e);
    },
    handlePrimaryButton: function handlePrimaryButton(e) {
      this.props.onTapPrimaryButton(e);
    },
    handleSecondaryButton: function handleSecondaryButton(e) {
      this.props.onTapSecondaryButton(e);
    }
  }
});