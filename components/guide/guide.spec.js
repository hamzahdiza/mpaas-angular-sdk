import { describe, it, expect, vi } from 'vitest';
import { getInstance } from '../../configTest/utils';
describe('submit button handleSubmitTap', function () {
  it('handleSubmitButton success', function () {
    var onHandleSubmitButton = vi.fn();
    var instance = getInstance('guide', {
      onHandleSubmitButton: onHandleSubmitButton
    });
    instance.callMethod('handleSubmitButton');
    expect(onHandleSubmitButton).toBeCalled();
  });
});
describe('submit button handleBackButton', function () {
  it('handleSubmitButton success', function () {
    var onHandleBackButton = vi.fn();
    var instance = getInstance('guide', {
      onHandleBackButton: onHandleBackButton
    });
    instance.callMethod('handleBackButton');
    expect(onHandleBackButton).toBeCalled();
  });
});
describe('guide props', function () {
  it('type is filled with withBack value', function () {
    var type = "withBack";
    var instance = getInstance('guide', {
      type: type
    });
    expect(instance.getData().type).toBe("withBack");
  });
  it('type is filled with null value', function () {
    var type = null;
    var instance = getInstance('guide', {
      type: type
    });
    expect(instance.getData().type).toBeNull();
  });
  it('updates visible in didUpdate lifecycle method', function () {
    var initialProps = {
      visible: false
    };
    var instance = getInstance('guide', initialProps);
    var newProps = {
      visible: true
    };
    instance.setProps(newProps);
    expect(instance.getData().visible).toBe(true);
  });
  it('no update  in didUpdate lifecycle method', function () {
    var initialProps = {
      visible: false,
      indexActive: 0
    };
    var instance = getInstance('guide', initialProps);
    var newProps = {
      visible: false,
      indexActive: 0
    };
    instance.setProps(newProps);
    expect(instance.getData().visible).toBe(initialProps.visible);
  });
  it('visible filled with true', function () {
    var visible = true;
    var instance = getInstance('guide', {
      visible: visible
    });
    expect(instance.getData().visible).toBe(true);
    expect(instance.getData().visible).toBeTruthy();
  });
  it('visible filled with false', function () {
    var visible = false;
    var instance = getInstance('guide', {
      visible: visible
    });
    expect(instance.getData().visible).toBe(false);
    expect(instance.getData().visible).toBeFalsy();
  });
});