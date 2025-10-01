import {
  describe,
  it,
  vi
} from "vitest";
import './loading'

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

describe('loading', () => {
  it('didUpdate', () => {
    const page = createPage(currentPage);
    const instance = page;
    instance.didUpdate();
  })
})