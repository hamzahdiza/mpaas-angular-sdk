import { describe, expect, it, vi } from 'vitest'
import './native-need-update'

const currentPage = global.pageInstance

my.call = vi.fn((p1, p2, callback) => { callback({}) })

function createPage(Component) {
  return {
    data: Component.data,
    setData: vi.fn(),
    $page: {
      setData: vi.fn()
    },
    ...Component
  }
}

describe('test for native-need-update', () => {
  it('should set currentFeatureCom and define nativeNeeUpdateFunc on didMount', async () => {
    const page = createPage(currentPage)
    const instance = page

    global.getApp = () => ({
      globalData: {
        languagePack: { message: 'Update needed' },
        nativeData: { userAgent: 'android' }
      }
    })

    instance.didMount()

    expect(my.nativeNeeUpdateFunc).toBeDefined()

    const mockCurrentFeatureCom = {
      setData: vi.fn(),
      $page: {
        setData: vi.fn()
      }
    }

    global.getCurrentPages = vi.fn(() => [{ currentFeatureCom: mockCurrentFeatureCom }])

    my.nativeNeeUpdateFunc(true)

    expect(my.call).toHaveBeenCalledWith("enableSwipe", { isSwipe: false }, expect.any(Function))

    // Tunggu timeout
    await new Promise(resolve => setTimeout(resolve, 350))

    expect(mockCurrentFeatureCom.setData).toHaveBeenCalledWith({
      nativeUpdateModal: true,
      lang: { message: 'Update needed' }
    })
  })

  it('should call openURL with correct Android URL on onClickUpdate', () => {
    const instance = createPage(currentPage)

    global.getApp = () => ({
      globalData: {
        nativeData: { userAgent: 'android' }
      }
    })

    const mockConfig = {
      'mpaas.mobile.app.defaultAndroidStoreDeeplink': 'https://play.google.com/update',
      'mpaas.mobile.app.defaultIosStoreDeeplink': 'https://apps.apple.com/update'
    }

    my.call = vi.fn((method, options) => {
      if (method === 'getAppConfig') {
        options.success(mockConfig)
      }
    })

    instance.methods.onClickUpdate.call(instance)

    expect(my.call).toHaveBeenCalledWith("openURL", {
      url: 'https://play.google.com/update'
    })
  })

  it('should call openURL with correct iOS URL on onClickUpdate', () => {
    const instance = createPage(currentPage)

    global.getApp = () => ({
      globalData: {
        nativeData: { userAgent: 'iOS' }
      }
    })

    const mockConfig = {
      'mpaas.mobile.app.defaultAndroidStoreDeeplink': 'https://play.google.com/update',
      'mpaas.mobile.app.defaultIosStoreDeeplink': 'https://apps.apple.com/update'
    }

    my.call = vi.fn((method, options) => {
      if (method === 'getAppConfig') {
        options.success(mockConfig)
      }
    })

    instance.methods.onClickUpdate.call(instance)

    expect(my.call).toHaveBeenCalledWith("openURL", {
      url: 'https://apps.apple.com/update'
    })
  })

  it('should close modal on onCloseOverlay', () => {
    const instance = createPage(currentPage)

    const mockCurrentFeatureCom = {
      setData: vi.fn()
    }

    global.getCurrentPages = vi.fn(() => [{ currentFeatureCom: mockCurrentFeatureCom }])

    instance.methods.onCloseOverlay.call(instance)

    expect(mockCurrentFeatureCom.setData).toHaveBeenCalledWith({
      nativeUpdateModal: false
    })
  })

  it('test other empty functions', () => {
    currentPage.didUpdate()
    currentPage.didUnmount()
  })
})
