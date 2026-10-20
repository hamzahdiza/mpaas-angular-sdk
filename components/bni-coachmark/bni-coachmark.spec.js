function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? Object(arguments[r]) : {}, o = Object.keys(t); "function" == typeof Object.getOwnPropertySymbols && o.push.apply(o, Object.getOwnPropertySymbols(t).filter(function (e) { return Object.getOwnPropertyDescriptor(t, e).enumerable; })), o.forEach(function (r) { _defineProperty(e, r, t[r]); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { describe, it, expect } from 'vitest';
import { getInstance } from '../../configTest/utils';
var my = {
  navigateBack: vi.fn(),
  getSystemInfo: vi.fn(function (_ref) {
    var success = _ref.success;
    success({
      titleBarHeight: 44,
      statusBarHeight: 47
    });
  })
};
var defaultProps = {
  showCoachmark: true,
  title: 'Configure your financial recap here',
  description: 'You can configure your period starting date and get notified of your spendings, according to your needs.',
  buttonText: 'Atur Tanggal Mulai',
  centerPosition: false,
  highlightPosition: {
    top: 20,
    right: 20,
    width: 40,
    height: 40
  },
  onButtonTap: function onButtonTap() {},
  dynamicWidth: false,
  id: ''
};
var createInstance = function createInstance() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return getInstance('bni-coachmark', _objectSpread({}, defaultProps, props), my);
};
describe('bni-coachmark props', function () {
  it('showCoachmark is true when passed as true', function () {
    var showCoachmark = true;
    var instance = createInstance({
      showCoachmark: showCoachmark
    });
    expect(instance.getData().showCoachmark).toBe(true);
  });
  it('title is passed correctly', function () {
    var title = 'Test Coachmark Title';
    var instance = createInstance({
      title: title
    });
    expect(instance.getData().title).toBe(title);
  });
  it('description is passed correctly', function () {
    var description = 'Test Coachmark Description';
    var instance = createInstance({
      description: description
    });
    expect(instance.getData().description).toBe(description);
  });
  it('buttonText has a default value when not passed', function () {
    var instance = createInstance({});
    expect(instance.getData().buttonText).toBe('Atur Tanggal Mulai');
  });
  it('buttonText is passed correctly', function () {
    var buttonText = 'Test Button';
    var instance = createInstance({
      buttonText: buttonText
    });
    expect(instance.getData().buttonText).toBe(buttonText);
  });
  it('centerPosition is false by default', function () {
    var instance = createInstance({});
    expect(instance.getData().centerPosition).toBe(false);
  });
  it('centerPosition is true when passed as true', function () {
    var centerPosition = true;
    var instance = createInstance({
      centerPosition: centerPosition
    });
    expect(instance.getData().centerPosition).toBe(true);
  });
  it('highlightPosition default values are set correctly', function () {
    var instance = createInstance({});
    expect(instance.getData().highlightPosition).toEqual({
      top: 20,
      right: 20,
      width: 40,
      height: 40
    });
  });
  it('highlightPosition is updated correctly', function () {
    var highlightPosition = {
      top: 100,
      right: 50,
      width: 200,
      height: 150
    };
    var instance = createInstance({
      highlightPosition: highlightPosition
    });
    expect(instance.getData().highlightPosition).toEqual(highlightPosition);
  });
  it('statusBarHeight is set correctly in didMount', function () {
    var mockSystemInfo = {
      statusBarHeight: 24
    };
    my.getSystemInfo = function (callback) {
      return callback.success(mockSystemInfo);
    };
    var instance = createInstance({});
    expect(instance.getData().statusBarHeight).toBe(mockSystemInfo.statusBarHeight);
  });
  it('onButtonTap is called correctly when the button is tapped', function () {
    var onButtonTap = vi.fn();
    var instance = createInstance({
      onButtonTap: onButtonTap
    });
    instance.callMethod('onTapButton');
    expect(onButtonTap).toHaveBeenCalled();
  });
  it('didUpdate updates data when props change', function () {
    var initialProps = {
      title: 'Initial Title'
    };
    var instance = createInstance(initialProps);
    var newProps = {
      title: 'Updated Title'
    };
    instance.setProps(newProps);
    expect(instance.getData().title).toBe(newProps.title);
  });
  it('didUpdate does not update data when props do not change', function () {
    var initialProps = {
      title: 'Initial Title'
    };
    var instance = createInstance(initialProps);
    instance.setProps(initialProps);
    expect(instance.getData().title).toBe(initialProps.title);
  });
  it('dynamicWidth is false by default', function () {
    var instance = createInstance({});
    expect(instance.getData().dynamicWidth).toBe(false);
  });
  it('dynamicWidth is true when passed as true', function () {
    var dynamicWidth = true;
    var instance = createInstance({
      dynamicWidth: dynamicWidth
    });
    expect(instance.getData().dynamicWidth).toBe(true);
  });
  it('idCoachmark is passed correctly', function () {
    var idCoachmark = 'coachmark';
    var instance = createInstance({
      idCoachmark: idCoachmark
    });
    expect(instance.getData().idCoachmark).toBe(idCoachmark);
  });
});