import { describe, it, expect, vi } from 'vitest';
import { getInstance } from '../../configTest/utils';
var my = {
  setClipboard: vi.fn()
};
describe('bni input keyboard', function () {
  it('should update loading state when props change', function () {
    var initialProps = {
      inputValue: '100',
      isCaptionVisible: false
    };
    var instance = getInstance('bni-input-keyboard', initialProps);
    var newProps = {
      inputValue: '1.000',
      isCaptionVisible: true
    };
    instance.setProps(newProps);
    expect(instance.getData().inputValue).toBe('1.000');
    expect(instance.getData().isCaptionVisible).toBe(true);
  });
  it('should show copy paste button', function () {
    var instance = getInstance('bni-input-keyboard');
    instance.callMethod('onLongTap');
    expect(instance.getData().showCopy).toBe(true);
  });
  it('should not show copy paste button when disabled', function () {
    var instance = getInstance('bni-input-keyboard', {
      showCopy: false
    });
    instance.setProps({
      disabled: true
    });
    instance.callMethod('onLongTap');
    expect(instance.getData().showCopy).toBe(false);
  });
  it('should set clipboard with modified amount and update showCopy', function () {
    var initialProps = {
      inputValue: '100'
    };
    var instance = getInstance('bni-input-keyboard', {
      initialProps: initialProps
    }, my);
    var newProps = {
      inputValue: '1.000'
    };
    instance.setProps(newProps);
    var amount = instance.getData().inputValue.replace(/\./g, "");
    instance.callMethod('onCopy', amount);
    expect(my.setClipboard).toBeCalled();
    expect(instance.getData().showCopy).toBe(false);
  });
  it('should get clipboard and update showCopy', function () {
    var instance = getInstance('bni-input-keyboard', {}, my);
    var newProps = {
      onPaste: vi.fn()
    };
    instance.setProps(newProps);
    instance.callMethod('onPaste');
    expect(instance.getData().showCopy).toBe(false);
  });
  it('input onChange', function () {
    var onChange = vi.fn();
    var eventMock = {
      detail: {
        value: ""
      }
    };
    var instance = getInstance('bni-input-keyboard', {
      onChange: onChange
    });
    instance.callMethod('onChange', eventMock);
    expect(onChange).toHaveBeenCalledWith("");
  });
  it('Close Keyboard', function () {
    var instance = getInstance('bni-input-keyboard');
    instance.callMethod('onClose');
    expect(instance.getData().inputFocusStatus).toBe(false);
  });
  it('input onSuffix', function () {
    var onSuffix = vi.fn();
    var instance = getInstance('bni-input-keyboard', {
      onSuffix: onSuffix
    });
    instance.callMethod('onSuffix');
    expect(onSuffix).toBeCalled();
  });
  it('input onPrefix', function () {
    var onPrefix = vi.fn();
    var instance = getInstance('bni-input-keyboard', {
      onPrefix: onPrefix
    });
    instance.callMethod('onPrefix');
    expect(onPrefix).toBeCalled();
  });
  it('input onClear', function () {
    var onClear = vi.fn();
    var instance = getInstance('bni-input-keyboard', {
      onClear: onClear
    });
    instance.callMethod('onClear');
    expect(onClear).toBeCalled();
  });
  it('input handlePopupClose with onClose', function () {
    var instance = getInstance('bni-input-keyboard');
    var mockOnClose = vi.fn();
    instance.setProps({
      onClose: mockOnClose
    });
    instance.callMethod('handlePopupClose');
    expect(mockOnClose).toHaveBeenCalled();
    expect(instance.getData().inputFocusStatus).toBe(false);
  });
  it('input handlePopupClose without onClose', function () {
    var instance = getInstance('bni-input-keyboard', {
      onClose: null
    });
    instance.callMethod('handlePopupClose');
    expect(instance.getData().inputFocusStatus).toBe(false);
  });
  it('execute onHandleClick', function () {
    var e = {
      target: {
        dataset: {
          attr: '2'
        }
      }
    };
    var instance = getInstance('bni-input-keyboard', {});
    instance.callMethod('onHandleClick', e);
    expect(instance.getData().inputFocusStatus).toBe(false);
  });
  it('execute onHandleClickDelete', function () {
    var instance = getInstance('bni-input-keyboard', {});
    instance.callMethod('onHandleClickDelete');
  });
});
describe('onFocused', function () {
  var instance;
  beforeEach(function () {
    instance = getInstance('bni-input-keyboard');
  });
  it('should set inputFocusStatus to false when type is "disabled"', function () {
    instance.setProps({
      type: 'disabled'
    });
    instance.callMethod('onFocused');
    expect(instance.getData().inputFocusStatus).toBe(false);
  });
  it('should set inputFocusStatus to false when type is "read-only"', function () {
    instance.setProps({
      type: 'read-only'
    });
    instance.callMethod('onFocused');
    expect(instance.getData().inputFocusStatus).toBe(false);
  });
  it('should set inputFocusStatus to true for other types', function () {
    instance.setProps({
      type: 'editable'
    });
    instance.callMethod('onFocused');
    expect(instance.getData().inputFocusStatus).toBe(true);
  });
});