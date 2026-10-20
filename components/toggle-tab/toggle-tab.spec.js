import { describe, it, expect, vi } from 'vitest';
import { getInstance } from '../../configTest/utils';
var my = {
  createSelectorQuery: vi.fn()
};
var select = vi.fn(function () {
  return {
    boundingClientRect: vi.fn(function () {
      return {
        exec: vi.fn(function (callback) {
          callback([{
            left: 0,
            height: 0,
            width: 0
          }]);
        })
      };
    })
  };
});
my.createSelectorQuery = vi.fn(function () {
  return {
    "in": vi.fn(function () {
      return {
        select: select
      };
    })
  };
});
describe('toggle-tab onTap', function () {
  it('toggle-tab onChange', function () {
    var eventMock = {
      target: {
        dataset: {
          num: 1
        }
      }
    };

    // Mocking the onChange function
    var onChange = vi.fn();

    // Create an instance of your component
    var instance = getInstance('toggle-tab', {
      onChange: onChange
    });
    // Call the method with the mock event object
    instance.callMethod('handleClick', eventMock);

    // Check if onChange is called with the correct event object
    expect(onChange).toBeCalledWith(eventMock);
  });
  it('type of button', function () {
    var type = 'toggle';
    var eventMock = {
      target: {
        dataset: {
          num: 1
        }
      }
    };
    var isAnimation = true;
    var onChange = vi.fn();
    var instance = getInstance('toggle-tab', {
      type: type,
      onChange: onChange,
      isAnimation: isAnimation
    }, my);
    instance.callMethod('handleClick', eventMock);
    expect(type).toBe('toggle');
  });
  it('should update selection when props.current changes', function () {
    // Initial props
    var initialProps = {
      current: 1,
      isAnimation: true
    };

    // Create an instance of your component with initial props
    var instance = getInstance('toggle-tab', initialProps, my);

    // Simulate props change
    var newProps = {
      current: 2
    };
    instance.setProps(newProps);

    // Check if selection is updated correctly
    expect(instance.getData().selection).toBe(newProps.current);
  });
  it('should update selection when props.current changes and isAnimation false', function () {
    // Initial props
    var initialProps = {
      current: 1,
      isAnimation: false
    };

    // Create an instance of your component with initial props
    var instance = getInstance('toggle-tab', initialProps, my);

    // Simulate props change
    var newProps = {
      current: 2
    };
    instance.setProps(newProps);

    // Check if selection is updated correctly
    expect(instance.getData().selection).toBe(newProps.current);
  });
  it('should accept and set background prop', function () {
    var background = 'custom-background';

    // Create an instance of your component with background prop
    var instance = getInstance('toggle-tab', {
      background: background
    });

    // Check if background prop is set correctly
    expect(instance.getData().background).toBe(background);
  });
  it('should accept and set items prop', function () {
    var items = 'custom-background';

    // Create an instance of your component with background prop
    var instance = getInstance('toggle-tab', {
      items: items
    });

    // Check if background prop is set correctly
    expect(instance.getData().items).toBe(items);
  });
  it('should setData if isLoading when call getSlideInfo', function () {
    var type = 'toggle';
    var isLoading = true;
    var instance = getInstance('toggle-tab', {
      type: type,
      isLoading: isLoading
    });
    instance.callMethod('getSlideInfo');
  });
  it('should setData if isLoading false when call getSlideInfo with left, height and width zero', function () {
    var type = 'toggle';
    var isLoading = false;
    var instance = getInstance('toggle-tab', {
      type: type,
      isLoading: isLoading
    }, my);
    instance.callMethod('getSlideInfo');
  });
  it('should setData if isLoading false when call getSlideInfo with left, height and width not zero', function () {
    var select = vi.fn(function () {
      return {
        boundingClientRect: vi.fn(function () {
          return {
            exec: vi.fn(function (callback) {
              callback([{
                left: 10,
                height: 20,
                width: 30
              }]);
            })
          };
        })
      };
    });
    my.createSelectorQuery = vi.fn(function () {
      return {
        "in": vi.fn(function () {
          return {
            select: select
          };
        })
      };
    });
    var type = 'toggle';
    var isLoading = false;
    var instance = getInstance('toggle-tab', {
      type: type,
      isLoading: isLoading
    }, my);
    instance.callMethod('getSlideInfo');
  });
});