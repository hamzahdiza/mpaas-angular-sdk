const today = new Date();
const monthsAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
const currentMonthAbbr = monthsAbbr[today.getMonth()];
const currentYear = today.getFullYear();

// Map full Indonesian month name → 0-based index
const fullMonthToIdx = {
  'Januari': 0,
  'Februari': 1,
  'Maret': 2,
  'April': 3,
  'Mei': 4,
  'Juni': 5,
  'Juli': 6,
  'Agustus': 7,
  'September': 8,
  'Oktober': 9,
  'November': 10,
  'Desember': 11
};

// Map abbreviated month → 0-based index
const abbrMonthToIdx = {
  'Jan': 0,
  'Feb': 1,
  'Mar': 2,
  'Apr': 3,
  'Mei': 4,
  'Jun': 5,
  'Jul': 6,
  'Ags': 7,
  'Sep': 8,
  'Okt': 9,
  'Nov': 10,
  'Des': 11
};

Page({
  data: {
    selectedMonth: `${currentMonthAbbr} ${currentYear}`,
    showCalendar: false,
    selectedDay: today.getDate(),
    calendarType: 'single',
    calendarMode: 'month',
  },
  onLoad() {},
  onCalendarSave(e) {
    const { displayValue, day } = e;
    this.setData({
      selectedMonth: displayValue,
      selectedDay: day || null,
      showCalendar: false
    });
    this.filterByMonth();
  },
  onCloseCalendar() {
    this.setData({ showCalendar: false });
  },
  onMonthFilterTap() {
    if (this.data.isError) return;
    this.setData({ showCalendar: true });
  },
  onChangeCalendarType(e) {
    const { type } = e.currentTarget.dataset;
    this.setData({ calendarType: type });
  },
  
  onChangeCalendarMode(e) {
    const { mode } = e.currentTarget.dataset;
    this.setData({ calendarMode: mode });
  },
});