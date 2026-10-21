import F2 from '@antv/my-f2';
import util from '../../src/utils/utilChart.js';
import {
  dateFormat
} from "../../src/utils/date-util.js";
import {
  currencyFormat,
  percentageFormat
} from "../../src/utils/currency-util.js";

Component({
  data: {
    canvasId: 'am-mc-line-gold',
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
    height: Number(140),
    width: Number(327),
    pixelRatio: Number(2),
    isHideTime: Boolean(false)
  },
  props: {
    categories: Array([]),
    chartData: Array([]),
    leftTitle: 'Performa',
    rightTitle: 'Harga Emas',
    timeLeftTitle: '',
    onTapIconInfo: () => {}
  },
  didMount() {
    const sys = (typeof my !== 'undefined' && my.getSystemInfoSync && my.getSystemInfoSync()) || {};
    const screenWidth = (sys && sys.windowWidth) || (getApp().globalData && getApp().globalData.screen && getApp().globalData.screen.width) || 375;
    const pixelRatio = (sys && sys.pixelRatio) || (getApp().globalData && getApp().globalData.pixelRatio) || 2;
    const canvasId = `am-mc-line-${this.$id || 'gold'}`;
    const width = Number(screenWidth) - 48;
    const height = 140;

    this.setData({
      canvasId,
      width,
      height,
      pixelRatio
    });

    this.updateStats();

    try {
      if (typeof my !== 'undefined' && my.call) {
        my.call('getStartupParams', {}, (result) => {
          if (util && util.tracert) {
            util.tracert('line', result.appId, result.url);
          }
        });
      }
    } catch (e) {}

    setTimeout(() => {
      this.drawChart();
    }, 100);
  },
  didUpdate(prevProps) {
    if (JSON.stringify(prevProps.chartData) !== JSON.stringify(this.props.chartData)) {
      this.updateStats();
      setTimeout(() => {
        this.drawChart();
      }, 50);
    }
  },
  methods: {
    updateStats() {
      const { chartData } = this.props;
      if (!chartData || chartData.length === 0) return;

      const last = chartData[chartData.length - 1];
      const currentDate = last.xValue || '';
      const latestPerformancePercentage = last.ySecondaryValue || 0;
      const performanceValue = percentageFormat(latestPerformancePercentage, true);
      const isZero = latestPerformancePercentage === 0;
      const isPositivePerformanceValue = latestPerformancePercentage >= 0;

      const startDate = chartData[0] ? (chartData[0].xValue || (chartData[0].historyDate && dateFormat(chartData[0].historyDate, 'MMM YYYY')) || '') : '';
      const endDate = last ? (last.xValue || (last.historyDate && dateFormat(last.historyDate, 'MMM YYYY')) || '') : '';

      this.setData({
        performanceValue,
        isZero,
        navValue: currencyFormat({
          value: last.yValue
        }).currencyString || `Rp ${Number(last.yValue).toLocaleString('id-ID')}`,
        currentDate,
        isPositivePerformanceValue,
        startDate,
        endDate
      });
    },

    changeValueData(dateAxisValue) {
      const { chartData } = this.props;
      if (!chartData || chartData.length === 0) return;
      const index = chartData.findIndex(el => el.xValue === dateAxisValue);
      if (index === -1) return;
      const current = chartData[index];
      const currentPerformanceValue = current.ySecondaryValue || 0;
      const currentNavValue = current.yValue;
      const performanceValue = percentageFormat(currentPerformanceValue, true);
      const isZero = currentPerformanceValue === 0;
      const isPositivePerformanceValue = currentPerformanceValue >= 0;

      this.setData({
        currentDate: dateAxisValue,
        navValue: currencyFormat({
          value: currentNavValue
        }).currencyString || `Rp ${Number(currentNavValue).toLocaleString('id-ID')}`,
        isZero,
        performanceValue,
        isPositivePerformanceValue
      });
    },

    drawChart() {
      const { chartData } = this.props;
      if (!chartData || chartData.length === 0) return;

      const id = this.data.canvasId;
      let ctx = null;
      try {
        ctx = my.createCanvasContext(id, { page: this.$page });
      } catch (e) {}
      if (!ctx) {
        ctx = my.createCanvasContext(id);
      }
      if (!ctx) return;
      this.ctx = ctx;

      let f2Success = false;
      if (F2 && F2.Chart) {
        try {
          if (!this.chart) {
            const canvas = this.canvas = new (F2.Renderer || function(c) { return c; })(ctx);
            this.chart = new F2.Chart({
              el: canvas,
              width: this.data.width,
              height: this.data.height,
              padding: [40, 20, 10, 10],
              pixelRatio: this.data.pixelRatio
            });
          }
          this.renderF2(this.chart, this.props, this.data.width, this.data.height);
          f2Success = true;
        } catch (err) {
          f2Success = false;
        }
      }

      // Only draw fallback if F2 is not available or threw an error
      if (!f2Success) {
        this.renderFallbackCurve(ctx, chartData, this.data.width, this.data.height, this.data.pixelRatio);
      }
    },

    renderF2(chart, props, width, height) {
      if (!chart) return;
      if (props.isError) {
        this.setData({ isErrorReload: true });
        return;
      }

      const allData = props.chartData || [];
      if (allData.length === 0) return;

      const minValue = Math.min(...allData.map(d => d.yValue));
      const maxValue = Math.max(...allData.map(d => d.yValue));

      chart.clear();

      const data = allData.map(item => ({
        key: item.xValue,
        value: item.yValue
      }));

      chart.source(data);
      chart.scale('value', {
        min: minValue * 0.995,
        max: maxValue * 1.005
      });

      chart.axis('value', {
        line: { lineWidth: 1, stroke: "transparent" },
        grid: { stroke: 'transparent' },
        label: () => ({ text: '' })
      });

      chart.scale('key', {
        tickCount: 5
      });

      chart.axis('key', {
        line: { lineWidth: 1, stroke: "transparent" },
        grid: { stroke: 'transparent' },
        labelOffset: 5,
        label: () => ({ text: '' })
      });

      chart.tooltip({
        showTitle: true,
        showCrosshairs: true,
        titleStyle: {
          fontSize: 12 * Math.ceil(this.data.pixelRatio),
          fill: '#4E4E4E',
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
        valueStyle: { fontSize: 1, fill: '#ffffff' },
        nameStyle: { fontSize: 1, fill: '#ffffff' },
        showItemMarker: false,
        onChange: (obj) => {
          if (obj && obj.items && obj.items[0]) {
            const x = obj.items[0].origin.key;
            this.changeValueData(x);
          }
        },
        triggerOn: ['touchstart', 'touchmove'],
        triggerOff: 'touchend'
      });

      chart.area().position('key*value').color('l(90) 0:#3AA8A0 1:#71DBD3').shape("smooth");
      chart.line().position('key*value').color('#3AA8A0').shape("smooth").style({
        lineWidth: 2 * this.data.pixelRatio,
        width: width * this.data.pixelRatio
      });

      chart.changeSize(width * this.data.pixelRatio, height * this.data.pixelRatio);
      if (typeof chart.render === 'function') {
        chart.render();
      }
    },

    renderFallbackCurve(ctx, data, width, height, pixelRatio) {
      if (!ctx || !data || data.length === 0) return;
      const pad = { top: 25, right: 20, bottom: 25, left: 20 };
      const w = width - pad.left - pad.right;
      const h = height - pad.top - pad.bottom;

      const values = data.map(d => Number(d.yValue || 0));
      const minVal = Math.min(...values);
      const maxVal = Math.max(...values);
      const range = (maxVal - minVal) || 1;

      const points = data.map((d, i) => {
        const x = pad.left + (i / (data.length - 1)) * w;
        const y = pad.top + h - ((d.yValue - minVal) / range) * h;
        return { x, y, ...d };
      });

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Subtle horizontal baseline
      ctx.beginPath();
      ctx.moveTo(pad.left, pad.top + h);
      ctx.lineTo(pad.left + w, pad.top + h);
      ctx.setStrokeStyle('#E2E8F0');
      ctx.setLineWidth(1);
      ctx.stroke();

      // Smooth Gradient Fill
      ctx.beginPath();
      ctx.moveTo(points[0].x, pad.top + h);
      ctx.lineTo(points[0].x, points[0].y);
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cpX = (p0.x + p1.x) / 2;
        ctx.bezierCurveTo(cpX, p0.y, cpX, p1.y, p1.x, p1.y);
      }
      ctx.lineTo(points[points.length - 1].x, pad.top + h);
      ctx.closePath();
      try {
        const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + h);
        grad.addColorStop(0, 'rgba(58, 168, 160, 0.40)');
        grad.addColorStop(1, 'rgba(58, 168, 160, 0.02)');
        ctx.setFillStyle(grad);
      } catch (e) {
        ctx.setFillStyle('rgba(58, 168, 160, 0.20)');
      }
      ctx.fill();

      // Smooth Line Stroke
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cpX = (p0.x + p1.x) / 2;
        ctx.bezierCurveTo(cpX, p0.y, cpX, p1.y, p1.x, p1.y);
      }
      ctx.setStrokeStyle('#008A80');
      ctx.setLineWidth(3);
      ctx.setLineCap('round');
      ctx.setLineJoin('round');
      ctx.stroke();

      // Pulse Indicator Dot on last point
      const last = points[points.length - 1];
      ctx.beginPath();
      ctx.arc(last.x, last.y, 6, 0, 2 * Math.PI);
      ctx.setFillStyle('rgba(0, 138, 128, 0.25)');
      ctx.fill();

      ctx.beginPath();
      ctx.arc(last.x, last.y, 4, 0, 2 * Math.PI);
      ctx.setFillStyle('#008A80');
      ctx.fill();

      ctx.beginPath();
      ctx.arc(last.x, last.y, 2, 0, 2 * Math.PI);
      ctx.setFillStyle('#FFFFFF');
      ctx.fill();

      ctx.draw();
      this.points = points;
    },

    handleTouch(e) {
      if (!e || !e.touches || !e.touches[0]) return;
      const touch = e.touches[0];
      const clientX = touch.x !== undefined ? touch.x : touch.clientX;
      if (this.points && this.points.length > 0) {
        let closest = this.points[0];
        let minDist = Infinity;
        for (const pt of this.points) {
          const dist = Math.abs(pt.x - clientX);
          if (dist < minDist) {
            minDist = dist;
            closest = pt;
          }
        }
        if (closest && closest.xValue) {
          this.changeValueData(closest.xValue);
        }
      }
    },

    touchStart(e) {
      if (this.canvas && this.canvas.emitEvent) {
        e.touches[0].x = e.touches[0].x * this.data.pixelRatio;
        e.touches[0].y = e.touches[0].y * this.data.pixelRatio;
        this.canvas.emitEvent('touchstart', [e]);
      }
      this.handleTouch(e);
      this.setData({ isHideTime: true });
    },

    touchMove(e) {
      if (this.canvas && this.canvas.emitEvent) {
        e.touches[0].x = e.touches[0].x * this.data.pixelRatio;
        e.touches[0].y = e.touches[0].y * this.data.pixelRatio;
        this.canvas.emitEvent('touchmove', [e]);
      }
      this.handleTouch(e);
    },

    touchEnd(e) {
      if (this.canvas && this.canvas.emitEvent) {
        this.canvas.emitEvent('touchend', [e]);
      }
      const { chartData } = this.props;
      if (!chartData || chartData.length === 0) return;
      const last = chartData[chartData.length - 1];
      const currentDate = last.xValue;
      const latestPerformancePercentage = last.ySecondaryValue;
      const performanceValue = percentageFormat(latestPerformancePercentage, true);
      const isZero = latestPerformancePercentage === 0;
      const isPositivePerformanceValue = latestPerformancePercentage >= 0;

      this.setData({
        navValue: currencyFormat({
          value: last.yValue
        }).currencyString || `Rp ${Number(last.yValue).toLocaleString('id-ID')}`,
        performanceValue,
        isPositivePerformanceValue,
        isHideTime: false,
        isZero,
        currentDate
      });
    },

    handleIconInfo(e) {
      if (typeof this.props.onTapIconInfo === 'function') {
        this.props.onTapIconInfo(e);
      }
    }
  }
});