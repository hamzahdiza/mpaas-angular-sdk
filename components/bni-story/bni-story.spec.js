import {
  describe,
  it,
  expect,
  vi
} from 'vitest';
import {
  getInstance
} from '../../configTest/utils';


describe('bni-Story tab', () => {

  it('bni-story handle Next', () => {
    const current = 1
    const mode = 'horizontal'
    const onNext = vi.fn();
    const instance = getInstance('bni-story', {
      current,
      mode,
      onNext,
    });
    instance.callMethod('handleNext')
  });
  it('bni-story update Current', () => {
    const current = null
    const mode = 'horizontal'
    const onNext = vi.fn();
    const instance = getInstance('bni-story', {
      current,
      mode,
      onNext,
    });
    const newProps = {
      current: 2,
      mode:'adads'
    };

    instance.setProps(newProps);

    // Check if selection is updated correctly
    expect(instance.getData().currentIndex).toBe(newProps.current);
    expect(instance.getData().mode).toBe(newProps.mode);
  });
  it('bni-story handle Next', () => {
    const current = 1
    const mode = 'horizontal'
    const onNext = vi.fn();
    const instance = getInstance('bni-story', {
      current,
      mode,
      onNext,
    });
    instance.callMethod('handleNext')
  });
  it('bni-story handle Previous', () => {
    const current = 1
    const mode = 'horizontal'
    const onPrev = vi.fn();
    const instance = getInstance('bni-story', {
      current,
      mode,
      onPrev,
    });
    instance.callMethod('handlePrev')
  });
  it('bni-story handle swiperChange', () => {
    const eventMock = {
      detail: {
        current: 1
      }
    };
    const current = 1
    const mode = 'horizontal'
    const onSwiperChange = vi.fn();
    const instance = getInstance('bni-story', {
      current,
      mode,
      onSwiperChange,
    });
    instance.callMethod('swiperChange',eventMock)
  });
  it('bni-story handleTouchStart  hold Story', () => {
    const current = 1
    const mode = 'horizontal'
    const onSwiperChange = vi.fn();
    const instance = getInstance('bni-story', {
      current,
      mode,
      onSwiperChange,
    });
    instance.callMethod('handleTouchStart')
    instance.setProps({
      animationState: 'paused',
      swiperAutoPlay: false ,
      pauseStartTime:  Date.now(),
    })
  });
  it('bni-story handleTouchEnd  hold Story', () => {
    const current = 1
    const mode = 'horizontal'
    const onSwiperChange = vi.fn();
    const instance = getInstance('bni-story', {
      current,
      mode,
      onSwiperChange,
    });
    instance.setProps({
      animationState: 'paused',
      autoPlay: false ,
      pauseStartTime:  Date.now(),
    })
    instance.callMethod('handleTouchEnd')
   
  });
  it('bni-story handleTouchEnd  hold Story when autoplay false', () => {
    const current = 1
    const mode = 'horizontal'
    const onSwiperChange = vi.fn();
    const instance = getInstance('bni-story', {
      current,
      mode,
      onSwiperChange,
    });
    instance.setProps({
      animationState: 'paused',
      autoPlay: true ,
      pauseStartTime:  Date.now(),
    })
    instance.callMethod('handleTouchEnd')
   
  });

});