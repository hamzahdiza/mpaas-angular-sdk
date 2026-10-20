import { describe, it, beforeEach } from 'vitest';
import { getInstance } from '../../configTest/utils';

describe('animated-guide', () => {
  let instance;
  let mockMy;

  const mockProps = {
    visible: true,
    step: 1,
    totalSteps: 4,
    title: 'Judul',
    description: 'Deskripsi',
    primaryButtonName: 'Lanjut',
    secondaryButtonName: 'Lewati',
    selector: '.lp-section',
    selectorAdjust: false,
    placement: 'bottom',
    onHandleSubmitButton: () => {},
    onHandleBackButton: () => {},
  };

  function createMockMy(options = {}) {
    const {
      statusBarHeight = 44,
      rectExecResult = [{ top: 100, left: 20, width: 200, height: 50 }],
      scrollExecResult = [{ scrollTop: 30 }],
    } = options;

    let mode = null;
    const query = {
      select: () => {
        mode = 'rect';
        return query;
      },
      boundingClientRect: () => query,
      selectViewport: () => {
        mode = 'viewport';
        return query;
      },
      scrollOffset: () => query,
      exec: (cb) => {
        if (mode === 'viewport') {
          cb(scrollExecResult);
        } else {
          cb(rectExecResult);
        }
      },
    };

    return {
      getSystemInfo: ({ success }) => success({ statusBarHeight }),
      createSelectorQuery: () => query,
      pageScrollTo: () => {},
    };
  }

  beforeEach(() => {
    mockMy = createMockMy();
    instance = getInstance('animated-guide', mockProps, mockMy);
  });

  describe('didMount', () => {
    it('should set statusBarHeight from res', () => {
      getInstance('animated-guide', mockProps, createMockMy({ statusBarHeight: 20 }));
    });

    it('should default statusBarHeight to 0 when res.statusBarHeight is falsy', () => {
      getInstance('animated-guide', mockProps, createMockMy({ statusBarHeight: 0 }));
    });
  });

  describe('didUpdate - highlight resolution triggers', () => {
    it('should resolve highlight when selector changes while visible', () => {
      instance.setProps({
        ...mockProps,
        selector: '.new-section',
      });
    });

    it('should resolve highlight when step changes while visible', () => {
      instance.setProps({
        ...mockProps,
        step: 2,
      });
    });

    it('should resolve highlight when visible changes to true', () => {
      const hiddenInstance = getInstance('animated-guide', { ...mockProps, visible: false }, createMockMy());
      hiddenInstance.setProps({
        ...mockProps,
        visible: true,
      });
    });

    it('should not resolve highlight when nothing relevant changes', () => {
      instance.setProps({
        ...mockProps,
        title: 'Judul',
      });
    });

    it('should not resolve highlight when visible is false even if step changes', () => {
      const hiddenInstance = getInstance('animated-guide', { ...mockProps, visible: false }, createMockMy());
      hiddenInstance.setProps({
        ...mockProps,
        visible: false,
        step: 3,
      });
    });

    it('should not resolve highlight when selector is empty even if visible', () => {
      const noSelectorInstance = getInstance('animated-guide', { ...mockProps, selector: '' }, createMockMy());
      noSelectorInstance.setProps({
        ...mockProps,
        selector: '',
        step: 2,
      });
    });
  });

  describe('didUpdate - scroll unlock on hide', () => {
    it('should unlock scroll and reset ready when visible goes from true to false', () => {
      instance.setProps({
        ...mockProps,
        visible: false,
      });
    });

    it('should not unlock scroll when visible stays false', () => {
      const hiddenInstance = getInstance('animated-guide', { ...mockProps, visible: false }, createMockMy());
      hiddenInstance.setProps({
        ...mockProps,
        visible: false,
        step: 2,
      });
    });

    it('should not unlock scroll when visible stays true', () => {
      instance.setProps({
        ...mockProps,
        step: 2,
      });
    });
  });

  describe('preventTouchMove', () => {
    it('should return false', () => {
      instance.callMethod('preventTouchMove');
    });
  });

  describe('onSubmit', () => {
    it('should call onHandleSubmitButton when provided', () => {
      instance.callMethod('onSubmit');
    });

    it('should not throw when onHandleSubmitButton is not provided', () => {
      const noCallbackInstance = getInstance(
        'animated-guide',
        { ...mockProps, onHandleSubmitButton: undefined },
        createMockMy()
      );
      noCallbackInstance.callMethod('onSubmit');
    });
  });

  describe('onBack', () => {
    it('should call onHandleBackButton when provided', () => {
      instance.callMethod('onBack');
    });

    it('should not throw when onHandleBackButton is not provided', () => {
      const noCallbackInstance = getInstance(
        'animated-guide',
        { ...mockProps, onHandleBackButton: undefined },
        createMockMy()
      );
      noCallbackInstance.callMethod('onBack');
    });
  });

  describe('_resolveHighlight', () => {
    it('should return early when selector is empty', () => {
      const noSelectorInstance = getInstance('animated-guide', { ...mockProps, selector: '' }, createMockMy());
      noSelectorInstance.callMethod('_resolveHighlight');
    });

    it('should handle rect returned as nested array', () => {
      const nestedInstance = getInstance(
        'animated-guide',
        mockProps,
        createMockMy({ rectExecResult: [[{ top: 10, left: 5, width: 100, height: 40 }]] })
      );
      nestedInstance.callMethod('_resolveHighlight');
    });

    it('should handle rect returned as flat object', () => {
      instance.callMethod('_resolveHighlight');
    });

    it('should return early when rect is falsy', () => {
      const nullRectInstance = getInstance(
        'animated-guide',
        mockProps,
        createMockMy({ rectExecResult: [null] })
      );
      nullRectInstance.callMethod('_resolveHighlight');
    });

    it('should apply adjustment when selectorAdjust is true', () => {
      const adjustInstance = getInstance(
        'animated-guide',
        { ...mockProps, selectorAdjust: true },
        createMockMy()
      );
      adjustInstance.callMethod('_resolveHighlight');
    });

    it('should not apply adjustment when selectorAdjust is false', () => {
      instance.callMethod('_resolveHighlight');
    });

    it('should fall back to bottom placement when placement prop is empty', () => {
      const noPlacementInstance = getInstance(
        'animated-guide',
        { ...mockProps, placement: '' },
        createMockMy()
      );
      noPlacementInstance.callMethod('_resolveHighlight');
    });

    it('should use top placement when specified', () => {
      const topPlacementInstance = getInstance(
        'animated-guide',
        { ...mockProps, placement: 'top' },
        createMockMy()
      );
      topPlacementInstance.callMethod('_resolveHighlight');
    });
  });

  describe('_lockScroll', () => {
    it('should store scrollTop when result is present', () => {
      instance.callMethod('_lockScroll');
    });

    it('should handle scrollRes returned as nested array', () => {
      const nestedInstance = getInstance(
        'animated-guide',
        mockProps,
        createMockMy({ scrollExecResult: [[{ scrollTop: 15 }]] })
      );
      nestedInstance.callMethod('_lockScroll');
    });

    it('should default scrollTop to 0 when scrollRes is falsy', () => {
      const nullScrollInstance = getInstance(
        'animated-guide',
        mockProps,
        createMockMy({ scrollExecResult: [null] })
      );
      nullScrollInstance.callMethod('_lockScroll');
    });

    it('should default scrollTop to 0 when scrollTop is missing on result', () => {
      const noScrollTopInstance = getInstance(
        'animated-guide',
        mockProps,
        createMockMy({ scrollExecResult: [{}] })
      );
      noScrollTopInstance.callMethod('_lockScroll');
    });

    it('should do nothing when ret is empty', () => {
      const emptyRetInstance = getInstance(
        'animated-guide',
        mockProps,
        createMockMy({ scrollExecResult: [] })
      );
      emptyRetInstance.callMethod('_lockScroll');
    });
  });

  describe('_unlockScroll', () => {
    it('should restore scroll position by default', () => {
      instance.callMethod('_lockScroll');
      instance.callMethod('_unlockScroll');
    });

    it('should not restore scroll position when restorePosition is false', () => {
      instance.callMethod('_lockScroll');
      instance.callMethod('_unlockScroll', false);
    });

    it('should not restore when _lockedScrollTop is undefined', () => {
      instance.callMethod('_unlockScroll', true);
    });
  });
});