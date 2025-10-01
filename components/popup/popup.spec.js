import {
  describe,
  it,
  vi
} from "vitest";
import './popup'

const currentPage = global.pageInstance;

function createPage(Component) {
  return {
    data: Component.data,
    setData: vi.fn(),
    $page: {
      setData: vi.fn()
    },
    ...Component
  };
}

describe('popup', () => {
  it("initiate prop", () => {
    let initialProps = {
      title: String(),
      icon: String(),
      isOpen: Boolean(false),
      paragraph: String(),
      onClose: undefined,
    }
    currentPage.props = initialProps
  })

  it("didMount", () => {
    let initialProps = {
      title: String(),
      icon: String(),
      isOpen: Boolean(false),
      paragraph: String(),
      onClose: undefined,
    }
    currentPage.props = initialProps
    currentPage.didMount()
  })

  it("initiate prop", () => {
    let initialProps = {
      title: String(),
      icon: String(),
      isOpen: Boolean(false),
      paragraph: String(),
      onClose: Function(),
    }
    currentPage.props = initialProps
  })

  it('didMount', () => {
    const page = createPage(currentPage);
    const instance = page;
    instance.didUpdate({
      title: String(),
      icon: String(),
      isOpen: Boolean(false),
      paragraph: String(),
      onClose: undefined
    })
  })

  it("update different props", () => {
    const page = createPage(currentPage);
    const instance = page;
    instance.props
    instance.didUpdate({
      title: String('a'),
    }, {
      title: String('b'),
      onClose:undefined
    })
    instance.props.title = 'b'
    instance.props.onClose = undefined
    instance.didUpdate({
      title: String('b'),
      onClose:undefined
    }, {
      title: String('b'),
      onClose:undefined
    })
  })

  it('handleReload', () => {
    const page = createPage(currentPage);
    const instance = page;
    instance.props.onClose = undefined
    instance.methods.onClose.call(currentPage)
    instance.props.onClose = ()=>{}
    instance.methods.onClose.call(currentPage)
  })
})