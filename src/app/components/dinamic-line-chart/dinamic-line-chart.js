import F2 from '@antv/my-f2';
import util from '/src/utils/utilChart';
import {
  dateFormat
} from "/src/utils/date-util";
import {
  currencyFormat,
  percentageFormat
} from "/src/utils/currency-util";

/* JShield-obfus:enable */
Component({
  data: {
    currentDate: String(""),
    navValue: String(""),
    performanceValue: String(""),
    tooltipStatus: Boolean(false),
    prevPeriod: String(""),
    isVisible: Boolean(true),
    minIdx: Number(0),
    maxIdx: Number(0),
    startDate: String(''),
    endDate: String(''),
    isErrorReload: Boolean(false),
    isLoading: Boolean(false),
    height: Number(120),
    width: Number(327),
    pixelRatio: Number(2),
    isHideTime: Boolean(false)
  },
  props: {
    categories: Array([])
  },
  didMount() {
    const sys = (typeof my !== 'undefined' && my.getSystemInfoSync && my.getSystemInfoSync()) || {};
    const screenWidth = (sys && sys.windowWidth) || (getApp().globalData && getApp().globalData.screen && getApp().globalData.screen.width) || 375;
    const pixelRatio = (sys && sys.pixelRatio) || (getApp().globalData && getApp().globalData.pixelRatio) || 2;

    this.setData({
      width: Number(screenWidth) - 48,
      pixelRatio: Number(pixelRatio)
    });

    const {
      chartData
    } = this.props

    const currentDate = (chartData[chartData.length - 1].xValue)
    const latestPerformancePercentage = chartData[chartData.length - 1].ySecondaryValue
    const performanceValue = percentageFormat(latestPerformancePercentage, true)
    const isZero = latestPerformancePercentage === 0
    const isPositivePerformanceValue = latestPerformancePercentage >= 0

    this.setData({
      performanceValue,
      isZero,
      navValue: currencyFormat({
        value: chartData[chartData.length - 1].yValue
      }),
      currentDate,
      isPositivePerformanceValue
    })

    my.call('getStartupParams', {}, (result) => {
      util.tracert('line', result.appId, result.url);
    });

    const id = `am-mc-line-${this.$id}`;
    const ctx = this.ctx = my.createCanvasContext(id);
    const canvas = this.canvas = new F2.Renderer(ctx);

    this.chart = new F2.Chart({
      el: canvas,
      width: this.data.width,
      height: this.data.height,
      padding: [50, 30, 5, 5],
      pixelRatio: this.data.pixelRatio
    });

    this.render(this.chart, this.props, this.data.width, this.data.height);

  },
  didUpdate(prevProps) {
    const {
      chartData
    } = this.props
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      const latestPerformancePercentage = chartData[chartData.length - 1].ySecondaryValue
      const performanceValue = percentageFormat(latestPerformancePercentage, true)
      const isZero = latestPerformancePercentage === 0
      const isPositivePerformanceValue = latestPerformancePercentage >= 0
      const currentDate = (chartData[chartData.length - 1].xValue)
      this.setData({
        currentDate,
        navValue: currencyFormat({
          value: chartData[chartData.length - 1].yValue
        }),
        performanceValue,
        isZero,
        isPositivePerformanceValue
      })

      this.render(this.chart, this.props, this.data.width, this.data.height);
    }
  },
  methods: {
    changeValueData(dateAxisValue) {
      const {
        chartData
      } = this.props
      let currentDate = chartData.findIndex(el => el.xValue === dateAxisValue)
      const currentPerformanceValue = chartData[currentDate].ySecondaryValue
      const currentNavValue = chartData[currentDate].yValue
      const performanceValue = percentageFormat(currentPerformanceValue, true)
      const isZero = currentPerformanceValue === 0
      const isPositivePerformanceValue = currentPerformanceValue >= 0
      this.setData({
        currentDate: (dateAxisValue),
        navValue: currencyFormat({
          value: currentNavValue
        }),
        isZero,
        performanceValue,
        isPositivePerformanceValue
      })
    },
    render(chart, props, width, height) {
      if (!chart) {
        return
      }

      if (props.isError) {
        this.setData({
          isErrorReload: true,
        })
        return
      }

      const {
        chartData: allData
      } = props


      const startDate = allData[0] ? dateFormat(allData[0].historyDate, 'MMM YYYY') : ''
      const endDate = allData[0] ? dateFormat(allData[allData.length - 1].historyDate, 'MMM YYYY') : ''

      const minValue = Math.min(...allData.map(d => d.yValue));
      const maxValue = Math.max(...allData.map(d => d.yValue));

      this.setData({
        startDate,
        endDate
      })

      chart.clear();

      let data = [];
      data = [...allData].map((item) => {
        return {
          key: item.xValue,
          value: item.yValue,
        }
      })
      chart.source(data);
      chart.scale('value', {
        min: (minValue + (minValue < 0 ? Math.abs(minValue) : 0)), // adjust the y min axis
        max: (maxValue + (minValue < 0 ? Math.abs(minValue) : 0)), // adjust the y max axis
      })
      // y axis 
      chart.axis('value', {
        line: {
          lineWidth: 1 * this.data.pixelRatio,
          stroke: "transparent"
        },
        grid: {
          stroke: 'transparent'
        },
        label: () => {
          return {
            text: ''
          };
        }
      });
      // x axis
      chart.scale('key', {
        tickCount: 5 * this.data.pixelRatio
      })

      chart.axis('key', {
        line: {
          lineWidth: 1 * this.data.pixelRatio,
          stroke: "transparent"
        },
        grid: {
          stroke: 'transparent'
        },
        labelOffset: 5,
        label: () => {
          return {
            text: ''
          };
        }
      });

      chart.tooltip({
        showTitle: true,
        showCrosshairs: true,
        titleStyle: {
          fontSize: 12 * Math.ceil(this.data.pixelRatio),
          fill: '#4E4E4E',
          fontFamily: "TT Interphases Pro",
          fontWeight: 500,
        },
        background: '#ffffff',
        tooltipMarkerStyle: {
          radius: 3 * this.data.pixelRatio,
          lineWidth: 2 * this.data.pixelRatio
        },
        crosshairsStyle: {
          stroke: '#3AA8A0',
          lineWidth: 2 * this.data.pixelRatio,
        },
        valueStyle: {
          fontSize: 1,
          fill: '#ffffff',
        },
        nameStyle: {
          fontSize: 1,
          fill: '#ffffff',
        },
        showItemMarker: false,
        onChange: function (obj) {
          let x = obj.items[0].origin.key;
          // let y = obj.items[0].origin.value;
          this.changeValueData(x);
        }.bind(this),

        onShow: function (ev) {
          var items = ev.items;
          const title = items[0].title
          items[0].title = (title)
          this.testShowOn()
        }.bind(this),

        onHide: function () {
          this.testShowOff()
        }.bind(this),

        triggerOn: ['touchstart', 'touchmove'],
        triggerOff: 'touchend',
      });

      chart.area().position('key*value').color('l(90) 0:#3AA8A0 1:#71DBD3').shape("smooth");
      chart.line().position('key*value').color('#3AA8A0').shape("smooth").style({
        lineWidth: 2 * this.data.pixelRatio,
        width: width * this.data.pixelRatio
      });

      chart.changeSize(width * this.data.pixelRatio, height * this.data.pixelRatio);
    },
    testShowOn() {
      this.setData({
        isVisible: false
      })
    },
    testShowOff() {
      this.setData({
        isVisible: true
      })
    },
    touchStart(e) {
      if (this.canvas) {
        e.touches[0].x = e.touches[0].x * this.data.pixelRatio
        e.touches[0].y = e.touches[0].y * this.data.pixelRatio
        this.canvas.emitEvent('touchstart', [e]);
      }
      this.setData({
        isHideTime: true
      })
    },
    touchMove(e) {
      if (this.canvas) {
        e.touches[0].x = e.touches[0].x * this.data.pixelRatio
        e.touches[0].y = e.touches[0].y * this.data.pixelRatio
        this.canvas.emitEvent('touchmove', [e]);
      }
    },
    touchEnd(e) {
      if (this.canvas) {
        this.canvas.emitEvent('touchend', [e]);
      }
      const {
        chartData
      } = this.props
      const currentDate = (chartData[chartData.length - 1].xValue)
      const latestPerformancePercentage = chartData[chartData.length - 1].ySecondaryValue
      const performanceValue = percentageFormat(latestPerformancePercentage, true)
      const isZero = latestPerformancePercentage === 0
      const isPositivePerformanceValue = latestPerformancePercentage >= 0
      this.setData({
        navValue: currencyFormat({
          value: chartData[chartData.length - 1].yValue
        }),
        performanceValue,
        isPositivePerformanceValue,
        isHideTime: false,
        isZero,
        currentDate
      })
    },
    handleIconInfo(e) {
      this.props.onTapIconInfo(e)
    }
  },
});
/* JShield-obfus:disable */