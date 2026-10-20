import {
  describe,
  it,
} from 'vitest';
import {
  getInstance
} from '../../configTest/utils';

const my = {}
my['canIUse'] = ()=>{return true}
my['vibrateShort'] = ()=>{}
const getApp = () => {
  return {
    globalData: {
      nativeData: {
        language: 'id'
      }
    }
  }
}

describe('bni-keyboard', () => {
  it("initiate prop", () => {
    let props = {}
    props['language'] = 'en'
    let instance = getInstance('bni-keyboard', props, my, getApp);
    let e = {}
    e['currentTarget'] = {}
    e.currentTarget['dataset'] = {}
    e.currentTarget.dataset['key'] = 1
    instance.callMethod('handlePressDownNumber', e)
    props['language'] = 'id'
    instance.setProps(props)
    e.currentTarget.dataset['key'] = 'del'
    instance.callMethod('handlePressDownNumber', e)
    instance.callMethod('handleHide')
    instance.callMethod('vibrate')
    props['data-key'] = 1
    instance.setProps(props)
    instance.callMethod('handleTest')
    props['type'] = 'numeric'
    instance.setProps(props)
    instance.callMethod('handlePressDownNumber', e)
    e = ''
    instance.callMethod('handlePressDownNumber', e)
  })
})