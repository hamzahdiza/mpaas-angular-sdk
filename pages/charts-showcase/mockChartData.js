/**
 * Mock Chart Data for Financial Analytics & Visualizations
 * 100% Local Mock Data. Zero Network / API / Nexus Dependency.
 */

// 1. Gold Investment Price Historical Data
export const MOCK_GOLD_PERIODS = [
  { label: '1B', value: '1B', name: '1 Bulan' },
  { label: '3B', value: '3B', name: '3 Bulan' },
  { label: '6B', value: '6B', name: '6 Bulan' },
  { label: '1T', value: '1T', name: '1 Tahun' },
  { label: '3T', value: '3T', name: '3 Tahun' },
  { label: '5T', value: '5T', name: '5 Tahun' },
  { label: 'Semua', value: 'ALL', name: 'Semua' }
];

export const MOCK_GOLD_CHART_DATA = {
  '1B': [
    { xValue: '01 Okt 2026', yValue: 1395000, ySecondaryValue: 0.0, historyDate: '2026-10-01' },
    { xValue: '05 Okt 2026', yValue: 1402000, ySecondaryValue: 0.5, historyDate: '2026-10-05' },
    { xValue: '10 Okt 2026', yValue: 1415000, ySecondaryValue: 1.43, historyDate: '2026-10-10' },
    { xValue: '15 Okt 2026', yValue: 1408000, ySecondaryValue: 0.93, historyDate: '2026-10-15' },
    { xValue: '18 Okt 2026', yValue: 1425000, ySecondaryValue: 2.15, historyDate: '2026-10-18' },
    { xValue: '21 Okt 2026', yValue: 1438000, ySecondaryValue: 3.08, historyDate: '2026-10-21' }
  ],
  '3B': [
    { xValue: 'Agu 2026', yValue: 1360000, ySecondaryValue: 0.0, historyDate: '2026-08-01' },
    { xValue: 'Sep 2026', yValue: 1395000, ySecondaryValue: 2.57, historyDate: '2026-09-01' },
    { xValue: 'Okt 2026', yValue: 1438000, ySecondaryValue: 5.73, historyDate: '2026-10-21' }
  ],
  '6B': [
    { xValue: 'Mei 2026', yValue: 1320000, ySecondaryValue: 0.0, historyDate: '2026-05-01' },
    { xValue: 'Jun 2026', yValue: 1345000, ySecondaryValue: 1.89, historyDate: '2026-06-01' },
    { xValue: 'Jul 2026', yValue: 1350000, ySecondaryValue: 2.27, historyDate: '2026-07-01' },
    { xValue: 'Agu 2026', yValue: 1378000, ySecondaryValue: 4.39, historyDate: '2026-08-01' },
    { xValue: 'Sep 2026', yValue: 1405000, ySecondaryValue: 6.44, historyDate: '2026-09-01' },
    { xValue: 'Okt 2026', yValue: 1438000, ySecondaryValue: 8.94, historyDate: '2026-10-21' }
  ],
  '1T': [
    { xValue: 'Nov 2025', yValue: 1220000, ySecondaryValue: 0.0, historyDate: '2025-11-01' },
    { xValue: 'Feb 2026', yValue: 1285000, ySecondaryValue: 5.32, historyDate: '2026-02-01' },
    { xValue: 'Mei 2026', yValue: 1320000, ySecondaryValue: 8.19, historyDate: '2026-05-01' },
    { xValue: 'Agu 2026', yValue: 1380000, ySecondaryValue: 13.11, historyDate: '2026-08-01' },
    { xValue: 'Okt 2026', yValue: 1438000, ySecondaryValue: 17.86, historyDate: '2026-10-21' }
  ],
  '3T': [
    { xValue: 'Okt 2023', yValue: 1040000, ySecondaryValue: 0.0, historyDate: '2023-10-01' },
    { xValue: 'Apr 2024', yValue: 1180000, ySecondaryValue: 13.46, historyDate: '2024-04-01' },
    { xValue: 'Okt 2024', yValue: 1240000, ySecondaryValue: 19.23, historyDate: '2024-10-01' },
    { xValue: 'Apr 2025', yValue: 1310000, ySecondaryValue: 25.96, historyDate: '2025-04-01' },
    { xValue: 'Okt 2025', yValue: 1365000, ySecondaryValue: 31.25, historyDate: '2025-10-01' },
    { xValue: 'Okt 2026', yValue: 1438000, ySecondaryValue: 38.27, historyDate: '2026-10-21' }
  ],
  '5T': [
    { xValue: '2021', yValue: 915000, ySecondaryValue: 0.0, historyDate: '2021-10-01' },
    { xValue: '2022', yValue: 980000, ySecondaryValue: 7.10, historyDate: '2022-10-01' },
    { xValue: '2023', yValue: 1080000, ySecondaryValue: 18.03, historyDate: '2023-10-01' },
    { xValue: '2024', yValue: 1230000, ySecondaryValue: 34.42, historyDate: '2024-10-01' },
    { xValue: '2025', yValue: 1340000, ySecondaryValue: 46.44, historyDate: '2025-10-01' },
    { xValue: '2026', yValue: 1438000, ySecondaryValue: 57.15, historyDate: '2026-10-21' }
  ],
  'ALL': [
    { xValue: '2022', yValue: 940000, ySecondaryValue: 0.0, historyDate: '2022-01-01' },
    { xValue: '2023', yValue: 1060000, ySecondaryValue: 12.76, historyDate: '2023-01-01' },
    { xValue: '2024', yValue: 1210000, ySecondaryValue: 28.72, historyDate: '2024-01-01' },
    { xValue: '2025', yValue: 1310000, ySecondaryValue: 39.36, historyDate: '2025-01-01' },
    { xValue: '2026', yValue: 1438000, ySecondaryValue: 52.98, historyDate: '2026-10-21' }
  ]
};

