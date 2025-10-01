import { describe, it, vi, expect } from 'vitest'
import callJsApi from '../callJsApi'

describe('callJsApi', () => {
  it('should call my.call with given method and object', () => {
    const mockCall = vi.fn()
    const mockUpdateFunc = vi.fn()

    global.my = {
      call: mockCall,
      nativeNeeUpdateFunc: mockUpdateFunc
    }

    const method = 'testMethod'
    const obj = { key: 'value' }

    // Simulasi pemanggilan callJsApi
    callJsApi(method, obj)

    // Validasi bahwa my.call dipanggil dengan benar
    expect(mockCall).toHaveBeenCalled()
    expect(mockCall).toHaveBeenCalledWith(method,obj ,expect.objectContaining({
      success: expect.any(Function)
    }))
  })

  it('should call nativeNeeUpdateFunc if res is falsy', () => {
    const mockUpdateFunc = vi.fn()

    global.my = {
      call: (method, {},{ success }) => success(null),
      nativeNeeUpdateFunc: mockUpdateFunc
    }

    callJsApi('testMethod', { key: 'value' })

    expect(mockUpdateFunc).toHaveBeenCalledWith(true)
  })

  it('should NOT call nativeNeeUpdateFunc if res is truthy', () => {
    const mockUpdateFunc = vi.fn()

    global.my = {
      call: (method, {},{ success }) => success({ some: 'data' }),
      nativeNeeUpdateFunc: mockUpdateFunc
    }

    callJsApi('testMethod', { key: 'value' })

    expect(mockUpdateFunc).not.toHaveBeenCalled()
  })
})
