import { vi } from 'vitest';
import './doughnut-diagram'

const currentPage = global.pageInstance;

describe("doughnut diagram component", () => {
  const pieChartData = {
    data: [20, 20, 20, 20, 20],
    color: [],
    iconUrls: [],
  };
  my.createCanvasContext = vi.fn(() => ({
    clearRect: vi.fn(),
    drawImage: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    draw: vi.fn((param1,callback) => {
      callback()
    }),
    setStrokeStyle: vi.fn(),
    stroke: vi.fn(),
  }));
  my.createSelectorQuery = vi.fn(() => ({
    select: vi.fn(() => ({
      boundingClientRect: vi.fn(() => ({
        exec: vi.fn((callback) => {
          callback([{ 
            height: 100,
            width: 100
          }])
        })
      }))
    }))
  }))
  
  currentPage.props = {
    data: pieChartData,
    isRedraw: false,
    onSelect: vi.fn()
  }
  currentPage.onInit();
  currentPage.didUpdate({});

  it("component data set correctly from props", () => {
    vi.spyOn(currentPage, 'drawPieChart');
    expect(currentPage.data.total).toStrictEqual(
      '100'
    );
    expect(currentPage.data.tempProps.data).toStrictEqual(
      pieChartData
    );
    // expect(currentPage.drawPieChart).toHaveBeenCalledWith(true)
  });
  it("when set isRedraw to true, call drawPieChart function", () => {
    currentPage.data.currentIndex = 1;
    currentPage.props.isRedraw = true;
    currentPage.didUpdate({});

    expect(currentPage.data.currentIndex).toStrictEqual(
      -1
    );
    expect(currentPage.drawPieChart).toHaveBeenCalledWith(true)
  });
  it("when set isRedraw to false", () => {
        vi.spyOn(currentPage, 'drawPieChart');

    currentPage.data.isShowLoding = true;
    currentPage.data.isDrawing = false;
    currentPage.props.isRedraw = false;
    currentPage.didUpdate({});

    expect(currentPage.data.isShowLoding).toStrictEqual(
      false
    );
  });
  it("handleCanvasClick", () => {
    currentPage.data.position = {
      width: 325,
      height: 325,
    };
    currentPage.methods.handleCanvasClick.call(currentPage,{
      detail: {
        x: 200,
        y: 100
      }
    })

    expect(currentPage.data.currentIndex).not.toBe(-1);
    expect(currentPage.props.onSelect).toHaveBeenCalledWith(currentPage.data.currentIndex);

    currentPage.methods.handleCanvasClick.call(currentPage,{
      detail: {
        x: 0,
        y: 0
      }
    })

    expect(currentPage.data.currentIndex).toBe(-1);
    expect(currentPage.props.onSelect).toHaveBeenCalledWith(currentPage.data.currentIndex);
  });
  it("should get positon when call handleCanvasClick with data.position.width is 0", () => {
    currentPage.data.position = {
      width: 0,
      height: 0,
    };
   
    currentPage.methods.handleCanvasClick.call(currentPage,{
      detail: {
        x: 200,
        y: 100
      }
    })
    expect(my.createSelectorQuery).toHaveBeenCalled();
  });
  it("when call drawChild with isdraw=true, call this.draw", () => {
    vi.spyOn(currentPage, 'draw');

    currentPage.methods.drawChild.call(currentPage, [1, 1, 1, 1, true, true]);
    expect(currentPage.draw).toHaveBeenCalled();

  });
  it("component unMount", () => {
    currentPage.didUnmount();
  })
});