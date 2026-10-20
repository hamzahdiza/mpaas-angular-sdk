import {
  describe,
  it,
} from 'vitest';
import {
  getInstance
} from '../../configTest/utils';
const my = {}
my['getSystemInfoSync'] = vi.fn()
my.getSystemInfoSync = ()=>({
  safeArea: {
    top: 100,
    bottom: 100
  },
  screen: {
    height: 800
  }
})

describe('popup', () => {
  it("initiate prop", () => {
    let initialProps = {
      onClose: undefined,
      safeArea: true,
    }
    const instance = getInstance('bni-popup', initialProps, my);
    instance.callMethod('onClose');
    initialProps.onClose = () => {}
    instance.setProps(initialProps)
    instance.callMethod('onClose');
  })

  it("onScroll", () => {
    let initialProps = {
      title: String(),
      icon: String(),
      isOpen: Boolean(false),
      paragraph: String(),
      onClose: undefined,
    }
    const instance = getInstance('bni-popup', initialProps, my);
    instance.callMethod('onScroll', {
      detail: {
        topScroll: 100
      }
    });
  })

  it("didUpdate", () => {
    let initialProps = {
      title: String(),
      icon: String(),
      isOpen: Boolean(false),
      paragraph: String(),
      safeArea: true,
    }
    const instance = getInstance('bni-popup', initialProps, my);
    instance.setProps(initialProps)
    const newProps = {
      onClose: 'test',
      safeArea: true,
    }
    instance.setProps(newProps)
  })

  it("onTapCTA1", () => {
    let initialProps = {
      onTapCTA1: () => {}
    }
    const instance = getInstance('bni-popup', initialProps, my);
    instance.callMethod('onTapCTA1', {
      detail: {
        topScroll: 100
      }
    })
    initialProps.onTapCTA1 =  false
    instance.setProps(initialProps)
    instance.callMethod('onTapCTA1', {
      detail: {
        topScroll: 100
      }
    })
  })

  it("onTapCTA2", () => {
    let initialProps = {
      onTapCTA2: () => {}
    }
    const instance = getInstance('bni-popup', initialProps, my);
    instance.callMethod('onTapCTA2', {
      detail: {
        topScroll: 100
      }
    })
    initialProps.onTapCTA2 =  false
    instance.setProps(initialProps)
    instance.callMethod('onTapCTA2', {
      detail: {
        topScroll: 100
      }
    })
  })

  it("onTapCTA3", () => {
    let initialProps = {
      onTapCTA3: () => {}
    }
    const instance = getInstance('bni-popup', initialProps, my);
    instance.callMethod('onTapCTA3', {
      detail: {
        topScroll: 100
      }
    })
    initialProps.onTapCTA3 =  false
    instance.setProps(initialProps)
    instance.callMethod('onTapCTA3', {
      detail: {
        topScroll: 100
      }
    })
  })

  it("onScrollToBottom", () => {
    let initialProps = {
      onTapCTA3: () => {}
    }
    const instance = getInstance('bni-popup', initialProps, my);
    instance.callMethod('onScrollToBottom')
  })
})