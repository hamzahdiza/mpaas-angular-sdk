import { describe, it, expect, vi } from 'vitest';
import { getInstance } from '../../configTest/utils';
describe('loaders', function () {
  it('lifecycle - didMount (props not yet been provided)', function () {
    var onReload = vi.fn();
    var data = {
      color: '#F56F19',
      type: 'small',
      failMessage: "Muat Ulang",
      fail: false,
      loading: true,
      reloadIcon: "",
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
    };
    var newProps = {
      fail: true,
      onReload: onReload
    };
    var instance = getInstance('loaders');
    expect(instance.getData()).toStrictEqual(data);
    instance.setProps(newProps);
    instance.callMethod('onReload');
  });
  it('props - color: String', function () {
    var onReload = vi.fn();
    var initialProps = {
      color: "#FFFFFF"
    };
    var newProps = {
      fail: true,
      onReload: onReload
    };
    var instance = getInstance('loaders', initialProps);
    expect(instance.getData().color).toBe(initialProps.color);
    expect(instance.getData().color).toBeTypeOf('string');
    instance.setProps(newProps);
    instance.callMethod('onReload');
  });
  it('props - color: no color provided', function () {
    var onReload = vi.fn();
    var color = "#F56F19";
    var newProps = {
      fail: true,
      onReload: onReload
    };
    var instance = getInstance('loaders');
    expect(instance.getData().color).toBe(color);
    expect(instance.getData().color).toBeTypeOf('string');
    instance.setProps(newProps);
    instance.callMethod('onReload');
  });
  it('props - type: String', function () {
    var onReload = vi.fn();
    var types = ['small', 'medium', 'big', 'full'];
    var initialProps = {
      fail: false,
      onReload: onReload
    };
    var newProps = {
      color: "#FFFFFF",
      fail: true,
      onReload: onReload
    };
    var instance = getInstance('loaders', initialProps);
    types.forEach(function (type) {
      instance.setProps({
        type: type
      });
      expect(instance.getData().type).toBe(type);
      expect(instance.getData().type).toBeTypeOf('string');
    });
    instance.setProps(newProps);
    instance.callMethod('onReload');
  });
  it('props - type: no type provided', function () {
    var onReload = vi.fn();
    var type = "small";
    var newProps = {
      fail: true,
      onReload: onReload
    };
    var instance = getInstance('loaders');
    expect(instance.getData().type).toBe(type);
    expect(instance.getData().type).toBeTypeOf('string');
    instance.setProps(newProps);
    instance.callMethod('onReload');
  });
  it('props - failMessage: String', function () {
    var onReload = vi.fn();
    var failMessage = 'message';
    var initialProps = {
      failMessage: failMessage,
      fail: false,
      onReload: onReload
    };
    var newProps = {
      fail: true,
      onReload: onReload
    };
    var instance = getInstance('loaders', initialProps);
    expect(instance.getData().failMessage).toBe(failMessage);
    expect(instance.getData().failMessage).toBeTypeOf('string');
    instance.setProps(newProps);
    instance.callMethod('onReload');
  });
  it('props - failMessage: no failMessage provided', function () {
    var onReload = vi.fn();
    var failMessage = 'Muat Ulang';
    var newProps = {
      fail: true,
      onReload: onReload
    };
    var instance = getInstance('loaders');
    expect(instance.getData().failMessage).toBe(failMessage);
    expect(instance.getData().failMessage).toBeTypeOf('string');
    instance.setProps(newProps);
    instance.callMethod('onReload');
  });
  it('props - reloadIcon: String', function () {
    var onReload = vi.fn();
    var reloadIcon = '/path';
    var initialProps = {
      reloadIcon: reloadIcon
    };
    var newProps = {
      fail: true,
      onReload: onReload
    };
    var instance = getInstance('loaders', initialProps);
    expect(instance.getData().reloadIcon).toBe(reloadIcon);
    expect(instance.getData().reloadIcon).toBeTypeOf('string');
    expect(instance.getData().reloadIcon).toBeTruthy();
    instance.setProps(newProps);
    instance.callMethod('onReload');
  });
  it('props - reloadIcon: no reloadIcon provided', function () {
    var onReload = vi.fn();
    var reloadIcon = "";
    var newProps = {
      fail: true,
      onReload: onReload
    };
    var instance = getInstance('loaders');
    expect(instance.getData().reloadIcon).toBe(reloadIcon);
    expect(instance.getData().reloadIcon).toBeTypeOf('string');
    expect(instance.getData().reloadIcon).toBeFalsy();
    instance.setProps(newProps);
    instance.callMethod('onReload');
  });
  it('props - fail: Boolean', function () {
    var onReload = vi.fn();
    var fail = false;
    var initialProps = {
      fail: fail,
      onReload: onReload
    };
    var newProps = {
      fail: true,
      onReload: onReload
    };
    var instance = getInstance('loaders', initialProps);
    expect(instance.getData().fail).toBe(fail);
    expect(instance.getData().fail).toBeTypeOf('boolean');
    instance.setProps(newProps);
    instance.callMethod('onReload');
  });
  it('props - fail: no fail provided', function () {
    var onReload = vi.fn();
    var fail = false;
    var newProps = {
      fail: true,
      onReload: onReload
    };
    var instance = getInstance('loaders');
    expect(instance.getData().fail).toBe(fail);
    expect(instance.getData().fail).toBeTypeOf('boolean');
    instance.setProps(newProps);
    instance.callMethod('onReload');
  });
  it('props - loading: Boolean', function () {
    var onReload = vi.fn();
    var loading = false;
    var initialProps = {
      loading: loading
    };
    var newProps = {
      fail: true,
      onReload: onReload
    };
    var instance = getInstance('loaders', initialProps);
    expect(instance.getData().loading).toBe(loading);
    expect(instance.getData().loading).toBeTypeOf('boolean');
    instance.setProps(newProps);
    instance.callMethod('onReload');
  });
  it('props - loading: no loading provided', function () {
    var onReload = vi.fn();
    var loading = true;
    var newProps = {
      fail: true,
      onReload: onReload
    };
    var instance = getInstance('loaders');
    expect(instance.getData().loading).toBe(loading);
    expect(instance.getData().loading).toBeTypeOf('boolean');
    instance.setProps(newProps);
    instance.callMethod('onReload');
  });
  it('method - onReload: Function/Callback', function () {
    var onReload = function onReload() {
      return function () {};
    };
    var initialProps = {
      loading: false,
      onReload: onReload
    };
    var newProps = {
      loading: true,
      onReload: onReload
    };
    var instance = getInstance('loaders', initialProps);
    instance.setProps(newProps);
    expect(onReload).toBeTypeOf('function');
    expect(instance.callMethod('onReload')).toBeTypeOf('function');
  });
  it('method - onReload: no onReload provided', function () {
    var onReload = function onReload() {
      return function () {};
    };
    var newProps = {
      fail: true,
      onReload: onReload
    };
    var instance = getInstance('loaders');
    expect(instance.callMethod('onReload')).toBeUndefined();
    instance.setProps(newProps);
    instance.callMethod('onReload');
  });
  it('lifecycle - didUpdate (no new update available)', function () {
    var onReload = vi.fn();
    var initialProps = {
      fail: false,
      onReload: onReload
    };
    var newProps = {
      fail: true,
      onReload: onReload
    };
    var instance = getInstance('loaders', initialProps);
    var initialData = instance.getData();
    instance.setProps(initialProps);
    expect(instance.getData()).toStrictEqual(initialData);
    instance.setProps(newProps);
    instance.callMethod('onReload');
  });
  it('lifecycle - didUpdate (new update available)', function () {
    var onReload = vi.fn();
    var initialProps = {
      fail: false,
      onReload: onReload
    };
    var newProps = {
      fail: true,
      onReload: onReload
    };
    var instance = getInstance('loaders', initialProps);
    var initialData = instance.getData();
    instance.setProps(newProps);
    expect(instance.getData()).not.toStrictEqual(initialData);
    instance.callMethod('onReload');
  });
});