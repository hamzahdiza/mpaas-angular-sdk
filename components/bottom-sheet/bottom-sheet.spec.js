import {
  describe,
  expect,
  it,
  vi
} from "vitest";

import './bottom-sheet';

const currentPage = global.pageInstance;
vi.mock('setTimeout')

describe("bottom sheet unit test", ()=> {
  beforeAll(()=>{
    currentPage.setData({
      isOpen: Boolean(false),
      startY: Number(),
      initialHeight: Number(0),
      currentHeight: Number(0),
      expandedHeight: Number(518),
      throttleTimeout: null,
      throttleDelay: Number(50)
    })
    const setTimeoutMock = vi.fn((fn) => fn());

  vi.stubGlobal('setTimeout', setTimeoutMock);
  })
  it("onLoad", ()=>{
    
    currentPage.didMount()
    expect(0).toBe(0)
  })

  it("initiate prop", ()=>{
    let initialProps = {
      isOpen: Boolean(false),
      isExpanded: Boolean(false),
      onClose: () => {}
    }


    currentPage.props = initialProps
  })

  it("update different props", ()=> {
    currentPage.didUpdate( {
      isOpen: true,
      isExpanded: true,
      onClose: vi.fn()
    },{
      isOpen: false,
      isExpanded: false,
      onClose: vi.fn()
    })

    currentPage.props.isOpen = true

    currentPage.didUpdate( {
      isOpen: true,
      isExpanded: true,
      onClose: vi.fn()
    },{
      isOpen: false,
      isExpanded: true,
      onClose: vi.fn()
    })

    currentPage.props.isExpanded = true

    currentPage.didUpdate( {
      isOpen: true,
      isExpanded: true,
      onClose: vi.fn()
    },{
      isOpen: false,
      isExpanded: true,
      onClose: vi.fn()
    })
  })

  it("update same props", ()=> {
    currentPage.didUpdate( {
      isOpen: Boolean(false),
      isExpanded: Boolean(false),
      onClose: () => {}
    },{
      isOpen: false,
    } )
  })

  it("touch", ()=> {
    let event = {
      touches: [{
        clientY:200
      }]
    }

    currentPage.touchStart(event)
    currentPage.touchMove(event)
    currentPage.touchEnd()
    
    event.touches[0].clientY = 500

    currentPage.touchStart(event)
    currentPage.setData({
      currentHeight:1000,
      throttleTimeout: 1
    })
    currentPage.touchMove(event)
    currentPage.touchEnd()
    
    currentPage.setData({
      currentHeight:0,
      throttleTimeout: 0
    })
    currentPage.touchEnd()

  })

  it("unmount", ()=>{
    currentPage.didUnmount()

    currentPage.props.onClose(()=>{})
  })
})