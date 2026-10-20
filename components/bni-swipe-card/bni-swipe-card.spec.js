import { describe, it, expect, vi } from 'vitest';
import { getInstance } from '../../configTest/utils';
var instance = getInstance('bni-swipe-card');
var onTapConfirm = function onTapConfirm() {
  return function () {};
};
var onTapEdit = function onTapEdit() {
  return function () {};
};
var defaultValue = {
  swipeOut: false,
  cardEffectDuration: 500,
  swipeOutDuration: 500,
  customButtons: false,
  confirmText: "Oke",
  editText: "Ubah Kategori",
  pixel: false
};
describe('bni-swipe-card', function () {
  beforeAll(function () {
    vi.useFakeTimers();
  });
  afterAll(function () {
    var newProps = {
      customButtons: true,
      onTapConfirm: onTapConfirm,
      onTapEdit: onTapEdit
    };
    instance.callMethod('onTapConfirm');
    instance.callMethod('onTapEdit');
    instance.setProps(newProps);
    instance.callMethod('onTapConfirm');
    instance.callMethod('onSwipeEnd');
    instance.callMethod('onTapEdit');
  });
  it('lifecycle - didMount (props not yet been provided)', function () {
    expect(instance.getData()).toStrictEqual(defaultValue);
  });
  it('props - swipeOut: Boolean', function () {
    instance.setProps(defaultValue);
    var swipeOut = true;
    instance.setProps({
      swipeOut: swipeOut
    });
    expect(instance.getData().swipeOut).toBeTypeOf('boolean');
    expect(instance.getData().swipeOut).toBe(true);
  });
  it('props - swipeOut: no swipeOut provided', function () {
    instance.setProps(defaultValue);
    expect(instance.getData().swipeOut).toBeTypeOf('boolean');
    expect(instance.getData().swipeOut).toBe(false);
  });
  it('props - cardEffectDuration: Number', function () {
    instance.setProps(defaultValue);
    var cardEffectDuration = 500;
    instance.setProps({
      cardEffectDuration: cardEffectDuration
    });
    expect(instance.getData().cardEffectDuration).toBeTypeOf('number');
    expect(instance.getData().cardEffectDuration).toBe(500);
  });
  it('props - cardEffectDuration: no cardEffectDuration provided', function () {
    instance.setProps(defaultValue);
    expect(instance.getData().cardEffectDuration).toBeTypeOf('number');
    expect(instance.getData().cardEffectDuration).toBe(500);
  });
  it('props - swipeOutDuration: Number', function () {
    instance.setProps(defaultValue);
    var swipeOutDuration = 500;
    instance.setProps({
      swipeOutDuration: swipeOutDuration
    });
    expect(instance.getData().swipeOutDuration).toBeTypeOf('number');
    expect(instance.getData().swipeOutDuration).toBe(500);
  });
  it('props - swipeOutDuration: no swipeOutDuration provided', function () {
    instance.setProps(defaultValue);
    expect(instance.getData().swipeOutDuration).toBeTypeOf('number');
    expect(instance.getData().swipeOutDuration).toBe(500);
  });
  it('props - customButtons: Boolean', function () {
    instance.setProps(defaultValue);
    var customButtons = true;
    instance.setProps({
      customButtons: customButtons
    });
    expect(instance.getData().customButtons).toBeTypeOf('boolean');
    expect(instance.getData().customButtons).toBe(true);
  });
  it('props - customButtons: no customButtons provided', function () {
    instance.setProps(defaultValue);
    expect(instance.getData().customButtons).toBeTypeOf('boolean');
    expect(instance.getData().customButtons).toBe(false);
  });
  it('props - editText: String', function () {
    instance.setProps(defaultValue);
    var editText = 'edit';
    instance.setProps({
      editText: editText
    });
    expect(instance.getData().editText).toBeTypeOf('string');
    expect(instance.getData().editText).toBe('edit');
  });
  it('props - editText: no editText provided', function () {
    instance.setProps(defaultValue);
    expect(instance.getData().editText).toBeTypeOf('string');
    expect(instance.getData().editText).toBe("Ubah Kategori");
  });
  it('props - confirmText: String', function () {
    instance.setProps(defaultValue);
    var confirmText = 'Okay';
    instance.setProps({
      confirmText: confirmText
    });
    expect(instance.getData().confirmText).toBeTypeOf('string');
    expect(instance.getData().confirmText).toBe('Okay');
  });
  it('props - confirmText: no confirmText provided', function () {
    instance.setProps(defaultValue);
    expect(instance.getData().confirmText).toBeTypeOf('string');
    expect(instance.getData().confirmText).toBe("Oke");
  });
  it('method - onTapConfirm: no onTapConfirm provided', function () {
    instance.setProps(defaultValue);
    expect(instance.callMethod('onTapConfirm')).toBeUndefined();
  });
  it('method - onTapConfirm: Function/Callback', function () {
    instance.setProps(defaultValue);
    instance.callMethod('onTapConfirm');
    expect(onTapConfirm).toBeTypeOf('function');
    expect(instance.getData().swipeOut).toBe(true);
    vi.runAllTimers();
    instance.callMethod('onSwipeEnd');
    expect(instance.getData().swipeOut).toBe(false);
  });
  it('method - onTapEdit: no onTapEdit provided', function () {
    instance.setProps(defaultValue);
    expect(instance.callMethod('onTapEdit')).toBeUndefined();
  });
  it('method - onTapEdit: Function/Callback', function () {
    instance.setProps(defaultValue);
    instance.callMethod('onTapEdit');
    expect(onTapEdit).toBeTypeOf('function');
  });
});