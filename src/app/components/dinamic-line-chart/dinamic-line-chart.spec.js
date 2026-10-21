import {
  describe,
  it,
  vi
} from 'vitest';
import './dinamic-line-chart'
import util from '/src/utils/utilChart';

global.F2 = {
  Renderer: vi.fn().mockImplementation(() => ({
    render: vi.fn(),
    chart: vi.fn(),
  })),
  Chart: vi.fn().mockImplementation(() => ({
    clear: vi.fn(),
    source: vi.fn(),
    scale: vi.fn(),
    axis: vi.fn(),
    tooltip: vi.fn((config) => {
      // Simulate triggering `onChange`, `onShow`, and `onHide`
      if (config.onChange) {

        config.onChange({
          items: [{ title: 'MockTitle', value: 'MockValue' }]
        });
      }
      if (config.onShow) {
        config.onShow();
      }
      if (config.onHide) {
        config.onHide();
      }
    }),
    area: vi.fn(),
    line: vi.fn(),
    changeSize: vi.fn(),
  })),
};

const mockData = {}
mockData["appId"] = 'test'
mockData["url"] = 'test'
my.call = vi.fn((param1, param2, callback) => {
  callback(mockData)
})

my.createCanvasContext = vi.fn()
vi.spyOn(util, 'tracert')

const mockCanvasContext = {
  scale: vi.fn(),
  fillText: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
};

global.my = {
  call: vi.fn(),
  createCanvasContext: vi.fn(() => mockCanvasContext),
  getSystemInfoSync: vi.fn().mockReturnValue({
    pixelRatio: 2
  }),
  createSelectorQuery: vi.fn().mockReturnValue({
    select: vi.fn().mockReturnThis(),
    boundingClientRect: vi.fn().mockReturnThis(),
    exec: vi.fn().mockImplementation((cb) => {
      cb([{
        width: 200,
        height: 100
      }]); // Mocking query result
    }),
  }),
};


vi.mock("../../../utils/date-util", () => ({
  dateFormat: vi.fn().mockReturnValue('01 Jan 2022'),
}));

vi.mock("../../../utils/currency-util", () => ({
  currencyFormat: vi.fn().mockReturnValue('IDR 1,000,000'),
}));

vi.mock("../../../utils/currency-util", () => ({
  currencyFormat: vi.fn().mockReturnValue('IDR 1,000,000'),
  percentageFormat: vi.fn().mockReturnValue('+10%')
}));


const mockAreaLine = {
  position: vi.fn().mockReturnThis(),
  color: vi.fn().mockReturnThis(),
  shape: vi.fn().mockReturnThis(),
  style: vi.fn().mockReturnThis(),
};

const mockChart = {
  clear: vi.fn(),
  source: vi.fn(),
  scale: vi.fn(),
  axis: vi.fn(),
  tooltip: vi.fn(),
  area: vi.fn().mockReturnValue(mockAreaLine),
  line: vi.fn().mockReturnValue(mockAreaLine),
  changeSize: vi.fn(),
};

function createPage(Component) {
  return {
    data: Component.data,
    setData: vi.fn(),
    $page: {
      setData: vi.fn()
    },
    ...Component,
    ctx: {
      scale: vi.fn()
    },
    canvas: {
      emitEvent: vi.fn()
    }
  };
}

const currentPage = global.pageInstance;
const initialProps = {
  leftTitle:"",
  rightTitle:"",
  chartData: [{
        "xValue": "2022-01-01",
        "yValue": -1636,
        "ySecondaryValue": -5.7
      },
      {
        "xValue": "2022-01-02",
        "yValue": 1594,
        "ySecondaryValue": 4.0,
      }
    ]
}

describe('Component', () => {
  it('should handle data correctly in didMount', () => {
    getApp().globalData.screen = {}
    getApp().globalData.screen['width'] = 100
    getApp().globalData.pixelRatio = 100
    const instance = createPage(currentPage);
    instance.props = JSON.parse(JSON.stringify(initialProps))
    instance.props['onTapIconInfo'] = vi.fn()
    instance.didMount();
    instance.handleIconInfo();
  });

  it('should handle data correctly in didUpdate', () => {
    const instance = createPage(currentPage);
    const prevProps = JSON.parse(JSON.stringify(initialProps))
    instance.props = JSON.parse(JSON.stringify(initialProps))
    instance.didUpdate();
    instance.didUpdate(prevProps);
  });

  it('should render chart correctly', () => {
    const instance = createPage(currentPage);
    let mockProps = JSON.parse(JSON.stringify(initialProps))
    instance.props = JSON.parse(JSON.stringify(initialProps))
    instance.render(mockChart, mockProps, 200, 100)
    mockProps.chartData = []
    instance.render(mockChart, mockProps, 200, 100)
    instance.render(mockChart, mockProps, 200, 100)
  })

  it('should handle blank data correctly in changeValueData', () => {
    const instance = createPage(currentPage);
    instance.props = JSON.parse(JSON.stringify(initialProps))
    instance.data = {
      leftTitle:"",
      rightTitle:"",
      chartData: [{
            "xValue": "2022-01-01",
            "yValue": -1636,
            "ySecondaryValue": -5.7
          },
          {
            "xValue": "2022-01-02",
            "yValue": 1594,
            "ySecondaryValue": 4.0,
          }
        ]
    }
    instance.props = {
      chartData: [{
            "xValue": "2022-01-01",
            "yValue": -1636,
            "ySecondaryValue": -5.7
          },
          {
            "xValue": "2022-01-02",
            "yValue": 1594,
            "ySecondaryValue": 4.0,
          }
        ]
    }
    let x = "2022-01-01"
    instance.changeValueData(x);
  });

  it('should handle blank data correctly in test show ff', () => {
    const instance = createPage(currentPage);
    instance.props = JSON.parse(JSON.stringify(initialProps))
    instance.testShowOff();
  });

  it('should handle blank data correctly in test show on', () => {
    const instance = createPage(currentPage);
    instance.props = JSON.parse(JSON.stringify(initialProps))
    instance.testShowOn();
  });
  it("other functions", () => {
    const instance = createPage(currentPage);
    instance.props = JSON.parse(JSON.stringify(initialProps))
    const e = {touches:[{x:1,y:1}]}
    instance.touchStart(e);
    instance.touchMove(e);
    instance.touchEnd(e);
    instance.canvas = false;
    instance.touchStart(e);
    instance.touchMove(e);
    instance.touchEnd(e);
  })
});