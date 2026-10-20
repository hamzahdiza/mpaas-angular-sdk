/**
 * @component calendar-picker
 * @description Bottom-sheet kalender untuk memilih tanggal tunggal, range tanggal, atau bulan.
 * Nama bulan otomatis mengikuti locale dayjs aktif (id/en).
 *
 * @prop {boolean}  show           - Tampilkan atau sembunyikan bottom-sheet kalender
 * @prop {string}   type           - Mode seleksi: 'single' | 'range'
 * @prop {string}   mode           - Mode tampilan: 'date' | 'month'
 * @prop {string}   selectedMonth  - Bulan awal yang dipilih, format: 'Jan 2025' atau 'Januari 2025'
 * @prop {number}   selectedDay    - Hari awal yang dipilih (1-31)
 * @prop {string}   actionLabel    - Teks placeholder sebelum ada seleksi (default: 'Pilih tanggal')
 * @prop {string}   saveLabel      - Label tombol simpan di footer (default: 'Simpan')
 * @prop {Function} onSave         - Callback saat tombol simpan ditekan.
 *                                   Menerima object: { type, displayValue, month, year, day } atau
 *                                   { type: 'range', displayValue, startDate, endDate, day }
 * @prop {Function} onClose        - Callback saat tombol tutup (X) ditekan
 */
import dayjs from 'dayjs';
import 'dayjs/locale/id';

// --- Locale Helpers ---

const getLocale = () => {
  try {
    const app = getApp();
    return (app && app.globalData && app.globalData.dayjsLocale) || 'id';
  } catch (e) {
    return 'id';
  }
};

const getMonthsFullList = () =>
  Array.from({ length: 12 }, (_, i) =>
    dayjs().locale(getLocale()).month(i).format('MMMM')
  );

const getMonthsAbbrList = () =>
  Array.from({ length: 12 }, (_, i) =>
    dayjs().locale(getLocale()).month(i).format('MMM')
  );

const getMonthAbbrMap = () => {
  const full = getMonthsFullList();
  const abbr = getMonthsAbbrList();
  const map = {};
  for (let i = 0; i < 12; i++) {
    map[full[i]] = abbr[i];
  }
  return map;
};

const getMonthIdxMap = () => {
  const full = getMonthsFullList();
  const map = {};
  for (let i = 0; i < 12; i++) {
    map[full[i]] = i;
  }
  return map;
};

// --- Initial state values (evaluated once at load) ---

const todayDate = dayjs();
const currentYearNumber = todayDate.year();
const initialMonthFull = todayDate.locale('id').format('MMMM');
const initialMonthAbbr = todayDate.locale('id').format('MMM');
const defaultSelectedMonth = `${initialMonthAbbr} ${currentYearNumber}`;

// --- Component ---

