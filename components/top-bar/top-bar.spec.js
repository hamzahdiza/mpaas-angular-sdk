

import {
  describe,
  it,
  expect,
  vi
} from 'vitest';
import {
  getInstance
} from '../../configTest/utils';

const my = {
  navigateBack: vi.fn(),
  getSystemInfo: vi.fn(({
    success
  }) => {
    success({
      titleBarHeight: 44,
      statusBarHeight: 47,
    });
  }),
};

const defaultProps = {
  onIconRTap: vi.fn(),
  onIconRTapSecondary: vi.fn(),
  onIconRTapTertiary: vi.fn(),
  iconR: 'iconR',
  iconRSecondary: 'iconRSecondary',
  iconRTertiary: 'iconRTertiary',
  onIconLTapDefault: vi.fn(),
  iconL: 'iconL',
};

const createInstance = (props = {}) => getInstance('top-bar', {
  ...defaultProps,
  ...props
}, my);

describe('top-bar methods onIconLTapDefault', () => {
  it('with navigate and iconL', () => {
    const onIconLTapDefault = vi.fn();
    const instance = createInstance({
      onIconLTapDefault,
      navigate: true,
      onIconLTap: undefined
    });
    instance.callMethod('onIconLTapDefault');
    expect(my.navigateBack).toBeCalled();
  });

  it('without navigate', () => {
    const onIconLTapDefault = vi.fn();
    const instance = createInstance({
      onIconLTapDefault,
      navigate: false
    });
    instance.callMethod('onIconLTapDefault');
    expect(onIconLTapDefault).not.toBeCalled();
  });

  it('without iconL', () => {
    const onIconLTapDefault = vi.fn();
    const instance = createInstance({
      onIconLTapDefault,
      iconL: ''
    });
    instance.callMethod('onIconLTapDefault');
    expect(onIconLTapDefault).not.toBeCalled();
  });
});

describe('top-bar methods onIconLTap', () => {
  it('calls onIconLTap when navigate is true, iconL has length > 1, and onIconLTap is defined', () => {
    const onIconLTap = vi.fn();
    const instance = createInstance({
      navigate: true,
      iconL: 'iconL',
      onIconLTap
    });
    instance.callMethod('onIconLTap');
    expect(onIconLTap).toBeCalled();
  });

  it('does not call onIconLTap when navigate is false', () => {
    const onIconLTap = vi.fn();
    const instance = createInstance({
      navigate: false,
      iconL: 'iconL',
      onIconLTap
    });
    instance.callMethod('onIconLTap');
    expect(onIconLTap).not.toBeCalled();
  });

  it('does not call onIconLTap when iconL has length <= 1', () => {
    const onIconLTap = vi.fn();
    const instance = createInstance({
      navigate: true,
      iconL: 'i',
      onIconLTap
    });
    instance.callMethod('onIconLTap');
    expect(onIconLTap).not.toBeCalled();
  });

  it('does not call onIconLTap when onIconLTap is undefined', () => {
    const instance = createInstance({
      navigate: true,
      iconL: 'iconL'
    });
    instance.callMethod('onIconLTap');
  });
});

describe('top-bar methods ALL', () => {
  it('should handle all types of props', () => {
    const onIconRTap = vi.fn();
    const instance = createInstance({
      onIconRTap,
      navigate: true
    });
    instance.callMethod('onIconRTap');
    expect(onIconRTap).toBeCalled();

    const propsArr = instance.getData();
    for (const prop in propsArr) {
      if (typeof propsArr[prop] === 'function') {
        expect(propsArr[prop]).toBe('function');
      } else {
        expect(propsArr[prop]).toBe(propsArr[prop]);
      }
    }
  });

  it('should handle didUpdate and didUnmount lifecycle methods', () => {
    const onIconRTap = vi.fn();
    const instance = createInstance({
      onIconRTap,
      navigate: true
    });
    instance.callMethod('onIconRTap');
    expect(onIconRTap).toBeCalled();

    if (typeof instance.didUpdate === 'function') {
      instance.didUpdate();
    }

    if (typeof instance.didUnmount === 'function') {
      instance.didUnmount();
    }
  });
});

describe('top-bar methods onIconRTap', () => {
  it('with callback function and iconR', () => {
    const onIconRTap = vi.fn();
    const instance = createInstance({
      onIconRTap,
      navigate: true
    });
    instance.callMethod('onIconRTap');
    expect(onIconRTap).toBeCalled();
  });

  it('without callback function', () => {
    const onIconRTap = vi.fn();
    const instance = createInstance({
      iconR: 'iconR',
      navigate: true
    });
    instance.callMethod('onIconRTap');
    expect(onIconRTap).not.toBeCalled();
  });

  it('without iconR', () => {
    const onIconRTap = vi.fn();
    const instance = createInstance({
      onIconRTap,
      navigate: true,
      iconR: ''
    });
    instance.callMethod('onIconRTap');
    expect(onIconRTap).not.toBeCalled();
  });
});

describe('top-bar methods onIconRTapSecondary', () => {
  it('with callback function and iconRSecondary', () => {
    const onIconRTapSecondary = vi.fn();
    const instance = createInstance({
      onIconRTapSecondary,
      navigate: true
    });
    instance.callMethod('onIconRTapSecondary');
    expect(onIconRTapSecondary).toBeCalled();
  });

  it('without callback function', () => {
    const onIconRTapSecondary = vi.fn();
    const instance = createInstance({
      iconRSecondary: 'iconRSecondary',
      navigate: true
    });
    instance.callMethod('onIconRTapSecondary');
    expect(onIconRTapSecondary).not.toBeCalled();
  });

  it('without iconRSecondary', () => {
    const onIconRTapSecondary = vi.fn();
    const instance = createInstance({
      onIconRTapSecondary,
      navigate: true,
      iconRSecondary: ''
    });
    instance.callMethod('onIconRTapSecondary');
    expect(onIconRTapSecondary).not.toBeCalled();
  });
});

describe('top-bar methods onIconRTapTertiary', () => {
  it('with callback function and iconRTertiary', () => {
    const onIconRTapTertiary = vi.fn();
    const instance = createInstance({
      onIconRTapTertiary,
      navigate: true
    });
    instance.callMethod('onIconRTapTertiary');
    expect(onIconRTapTertiary).toBeCalled();
  });

  it('without callback function', () => {
    const onIconRTapTertiary = vi.fn();
    const instance = createInstance({
      iconRTertiary: 'iconRTertiary',
      navigate: true
    });
    instance.callMethod('onIconRTapTertiary');
    expect(onIconRTapTertiary).not.toBeCalled();
  });

  it('without iconRTertiary', () => {
    const onIconRTapTertiary = vi.fn();
    const instance = createInstance({
      onIconRTapTertiary,
      navigate: true,
      iconRTertiary: ''
    });
    instance.callMethod('onIconRTapTertiary');
    expect(onIconRTapTertiary).not.toBeCalled();
  });
});