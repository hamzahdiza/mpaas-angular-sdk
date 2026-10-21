import {
  currencyFormat
} from "/src/utils/helpers/currency-util";
import {
  bigTruncRetain
} from "/src/utils/helpers/number-util";

Component({
  mixins: [],
  data: {
    isDoneRender: false,
    screenId: String('pfmInsightTemplateBarChart'),
    barData: Array([]),
    barChartType: String(""),
    isLoading: Boolean(false),
    isError: Boolean(false),
    isUS: Boolean(false),
    langTitle: String(""),
    langDesc: String("")
  },
  props: {
    onLeftButtonHandle: () => {},
    onRightButtonHandle: () => {},
  },
  didMount() {
    const lang = (getApp().globalData && getApp().globalData.languagePack) || {
      yearEndReviewSlide2CashflowPositiveTitle: 'Arus Kas Kamu Positif di Tahun __year__',
      yearEndReviewSlide2CashflowPositiveDesc: 'Pemasukan kamu lebih besar daripada pengeluaran. Pertahankan performa keuangan sehat ini!',
      yearEndReviewSlide2CashflowNegativeTitle: 'Arus Kas Kamu Negatif di Tahun __year__',
      yearEndReviewSlide2CashflowNegativeDesc: 'Pengeluaran melebihi pemasukan. Evaluasi pos anggaran bulanan kamu.',
      yearEndReviewSlide2CashflowBalanceTitle: 'Arus Kas Kamu Seimbang di Tahun __year__',
      yearEndReviewSlide2CashflowBalanceDesc: 'Pemasukan dan pengeluaran kamu berada pada tingkat seimbang.',
      yearEndReviewSlide2CashflowPercentageIncomeLabel: 'Total Pemasukan',
      yearEndReviewSlide2CashflowPercentageExpenseLabel: 'Total Pengeluaran'
    };

    setTimeout(() => {
      const defaultCashflow = {
        inflowTotalAmount: 185000000,
        outflowTotalAmount: 112450000
      };

      const cashflowData = (getApp().globalData && 
        getApp().globalData.currentProductDetail && 
        getApp().globalData.currentProductDetail.yearEndReviewDetail && 
        getApp().globalData.currentProductDetail.yearEndReviewDetail.cashflow) || defaultCashflow;

      const {
        inflowTotalAmount,
        outflowTotalAmount
      } = cashflowData;

      const yearNow = new Date().getFullYear();

      let langKey = '';
      if (inflowTotalAmount === outflowTotalAmount) {
        langKey = 'CashflowBalance';
      } else if (inflowTotalAmount === 0) {
        langKey = 'CashflowZeroIncome';
      } else if (outflowTotalAmount === 0) {
        langKey = 'CashflowZeroExpense';
      } else if (inflowTotalAmount > outflowTotalAmount) {
        langKey = 'CashflowPositive';
      } else {
        langKey = 'CashflowNegative';
      }

      const langTitleTemplate = lang[`yearEndReviewSlide2${langKey}Title`] || 'Arus Kas Tahun __year__';
      const langTitle = langTitleTemplate.replace('__year__', yearNow);
      const langDesc = lang[`yearEndReviewSlide2${langKey}Desc`] || 'Analisis perbandingan total pemasukan dan pengeluaran';

      const barDataRaw = [{
          label: lang.yearEndReviewSlide2CashflowPercentageIncomeLabel || 'Pemasukan',
          amount: inflowTotalAmount
        },
        {
          label: lang.yearEndReviewSlide2CashflowPercentageExpenseLabel || 'Pengeluaran',
          amount: outflowTotalAmount
        }
      ];

      const barChartType = "transaction";

      const updatedData = barDataRaw.map((item) => ({
        value: item.amount,
        label: item.label,
        price: currencyFormat({
          value: item.amount,
          isUS: this.data.isUS,
          retainCall: bigTruncRetain
        }).currencyString || `Rp ${Number(item.amount).toLocaleString('id-ID')}`
      }));

      this.setData({
        lang,
        barData: updatedData,
        barChartType,
        langTitle,
        langDesc,
        isDoneRender: true
      });

    }, 150);

  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    leftButtonHandle() {
      if (typeof this.props.onLeftButtonHandle === 'function') {
        this.props.onLeftButtonHandle();
      }
    },
    rightButtonHandle() {
      if (typeof this.props.onRightButtonHandle === 'function') {
        this.props.onRightButtonHandle();
      }
    },
  },
});