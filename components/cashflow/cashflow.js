import {
  currencyFormat
} from "../../src/utils/helpers/currency-util.js";
import {
  bigTruncRetain
} from "../../src/utils/helpers/number-util.js";

Component({
  mixins: [],
  data: {
    isDoneRender: true,
    screenId: String('pfmInsightTemplateBarChart'),
    barData: [
      { label: 'Total Pemasukan', value: 185000000, price: 'Rp185.000.000' },
      { label: 'Total Pengeluaran', value: 112450000, price: 'Rp112.450.000' }
    ],
    barChartType: "transaction",
    isLoading: false,
    isError: false,
    isUS: false,
    langTitle: "Arus Kas Kamu Positif di Tahun 2026",
    langDesc: "Pemasukan kamu lebih besar daripada pengeluaran. Pertahankan performa keuangan sehat ini!",
    lang: {
      yearEndReviewSlide2CashflowPercentageIncomeLabel: 'Total Pemasukan',
      yearEndReviewSlide2CashflowPercentageExpenseLabel: 'Total Pengeluaran'
    }
  },
  props: {
    cashflowData: null,
    onLeftButtonHandle: () => {},
    onRightButtonHandle: () => {}
  },
  didMount() {
    this.processCashflow();
  },
  didUpdate(prevProps) {
    if (JSON.stringify(prevProps.cashflowData) !== JSON.stringify(this.props.cashflowData)) {
      this.processCashflow();
    }
  },
  methods: {
    processCashflow() {
      try {
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

        const defaultCashflow = {
          inflowTotalAmount: 185000000,
          outflowTotalAmount: 112450000
        };

        const cashflowData = this.props.cashflowData ||
          (getApp().globalData && 
           getApp().globalData.currentProductDetail && 
           getApp().globalData.currentProductDetail.yearEndReviewDetail && 
           getApp().globalData.currentProductDetail.yearEndReviewDetail.cashflow) || 
          defaultCashflow;

        const {
          inflowTotalAmount = 185000000,
          outflowTotalAmount = 112450000
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
        const langDesc = lang[`yearEndReviewSlide2${langKey}Desc`] || 'Analisis perbandingan total pemasukan dan pengeluaran tahun ini.';

        const barDataRaw = [
          {
            label: lang.yearEndReviewSlide2CashflowPercentageIncomeLabel || 'Total Pemasukan',
            amount: inflowTotalAmount
          },
          {
            label: lang.yearEndReviewSlide2CashflowPercentageExpenseLabel || 'Total Pengeluaran',
            amount: outflowTotalAmount
          }
        ];

        const barChartType = "transaction";

        const updatedData = barDataRaw.map((item) => {
          let priceStr = `Rp ${Number(item.amount).toLocaleString('id-ID')}`;
          try {
            const formatted = currencyFormat({
              value: item.amount,
              isUS: this.data.isUS,
              retainCall: bigTruncRetain
            });
            if (formatted && formatted.currencyString) {
              priceStr = formatted.currencyString;
            }
          } catch (e) {}
          return {
            value: Number(item.amount),
            label: item.label,
            price: priceStr
          };
        });

        this.setData({
          lang,
          barData: updatedData,
          barChartType,
          langTitle,
          langDesc,
          isDoneRender: true
        });
      } catch (err) {
        console.error('Error in cashflow processData:', err);
        this.setData({ isDoneRender: true });
      }
    },

    leftButtonHandle() {
      if (typeof this.props.onLeftButtonHandle === 'function') {
        this.props.onLeftButtonHandle();
      }
    },
    rightButtonHandle() {
      if (typeof this.props.onRightButtonHandle === 'function') {
        this.props.onRightButtonHandle();
      }
    }
  }
});