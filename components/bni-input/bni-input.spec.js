import { describe, it, expect, vi } from 'vitest';
import { getInstance } from '../../configTest/utils';
describe('input onChange function', function () {
  it('input onChange', function () {
    var onChange = vi.fn();
    var eventMock = {
      detail: {
        value: ""
      }
    };
    var instance = getInstance('bni-input', {
      onChange: onChange
    });
    instance.callMethod('onChange', eventMock);
    expect(onChange).toHaveBeenCalledWith("");
  });
});
describe('input showKeybord functionality', function () {
  it('should set showKeybord to true when type is amountType', function () {
    var instance = getInstance('bni-input', {
      type: 'amountType'
    });
    instance.callMethod('onFocused');
    expect(instance.getData().showKeybord).toBe(true);
  });
  it('should set showKeybord to true when type is amountWithClear', function () {
    var instance = getInstance('bni-input', {
      type: 'amountWithClear'
    });
    instance.callMethod('onFocused');
    expect(instance.getData().showKeybord).toBe(true);
  });
  it('should not set showKeybord to true for other types', function () {
    var instance = getInstance('bni-input');
    instance.callMethod('onFocused');
    expect(instance.getData().inputFocusStatus).toBe(true);
  });
  it('input onFocused with type amountType', function () {
    var instance = getInstance('bni-input', {
      type: 'amountType'
    });
    instance.callMethod('onFocused');
    expect(instance.getData().inputFocusStatus).toBe(true);
  });
  it('input onFocused with type amountWithClear', function () {
    var instance = getInstance('bni-input', {
      type: 'amountWithClear'
    });
    instance.callMethod('onFocused');
    expect(instance.getData().inputFocusStatus).toBe(true);
  });
});
describe('input onBlur function', function () {
  it('input onBlur', function () {
    var instance = getInstance('bni-input');
    instance.callMethod('onBlur');
    expect(instance.getData().inputFocusStatus).toBe(false);
  });
  it('input onBlur with type amountType', function () {
    var instance = getInstance('bni-input', {
      type: 'amountType'
    });
    instance.callMethod('onBlur');
    expect(instance.getData().inputFocusStatus).toBe(true);
  });
  it('input onBlur with type amountType', function () {
    var instance = getInstance('bni-input', {
      type: 'amountType'
    });
    instance.callMethod('onBlur');
    expect(instance.getData().inputFocusStatus).toBe(true);
  });
});
describe('input onClose function', function () {
  it('input onClose', function () {
    var instance = getInstance('bni-input', {});
    instance.callMethod('onClose');
    expect(instance.getData().inputFocusStatus).toBe(false);
    expect(instance.getData().showKeybord).toBe(false);
  });
});
describe('input onSuffix function', function () {
  it('input onSuffix', function () {
    var onSuffix = vi.fn();
    var instance = getInstance('bni-input', {
      onSuffix: onSuffix
    });
    instance.callMethod('onSuffix');
    expect(onSuffix).toBeCalled();
  });
});
describe('input onPrefix function', function () {
  it('input onPrefix', function () {
    var onPrefix = vi.fn();
    var instance = getInstance('bni-input', {
      onPrefix: onPrefix
    });
    instance.callMethod('onPrefix');
    expect(onPrefix).toBeCalled();
  });
});
describe('input onClear function', function () {
  it('input onClear', function () {
    var onClear = vi.fn();
    var instance = getInstance('bni-input', {
      onClear: onClear
    });
    instance.callMethod('onClear');
    expect(onClear).toBeCalled();
  });
});
describe('onHandleClick', function () {
  it('execute onHandleClick', function () {
    var e = {
      target: {
        dataset: {
          attr: '2'
        }
      }
    };
    var instance = getInstance('bni-input', {});
    instance.callMethod('onHandleClick', e);
  });
});
describe('onHandleClickDelete', function () {
  it('execute onHandleClickDelete', function () {
    var instance = getInstance('bni-input', {});
    instance.callMethod('onHandleClickDelete');
  });
});
describe('handlePopupClose', function () {
  it('execute handlePopupClose', function () {
    var instance = getInstance('bni-input', {});
    instance.callMethod('handlePopupClose');
    expect(instance.getData().inputFocusStatus).toBe(false);
    expect(instance.getData().showKeybord).toBe(false);
  });
});
describe('onPopupFocused', function () {
  it('execute onPopupFocused', function () {
    var instance = getInstance('bni-input', {});
    instance.callMethod('onPopupFocused');
    expect(instance.getData().inputFocusStatus).toBe(true);
  });
});
describe('birthDate format validation on didMount', function () {
  it('should set birthDateFormat when formatDate is valid', function () {
    var instance = getInstance('bni-input', {
      type: 'birthDate',
      formatDate: 'day-month-year'
    });
    expect(instance.getData().birthDateFormat).toEqual(['day', 'month', 'year']);
  });
  it('should not set birthDateFormat when formatDate is invalid', function () {
    var instance = getInstance('bni-input', {
      type: 'birthDate',
      formatDate: 'invalid-format'
    });
    expect(instance.getData().birthDateFormat).toEqual([]);
  });
  it('should not set birthDateFormat when type is not birthDate', function () {
    var instance = getInstance('bni-input', {
      type: 'text',
      formatDate: 'day-month-year'
    });
    expect(instance.getData().birthDateFormat).toEqual([]);
  });
});
describe('didUpdate for type "birthDate"', function () {
  it('should update birthDateFocusStatus when type is birthDate', function () {
    var instance = getInstance('bni-input', {
      type: 'birthDate',
      birthDateFocusStatus: 'day'
    });
    instance.setProps({
      type: 'birthDate',
      birthDateFocusStatus: 'month'
    });
    expect(instance.getData().birthDateFocusStatus).toBe('month');
  });
  it('should not update birthDateFocusStatus for other types', function () {
    var instance = getInstance('bni-input', {
      type: 'text',
      birthDateFocusStatus: 'day'
    });
    instance.setProps({
      type: 'text',
      birthDateFocusStatus: 'month'
    });
    expect(instance.getData().birthDateFocusStatus).toBe('');
  });
});
describe('onNumberFocus', function () {
  it('should set visible to true and update birthDateFocusStatus', function () {
    var instance = getInstance('bni-input', {
      onFocusStatus: vi.fn()
    });
    var event = {
      currentTarget: {
        dataset: {
          field: 'day'
        }
      }
    };
    instance.callMethod('onNumberFocus', event);
    expect(instance.getData().visible).toBe(true);
    expect(instance.getData().birthDateFocusStatus).toBe('day');
  });
  it('should set visible to true and update birthDateFocusStatus', function () {
    var instance = getInstance('bni-input', {
      onFocusStatus: vi.fn(),
      disabled: true
    });
    var event = {
      currentTarget: {
        dataset: {
          field: 'day'
        }
      }
    };
    instance.callMethod('onNumberFocus', event);

    // expect(instance.getData().visible).toBe(true);
    // expect(instance.getData().birthDateFocusStatus).toBe('day');
  });
});
describe('onChangeBirthDate', function () {
  it('should call props.onChange with the correct event', function () {
    var onChangeMock = vi.fn();
    var instance = getInstance('bni-input', {
      onChange: onChangeMock
    });
    var event = {
      value: '01-01-2000'
    };
    instance.callMethod('onChangeBirthDate', event);
    expect(onChangeMock).toHaveBeenCalledWith(event);
  });
});
describe('onCloseNumberKeyboard', function () {
  it('should set visible to false', function () {
    var instance = getInstance('bni-input', {});
    instance.callMethod('onCloseNumberKeyboard');
    expect(instance.getData().visible).toBe(false);
  });
  it('should set visible to false', function () {
    var instance = getInstance('bni-input', {});
    // delete instance.setProps.onKeyboardClose
    instance.callMethod('onCloseNumberKeyboard');
    expect(instance.getData().visible).toBe(false);
  });
});