// 2. Doughnut / Pie Chart Portfolio Asset Allocation Data
export const MOCK_DOUGHNUT_DATA = {
  data: [35000000, 25000000, 20000000, 15000000, 5000000],
  color: [
    '#2563EB', // Tabungan - Blue
    '#059669', // Deposito - Emerald
    '#F59E0B', // Reksa Dana - Amber
    '#D97706', // Emas - Orange Gold
    '#8B5CF6'  // SBN / Obligasi - Purple
  ],
  iconUrls: [
    '/src/assets/icons/category-chart/ic-expense-savings-investments.svg',
    '/src/assets/icons/category-chart/ic-income-salary.svg',
    '/src/assets/icons/category-chart/ic-income-investment-withdrawal.svg',
    '/src/assets/icons/category-chart/ic-income-money-in.svg',
    '/src/assets/icons/category-chart/ic-income-interest.svg'
  ],
  categories: [
    { name: 'Tabungan Giro', percentage: '35%', amount: 'Rp 35.000.000', color: '#2563EB' },
    { name: 'Deposito Berjangka', percentage: '25%', amount: 'Rp 25.000.000', color: '#059669' },
    { name: 'Reksa Dana Campuran', percentage: '20%', amount: 'Rp 20.000.000', color: '#F59E0B' },
    { name: 'Investasi Emas BNI', percentage: '15%', amount: 'Rp 15.000.000', color: '#D97706' },
    { name: 'Surat Berharga Negara', percentage: '5%', amount: 'Rp 5.000.000', color: '#8B5CF6' }
  ],
  totalPortfolio: 'Rp 100.000.000'
};

// 3. Multi-Bar Cashflow Chart Data
export const MOCK_MONTHLY_BARS = [
  { label: 'Mei', value: 14200000, price: 'Rp 14,2 Jt', type: 'income' },
  { label: 'Jun', value: 11800000, price: 'Rp 11,8 Jt', type: 'expense' },
  { label: 'Jul', value: 16500000, price: 'Rp 16,5 Jt', type: 'income' },
  { label: 'Agu', value: 12400000, price: 'Rp 12,4 Jt', type: 'expense' },
  { label: 'Sep', value: 18900000, price: 'Rp 18,9 Jt', type: 'income' },
  { label: 'Okt', value: 13500000, price: 'Rp 13,5 Jt', type: 'expense' }
];

export const MOCK_EXPENSE_CATEGORIES_BARS = [
  { label: 'F&B', value: 4500000, price: 'Rp 4,5 Jt' },
  { label: 'Belanja', value: 3200000, price: 'Rp 3,2 Jt' },
  { label: 'Tagihan', value: 2800000, price: 'Rp 2,8 Jt' },
  { label: 'Transport', value: 1800000, price: 'Rp 1,8 Jt' },
  { label: 'Hiburan', value: 1200000, price: 'Rp 1,2 Jt' }
];
