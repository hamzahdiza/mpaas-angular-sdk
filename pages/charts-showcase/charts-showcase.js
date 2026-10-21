import {
  MOCK_GOLD_PERIODS,
  MOCK_GOLD_CHART_DATA,
  MOCK_DOUGHNUT_DATA,
  MOCK_MONTHLY_BARS,
  MOCK_EXPENSE_CATEGORIES_BARS
} from './mockChartData';

Page({
  data: {
    activeTab: 'line', // 'line' | 'doughnut' | 'barchart' | 'cashflow'
    tabs: [
      { id: 'line', label: 'Gold Line', icon: '📈' },
      { id: 'doughnut', label: 'Doughnut', icon: '🍩' },
      { id: 'barchart', label: 'Bar Chart', icon: '📊' },
      { id: 'cashflow', label: 'Cashflow', icon: '💳' }
    ],

    // 1. Line Chart Data (Gold)
    selectedPeriod: '1B',
    periods: MOCK_GOLD_PERIODS,
    goldChartData: MOCK_GOLD_CHART_DATA['1B'],
    goldPriceType: 'BELI', // 'BELI' or 'JUAL'
    currentPriceDisplay: 'Rp 1.438.000',
    currentReturnDisplay: '+3.08%',
    isPositiveReturn: true,

    // 2. Doughnut Diagram Data
    doughnutData: MOCK_DOUGHNUT_DATA,
    selectedSlice: null,
    totalPortfolioDisplay: MOCK_DOUGHNUT_DATA.totalPortfolio,
    doughnutRedraw: false,

    // 3. Bar Chart Data
    barChartMode: 'multiple-bars',
    barChartType: 'transaction',
    monthlyBars: MOCK_MONTHLY_BARS,
    expenseCategoryBars: MOCK_EXPENSE_CATEGORIES_BARS,
    activeBarIndex: 2,
    activeBarSummary: 'Juli: Rp 16,5 Jt (Pemasukan)',

    // 4. Cashflow Scenarios Data
    cashflowScenario: 'surplus',
    activeCashflowData: {
      inflowTotalAmount: 185000000,
      outflowTotalAmount: 112450000
    },
    cashflowSummary: {
      surplusAmount: 'Rp 72.550.000',
      savingRate: '39.2%',
      statusText: 'Surplus Sehat'
    },

    // Global mock setup
    statusBarHeight: 20
  },

  onLoad() {
    const sys = (typeof my !== 'undefined' && my.getSystemInfoSync && my.getSystemInfoSync()) || {};
    const statusBarHeight = (sys && sys.statusBarHeight) || 20;

    // Populate globalData if not present
    if (!getApp().globalData) {
      getApp().globalData = {};
    }
    if (!getApp().globalData.screen) {
      getApp().globalData.screen = {
        width: (sys && sys.windowWidth) || 375,
        height: (sys && sys.windowHeight) || 812
      };
    }
    if (!getApp().globalData.pixelRatio) {
      getApp().globalData.pixelRatio = (sys && sys.pixelRatio) || 2;
    }
    if (!getApp().globalData.languagePack) {
      getApp().globalData.languagePack = {
        goldPriceDetailScreenPerformanceHargaTitle: 'Harga Emas Hari Ini',
        yearEndReviewSlide2CashflowPositiveTitle: 'Arus Kas Kamu Positif di Tahun 2026',
        yearEndReviewSlide2CashflowPositiveDesc: 'Pemasukan kamu lebih besar daripada pengeluaran. Pertahankan performa keuangan sehat ini!',
        yearEndReviewSlide2CashflowNegativeTitle: 'Arus Kas Kamu Defisit di Tahun 2026',
        yearEndReviewSlide2CashflowNegativeDesc: 'Pengeluaran melebihi pemasukan tahun ini. Evaluasi dan rapikan pos pengeluaran berkala kamu.',
        yearEndReviewSlide2CashflowBalanceTitle: 'Arus Kas Kamu Seimbang di Tahun 2026',
        yearEndReviewSlide2CashflowBalanceDesc: 'Pemasukan dan pengeluaran kamu berada pada titik impas seimbang.',
        yearEndReviewSlide2CashflowPercentageIncomeLabel: 'Total Pemasukan',
        yearEndReviewSlide2CashflowPercentageExpenseLabel: 'Total Pengeluaran'
      };
    }

    this.setData({
      statusBarHeight,
      goldChartData: MOCK_GOLD_CHART_DATA[this.data.selectedPeriod] || MOCK_GOLD_CHART_DATA['1B']
    });
  },

  handleBack() {
    my.navigateBack({
      fallback: '/src/app/pages/landing/landing'
    });
  },

  onSelectTab(e) {
    const tabId = e.currentTarget.dataset.id;
    this.setData({
      activeTab: tabId
    });

    if (tabId === 'doughnut') {
      this.setData({ doughnutRedraw: true });
      setTimeout(() => {
        this.setData({ doughnutRedraw: false });
      }, 300);
    }
  },

  // Line Chart Handlers
  onSelectPeriod(e) {
    const period = e.currentTarget.dataset.period;
    let chartData = MOCK_GOLD_CHART_DATA[period] || MOCK_GOLD_CHART_DATA['1B'];
    
    // Adjust if Jual/Buyback
    if (this.data.goldPriceType === 'JUAL') {
      chartData = chartData.map(d => ({
        ...d,
        yValue: Math.round(d.yValue * 0.92)
      }));
    }

    const lastItem = chartData[chartData.length - 1];
    const isPositiveReturn = (lastItem.ySecondaryValue || 0) >= 0;

    this.setData({
      selectedPeriod: period,
      goldChartData: chartData,
      currentPriceDisplay: `Rp ${Number(lastItem.yValue).toLocaleString('id-ID')}`,
      currentReturnDisplay: `${isPositiveReturn ? '+' : ''}${lastItem.ySecondaryValue}%`,
      isPositiveReturn
    });
  },

  togglePriceType(e) {
    const type = e.currentTarget.dataset.type;
    let chartData = MOCK_GOLD_CHART_DATA[this.data.selectedPeriod] || MOCK_GOLD_CHART_DATA['1B'];
    
    if (type === 'JUAL') {
      chartData = chartData.map(d => ({
        ...d,
        yValue: Math.round(d.yValue * 0.92)
      }));
    }

    const lastItem = chartData[chartData.length - 1];
    const isPositiveReturn = (lastItem.ySecondaryValue || 0) >= 0;

    this.setData({
      goldPriceType: type,
      goldChartData: chartData,
      currentPriceDisplay: `Rp ${Number(lastItem.yValue).toLocaleString('id-ID')}`,
      currentReturnDisplay: `${isPositiveReturn ? '+' : ''}${lastItem.ySecondaryValue}%`,
      isPositiveReturn
    });
  },

  onTapChartInfo() {
    my.alert({
      title: 'Info Grafik Emas BNI',
      content: 'Grafik menampilkan tren historis harga emas murni 99.99% terakreditasi LBMA. Data mock 100% lokal.'
    });
  },

  // Doughnut Diagram Handlers
  onSelectSlice(sliceIndex) {
    const cat = this.data.doughnutData.categories[sliceIndex];
    if (cat) {
      this.setData({
        selectedSlice: cat
      });
    }
  },

  // Bar Chart Handlers
  onTapMonthlyBar(barIndex) {
    const item = this.data.monthlyBars[barIndex];
    if (item) {
      this.setData({
        activeBarIndex: barIndex,
        activeBarSummary: `${item.label}: ${item.price} (${item.type === 'income' ? 'Pemasukan' : 'Pengeluaran'})`
      });
    }
  },

  // Cashflow Scenario Handlers
  onSelectCashflowScenario(e) {
    const scenario = e.currentTarget.dataset.scenario;
    let activeCashflowData = { inflowTotalAmount: 185000000, outflowTotalAmount: 112450000 };
    let cashflowSummary = { surplusAmount: '+Rp 72.550.000', savingRate: '39.2%', statusText: 'Surplus Sehat' };

    if (scenario === 'deficit') {
      activeCashflowData = { inflowTotalAmount: 95000000, outflowTotalAmount: 118200000 };
      cashflowSummary = { surplusAmount: '-Rp 23.200.000', savingRate: '-24.4%', statusText: 'Defisit Anggaran' };
    } else if (scenario === 'balanced') {
      activeCashflowData = { inflowTotalAmount: 120000000, outflowTotalAmount: 120000000 };
      cashflowSummary = { surplusAmount: 'Rp 0', savingRate: '0.0%', statusText: 'Arus Seimbang' };
    }

    this.setData({
      cashflowScenario: scenario,
      activeCashflowData,
      cashflowSummary
    });
  }
});
