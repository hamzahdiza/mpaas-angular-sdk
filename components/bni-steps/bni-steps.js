function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? Object(arguments[r]) : {}, o = Object.keys(t); "function" == typeof Object.getOwnPropertySymbols && o.push.apply(o, Object.getOwnPropertySymbols(t).filter(function (e) { return Object.getOwnPropertyDescriptor(t, e).enumerable; })), o.forEach(function (r) { _defineProperty(e, r, t[r]); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Component({
  mixins: [],
  data: {},
  props: {
    /**
    * items: "data array of object of the tabs include name,date,time,status,detail,icon,"
    * name: name of proses (type String),
    * date & time: time transaction (type String)
    * status: status transaction (type String)
    * detail: detail proses just for vertical type (type String)
    * icon: icon each steps (type String) 
    * default: "Array"
    */
    data: Array,
    /**
    * type: "vertical" | "horizontal"
    */
    type: String("vertical"),
    pixel: Boolean(false)
  },
  didMount: function didMount() {
    this.setData(_objectSpread({}, this.props));
  },
  didUpdate: function didUpdate() {
    this.setData(_objectSpread({}, this.props));
  }
});