Component({
  mixins: [],
  data: {
    calendarMode: 'date', // 'date' or 'month'
    tempMonth: initialMonthFull,
    tempYear: currentYearNumber,
    tempSelectedDay: todayDate.date(),
    scrollTargetId: '',
    scrollableMonths: [],
    scrollWithAnimation: false,
    selectedDayVal: todayDate.date(),
    selectedMonthNameVal: initialMonthFull,
    selectedYearVal: currentYearNumber,

    // Date Range Selection State
    rangeStart: null,
    rangeEnd: null,
    actionLabelString: 'Pilih tanggal',
    hasSelection: false,

    yearHeaderPrev: null,
    yearHeaderCur: null,
    monthsListPrev: [],
    monthsListCur: [],
    monthScrollTargetId: ''
  },
  props: {
    show: false,
    type: 'single', // 'single' or 'range'
    mode: 'date',   // 'date' or 'month'
    selectedMonth: defaultSelectedMonth,
    selectedDay: todayDate.date(),
    actionLabel: 'Pilih tanggal',
    saveLabel: 'Simpan',
    onSave: () => {},
    onClose: () => {}
  },
  didMount() {
    this.initCalendarData();
    this.syncProps();
  },
  didUpdate(prevProps) {
    if (
      prevProps.show !== this.props.show ||
      prevProps.selectedMonth !== this.props.selectedMonth ||
      prevProps.selectedDay !== this.props.selectedDay ||
      prevProps.type !== this.props.type
    ) {
      this.syncProps();
    }
  },
  methods: {
    initCalendarData() {
      const today = dayjs();
      const todayDay = today.date();
      const todayMonth = today.month();
      const todayYear = today.year();
      const fullList = getMonthsFullList();

      const startYear = todayYear - 1;
      const endYear = todayYear;

      const list = [];
      let cumulativeHeight = 24;
      const monthOffsets = [];

      for (let y = startYear; y <= endYear; y++) {
        const endM = (y === todayYear) ? todayMonth : 11;
        for (let m = 0; m <= endM; m++) {
          const monthName = fullList[m];
          const firstDay = dayjs(new Date(y, m, 1));
          const firstDayOfWeek = firstDay.day();
          const daysInMonth = firstDay.daysInMonth();

          const days = [];
          for (let i = 0; i < firstDayOfWeek; i++) {
            days.push({ val: '', isOffset: true });
          }

          for (let d = 1; d <= daysInMonth; d++) {
            const isTodayVal = (d === todayDay && m === todayMonth && y === todayYear);
            let isDisabledVal = false;
            if (y > todayYear) {
              isDisabledVal = true;
            } else if (y === todayYear) {
              if (m > todayMonth) {
                isDisabledVal = true;
              } else if (m === todayMonth && d > todayDay) {
                isDisabledVal = true;
              }
            }

            days.push({
              val: d,
              monthName,
              year: y,
              monthIndex: m,
              isToday: isTodayVal,
              isDisabled: isDisabledVal,
              isStart: false,
              isEnd: false,
              isInRange: false
            });
          }

          const totalSlots = firstDayOfWeek + daysInMonth;
          const rows = Math.ceil(totalSlots / 7);
          const sectionHeight = rows * 56 + 76;

          list.push({
            id: `month-${y}-${m}`,
            name: monthName,
            year: y,
            monthIndex: m,
            days
          });

          monthOffsets.push({
            monthName,
            year: y,
            start: cumulativeHeight,
            end: cumulativeHeight + sectionHeight
          });

          cumulativeHeight += sectionHeight;
        }
      }

      this.scrollOffsets = monthOffsets;
      this.setData({ scrollableMonths: list });
    },

    syncProps() {
      const monthStr = this.props.selectedMonth || defaultSelectedMonth;
      const parts = monthStr.trim().split(/\s+/);
      const fullList = getMonthsFullList();
      const abbrList = getMonthsAbbrList();

      // Build abbr→full map for parsing incoming selectedMonth prop
      const abbrToFull = {};
      for (let i = 0; i < 12; i++) {
        abbrToFull[abbrList[i]] = fullList[i];
        abbrToFull[fullList[i]] = fullList[i];
      }

      let monthFull = initialMonthFull;
      let yearVal = currentYearNumber;

      for (const part of parts) {
        if (abbrToFull[part]) {
          monthFull = abbrToFull[part];
          break;
        }
      }

      for (const part of parts) {
        const num = Number(part);
        if (num >= 2000 && num <= 2100) {
          yearVal = num;
          break;
        }
      }

      const monthIdx = fullList.indexOf(monthFull);

      this.setData({
        tempMonth: monthFull,
        tempYear: yearVal,
        tempSelectedDay: this.props.selectedDay || null,
        selectedDayVal: this.props.selectedDay || null,
        selectedMonthNameVal: monthFull,
        selectedYearVal: yearVal,
        calendarMode: this.props.mode || 'date',
        scrollTargetId: '',
        scrollWithAnimation: false
      });

      if (this.props.type === 'single') {
        this.setData({ rangeStart: null, rangeEnd: null });
      } else {
        const initialStart = this.props.selectedDay ? {
          day: this.props.selectedDay,
          month: monthFull,
          year: yearVal
        } : null;
        this.setData({ rangeStart: initialStart, rangeEnd: null });
      }

      this.generateMonthGrids(monthFull, yearVal);
      this.updateDaysHighlight();
      this.updateActionLabelString();

      this.isAutoScrolling = true;
      setTimeout(() => {
        this.setData({ scrollTargetId: `month-${yearVal}-${monthIdx}` });
        setTimeout(() => {
          this.isAutoScrolling = false;
        }, 600);
      }, 180);
    },

    generateMonthGrids(selectedMonthName, selectedYear) {
      const today = dayjs();
      const todayMonth = today.month();
      const todayYear = today.year();
      const fullList = getMonthsFullList();
      const monthIdxMap = getMonthIdxMap();

      const prevYear = todayYear - 1;
      const curYear = todayYear;

      const minTime = dayjs(new Date(todayYear, todayMonth - 12, 1)).valueOf();
      const maxTime = dayjs(new Date(todayYear, todayMonth, 1)).valueOf();

      const activeMonthName = selectedMonthName || initialMonthFull;
      const activeYear = Number(selectedYear) || currentYearNumber;

      const monthsPrevYear = fullList.map((m, idx) => {
        const isActive = (m === activeMonthName && activeYear === prevYear);
        const cellTime = dayjs(new Date(prevYear, idx, 1)).valueOf();
        const isDisabled = (cellTime < minTime || cellTime > maxTime);
        return {
          name: m,
          id: `month-${prevYear}-${idx}`,
          isActive,
          isDisabled
        };
      });

      const monthsCurYear = fullList.map((m, idx) => {
        const isActive = (m === activeMonthName && activeYear === curYear);
        const cellTime = dayjs(new Date(curYear, idx, 1)).valueOf();
        const isDisabled = (cellTime < minTime || cellTime > maxTime);
        return {
          name: m,
          id: `month-${curYear}-${idx}`,
          isActive,
          isDisabled
        };
      });

      this.setData({
        yearHeaderPrev: prevYear,
        yearHeaderCur: curYear,
        monthsListPrev: monthsPrevYear,
        monthsListCur: monthsCurYear
      });
    },

    updateDaysHighlight() {
      const monthIdxMap = getMonthIdxMap();
      const { rangeStart, rangeEnd, scrollableMonths } = this.data;

      let startTime = null;
      let endTime = null;

      if (rangeStart) {
        startTime = new Date(rangeStart.year, monthIdxMap[rangeStart.month], rangeStart.day).getTime();
      }
      if (rangeEnd) {
        endTime = new Date(rangeEnd.year, monthIdxMap[rangeEnd.month], rangeEnd.day).getTime();
      }

      const updatedMonths = scrollableMonths.map(month => {
        const updatedDays = month.days.map(day => {
          if (day.isOffset) return day;
          const cellTime = dayjs(new Date(day.year, day.monthIndex, day.val)).valueOf();
          let isStart = false;
          let isEnd = false;
          let isInRange = false;

          if (startTime) isStart = (cellTime === startTime);
          if (endTime) {
            isEnd = (cellTime === endTime);
            isInRange = (cellTime > startTime && cellTime < endTime);
          }

          return { ...day, isStart, isEnd, isInRange };
        });
        return { ...month, days: updatedDays };
      });

      this.setData({ scrollableMonths: updatedMonths });
    },

    onCalendarScroll(e) {
      if (this.isAutoScrolling) return;
      const scrollTop = e.detail.scrollTop;
      if (!this.scrollOffsets) return;

      for (let i = 0; i < this.scrollOffsets.length; i++) {
        const offset = this.scrollOffsets[i];
        if (scrollTop + 250 >= offset.start && scrollTop + 250 < offset.end) {
          if (this.data.tempMonth !== offset.monthName || this.data.tempYear !== offset.year) {
            this.setData({ tempMonth: offset.monthName, tempYear: offset.year });
            this.generateMonthGrids(offset.monthName, offset.year);
          }
          break;
        }
      }
    },

    onCloseTap() {
      this.setData({ scrollTargetId: '' });
      if (this.props.onClose) this.props.onClose();
    },

    onToggleCalendarMode() {
      const isEnteringMonth = (this.data.calendarMode === 'date');
      if (isEnteringMonth) {
        const selectedMonth = this.data.selectedMonthNameVal || initialMonthFull;
        const selectedYear = this.data.selectedYearVal || currentYearNumber;
        this.generateMonthGrids(selectedMonth, selectedYear);
        const monthIdx = getMonthsFullList().indexOf(selectedMonth);
        const targetId = `month-${selectedYear}-${monthIdx}`;
        this.setData({
          calendarMode: 'month',
          monthScrollTargetId: targetId,
          scrollWithAnimation: false
        });
      } else {
        this.setData({ calendarMode: 'date', monthScrollTargetId: '' });
      }
    },

    onSelectMonth(e) {
      const month = e.currentTarget.dataset.month;
      const year = Number(e.currentTarget.dataset.year);
      const disabled = e.currentTarget.dataset.disabled;
      if (disabled) return;

      if (this.props.mode === 'month') {
        this.setData({
          tempMonth: month,
          tempYear: year,
          selectedMonthNameVal: month,
          selectedYearVal: year
        });
        this.generateMonthGrids(month, year);
        this.updateActionLabelString();
        return;
      }

      const monthIdx = getMonthsFullList().indexOf(month);
      this.setData({
        tempMonth: month,
        tempYear: year,
        calendarMode: 'date',
        scrollTargetId: '',
        scrollWithAnimation: false
      });

      this.generateMonthGrids(month, year);

      this.isAutoScrolling = true;
      setTimeout(() => {
        this.setData({ scrollTargetId: `month-${year}-${monthIdx}` });
        setTimeout(() => {
          this.isAutoScrolling = false;
        }, 250);
      }, 100);
    },

    updateActionLabelString() {
      const monthAbbr = getMonthAbbrMap();

      if (this.props.type === 'single') {
        const { selectedDayVal, selectedMonthNameVal, selectedYearVal } = this.data;
        if (!selectedDayVal) {
          this.setData({ actionLabelString: this.props.actionLabel || 'Pilih tanggal', hasSelection: false });
        } else {
          const formattedMonth = monthAbbr[selectedMonthNameVal] || selectedMonthNameVal;
          this.setData({
            actionLabelString: `${selectedDayVal} ${formattedMonth} ${selectedYearVal}`,
            hasSelection: true
          });
        }
      } else {
        const { rangeStart, rangeEnd } = this.data;
        if (!rangeStart) {
          this.setData({ actionLabelString: this.props.actionLabel || 'Pilih tanggal', hasSelection: false });
          return;
        }
        const format = (date) => `${date.day} ${monthAbbr[date.month] || date.month} ${date.year}`;
        if (rangeStart && !rangeEnd) {
          this.setData({ actionLabelString: `${format(rangeStart)}`, hasSelection: true });
        } else if (rangeStart && rangeEnd) {
          this.setData({
            actionLabelString: `${format(rangeStart)} - ${format(rangeEnd)}`,
            hasSelection: true
          });
        }
      }
    },

    onSelectDay(e) {
      const day = Number(e.currentTarget.dataset.day);
      const month = e.currentTarget.dataset.month;
      const year = Number(e.currentTarget.dataset.year);
      const disabled = e.currentTarget.dataset.disabled;
      if (disabled) return;

      const monthIdxMap = getMonthIdxMap();
      const monthAbbr = getMonthAbbrMap();

      if (this.props.type === 'single') {
        const formattedMonth = monthAbbr[month] || month;
        const newLabel = `${day} ${formattedMonth} ${year}`;
        this.setData({
          tempMonth: month,
          tempYear: year,
          tempSelectedDay: day,
          selectedDayVal: day,
          selectedMonthNameVal: month,
          selectedYearVal: year,
          actionLabelString: newLabel,
          hasSelection: true
        });
      } else {
        let newStart = this.data.rangeStart;
        let newEnd = this.data.rangeEnd;
        const clickedTime = dayjs(new Date(year, monthIdxMap[month], day)).valueOf();

        if (!newStart || (newStart && newEnd)) {
          newStart = { day, month, year };
          newEnd = null;
        } else {
          const startTime = dayjs(new Date(newStart.year, monthIdxMap[newStart.month], newStart.day)).valueOf();
          if (clickedTime < startTime) {
            newStart = { day, month, year };
            newEnd = null;
          } else {
            newEnd = { day, month, year };
          }
        }

        let startTimeVal = null;
        let endTimeVal = null;
        if (newStart) startTimeVal = dayjs(new Date(newStart.year, monthIdxMap[newStart.month], newStart.day)).valueOf();
        if (newEnd) endTimeVal = dayjs(new Date(newEnd.year, monthIdxMap[newEnd.month], newEnd.day)).valueOf();

        const updatedMonths = this.data.scrollableMonths.map(mSection => {
          const updatedDays = mSection.days.map(dCell => {
            if (dCell.isOffset) return dCell;
            const cellTime = dayjs(new Date(dCell.year, dCell.monthIndex, dCell.val)).valueOf();
            let isStart = false;
            let isEnd = false;
            let isInRange = false;
            if (startTimeVal) isStart = (cellTime === startTimeVal);
            if (endTimeVal) {
              isEnd = (cellTime === endTimeVal);
              isInRange = (cellTime > startTimeVal && cellTime < endTimeVal);
            }
            return { ...dCell, isStart, isEnd, isInRange };
          });
          return { ...mSection, days: updatedDays };
        });

        const format = (date) => `${date.day} ${monthAbbr[date.month] || date.month} ${date.year}`;
        let newLabel = 'Pilih tanggal';
        if (newStart && !newEnd) {
          newLabel = `${format(newStart)}`;
        } else if (newStart && newEnd) {
          newLabel = `${format(newStart)} - ${format(newEnd)}`;
        }

        this.setData({
          rangeStart: newStart,
          rangeEnd: newEnd,
          scrollableMonths: updatedMonths,
          actionLabelString: newLabel,
          hasSelection: true
        });
      }
    },

    onCalendarReset() {
      this.setData({
        tempSelectedDay: null,
        selectedDayVal: null,
        selectedMonthNameVal: initialMonthFull,
        selectedYearVal: currentYearNumber,
        rangeStart: null,
        rangeEnd: null
      }, () => {
        this.updateDaysHighlight();
        this.updateActionLabelString();
      });
    },

    onSaveTap() {
      this.setData({ scrollTargetId: '' });
      if (this.props.onSave) {
        const monthAbbrMap = getMonthAbbrMap();

        if (this.props.mode === 'month') {
          const month = this.data.selectedMonthNameVal || this.data.tempMonth;
          const year = this.data.selectedYearVal || this.data.tempYear;
          const formattedMonth = monthAbbrMap[month] || month;
          const displayValue = `${formattedMonth} ${year}`;
          this.props.onSave({ type: 'month-only', displayValue, month, year });
          return;
        }

        if (this.props.type === 'single') {
          const month = this.data.selectedMonthNameVal || this.data.tempMonth;
          const year = this.data.selectedYearVal || this.data.tempYear;
          const day = this.data.selectedDayVal;
          const formattedMonth = monthAbbrMap[month] || month;
          const displayValue = `${formattedMonth} ${year}`;
          this.props.onSave({ type: 'single', displayValue, month, year, day });
        } else {
          const { rangeStart, rangeEnd } = this.data;
          if (rangeStart && rangeEnd) {
            const startFormat = `${rangeStart.day} ${monthAbbrMap[rangeStart.month] || rangeStart.month} ${rangeStart.year}`;
            const endFormat = `${rangeEnd.day} ${monthAbbrMap[rangeEnd.month] || rangeEnd.month} ${rangeEnd.year}`;
            const displayValue = `${startFormat} - ${endFormat}`;
            this.props.onSave({
              type: 'range',
              displayValue,
              startDate: rangeStart,
              endDate: rangeEnd,
              day: rangeStart.day
            });
          }
        }
      }
    }
  }
});
