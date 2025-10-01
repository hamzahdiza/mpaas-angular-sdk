import { describe, it, vi } from "vitest";
import showPDF from "../show-PDF"


describe('show-PDF', () => {
  beforeAll(() => {
    my.call = vi.fn((param1, param2, callback) => {
      callback({})
    })
    my.downloadFile = vi.fn(({ success: callback1, fail: callback2, complete: callback3 }) => {
      callback1({ tempFilePath: 'tempFilePath' })
      callback2()
      callback3()
    })

    my.openDocument = vi.fn(({ success: callback1, fail: callback2, complete: callback3 }) => {
      callback1({})
      callback2()
      callback3()
    })

    my.request = vi.fn(({ success: callback1, fail: callback2, complete: callback3 }) => {
      callback1({data: 'pdfBase64String'})
      callback2()
      callback3()
    })
    
  })
  it('execute showPDF on Android', () => {
    getApp().globalData.nativeData.clientPlatform = 'android'
    showPDF('XX', global.Page({ data: {} }))
  })

  it('execute showPDF on IOS', () => {
    getApp().globalData.nativeData.clientPlatform = 'ios'
    showPDF('XX', global.Page({ data: {} }))
  })
})