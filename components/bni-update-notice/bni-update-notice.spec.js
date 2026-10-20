import { describe, it, expect } from 'vitest'
import { getInstance } from '../../configTest/utils'

describe('bni-update-notice component', () => {

  it('should initialize overlayNoticeVisible from props.popupVisible in didMount', () => {
    const instance = getInstance('bni-update-notice', {
      popupVisible: true,
      contentObj: {
        imgUrl: '',
        titleText: 'Test Title',
        contentText: 'Test Content',
        btnPrimaryText: 'Primary',
        btnSecondaryText: 'Secondary'
      },
      onHandleUpdate: () => {}
    })

    // Ensure overlayNoticeVisible reflects popupVisible initially
    expect(instance.getData().overlayNoticeVisible).toBe(true)
  })

  it('should update overlayNoticeVisible when popupVisible prop changes', () => {
    const instance = getInstance('bni-update-notice', {
      popupVisible: false,
      contentObj: {},
      onHandleUpdate: () => {}
    })

    // Simulate prop change
    instance.setProps({ popupVisible: true })

    expect(instance.getData().overlayNoticeVisible).toBe(true)
  })

  it('should hide popup when closeUpdateNotice is called', () => {
    const instance = getInstance('bni-update-notice', {
      popupVisible: true,
      contentObj: {},
      onHandleUpdate: () => {}
    })

    instance.callMethod('closeUpdateNotice')

    expect(instance.getData().overlayNoticeVisible).toBe(false)
  })

  it('should call onHandleUpdate with event when handleEvent is called', () => {
    const mockFn = vi.fn()
    const instance = getInstance('bni-update-notice', {
      popupVisible: true,
      contentObj: {},
      onHandleUpdate: mockFn
    })
  
    const mockEvent = { type: 'tap', detail: { someData: '123' } }
  
    instance.callMethod('handleEvent', mockEvent)
  
    expect(mockFn).toHaveBeenCalledWith(mockEvent)
  })
})
