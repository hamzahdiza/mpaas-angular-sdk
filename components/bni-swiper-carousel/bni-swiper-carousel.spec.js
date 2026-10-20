function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? Object(arguments[r]) : {}, o = Object.keys(t); "function" == typeof Object.getOwnPropertySymbols && o.push.apply(o, Object.getOwnPropertySymbols(t).filter(function (e) { return Object.getOwnPropertyDescriptor(t, e).enumerable; })), o.forEach(function (r) { _defineProperty(e, r, t[r]); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { describe, it, expect } from 'vitest';
import { getInstance } from '../../configTest/utils';
describe('bni-swiper-carousel component', function () {
  it('should initialize data with default values and props in didMount', function () {
    var initialProps = {
      items: ['item1', 'item2'],
      autoplay: true,
      vertical: false,
      circular: true,
      interval: 3000,
      duration: 500,
      indicatorType: 'dots',
      nextMargin: '20rpx',
      prevMargin: '20rpx'
    };
    var instance = getInstance('bni-swiper-carousel', initialProps);
    expect(instance.getData()).toMatchObject(_objectSpread({
      activeIndex: 0
    }, initialProps));
  });
  it('should update activeIndex when onChange is called', function () {
    var initialProps = {
      items: ['item1', 'item2']
    };
    var instance = getInstance('bni-swiper-carousel', initialProps);

    // Call the onChange method and pass the necessary event object
    instance.callMethod('onChange', {
      detail: {
        current: 1
      }
    });

    // Directly check the activeIndex in the component's data
    expect(instance.getData().activeIndex).toBe(1);
  });
  it('should retain the default activeIndex when no props are provided', function () {
    var instance = getInstance('bni-swiper-carousel');
    expect(instance.getData()).toMatchObject({
      activeIndex: 0
    });
  });
  it('should update activeIndex when onDotTap is called', function () {
    var initialProps = {
      items: ['item1', 'item2'],
      indicatorType: 'dots'
    };
    var instance = getInstance('bni-swiper-carousel', initialProps);
    instance.callMethod('onDotTap', {
      target: {
        dataset: {
          index: 1
        }
      }
    });
    expect(instance.getData().activeIndex).toBe(1);
  });
  it('should not update activeIndex if tapped dot index is the same as current activeIndex', function () {
    var initialProps = {
      items: ['item1', 'item2'],
      indicatorType: 'dots'
    };
    var instance = getInstance('bni-swiper-carousel', initialProps);
    instance.callMethod('onDotTap', {
      target: {
        dataset: {
          index: 0
        }
      }
    });
    expect(instance.getData().activeIndex).toBe(0);
  });
});