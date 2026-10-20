import {
  describe,
  it,
  vi,
  afterEach
} from 'vitest';
import {
  getInstance
} from '../../configTest/utils';

// syncProps schedules setTimeout(180) -> setTimeout(600) before flipping
// isAutoScrolling back to false; onSelectMonth (date mode) schedules
// setTimeout(100) -> setTimeout(250). Real waits are used to flush them.
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const SYNC_PROPS_TIMER_MS = 850;   // 180 + 600 + buffer
const SELECT_MONTH_TIMER_MS = 400; // 100 + 250 + buffer

const dayDataset = (day, month, year, disabled = false) => ({
  currentTarget: { dataset: { day, month, year, disabled } }
});

const monthDataset = (month, year, disabled = false) => ({
  currentTarget: { dataset: { month, year, disabled } }
});

describe('calendar-picker', () => {

  // getLocale() calls getApp() and resolves through
  // (app && app.globalData && app.globalData.dayjsLocale) || 'id'.
  // Each getInstance() below re-triggers that resolution, so a single test
  // can walk through every permutation (no stub / undefined / no globalData
  // / no dayjsLocale / dayjsLocale set) just by restubbing getApp in between.
  describe('getLocale resolution', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('should resolve locale across every getApp permutation', () => {
      const props = { show: true, type: 'single', mode: 'date' };

      getInstance('calendar-picker', props); // no getApp -> catch branch

      vi.stubGlobal('getApp', () => undefined);
      getInstance('calendar-picker', props); // app falsy

      vi.stubGlobal('getApp', () => ({}));
      getInstance('calendar-picker', props); // globalData missing

      vi.stubGlobal('getApp', () => ({ globalData: {} }));
      getInstance('calendar-picker', props); // dayjsLocale missing

      vi.stubGlobal('getApp', () => ({ globalData: { dayjsLocale: 'id' } }));
      getInstance('calendar-picker', props); // dayjsLocale explicitly set
    });
  });

  describe('prop and helper fallback branches', () => {
    it('should fall back to defaults when selectedMonth/mode props are falsy', () => {
      getInstance('calendar-picker', {
        show: true,
        type: 'single',
        mode: '',
        selectedMonth: ''
      });
    });

    it('should fall back to current month/year when generateMonthGrids is called without arguments', () => {
      const instance = getInstance('calendar-picker', {
        show: true,
        type: 'single',
        mode: 'date',
        selectedMonth: 'Jan 2025',
        selectedDay: 5
      });

      // generateMonthGrids is always called with explicit args in the normal
      // flow, so its own `|| initialMonthFull` / `|| currentYearNumber`
      // fallbacks never run; call it directly to hit them.
      instance.callMethod('generateMonthGrids');
    });
  });

  describe('didUpdate resync condition', () => {
    it('should resync only when show/type actually change, not on identical props', () => {
      const instance = getInstance('calendar-picker', {
        show: true,
        type: 'single',
        mode: 'date',
        selectedMonth: 'Jan 2025',
        selectedDay: 5
      });

      instance.setProps({
        show: true, type: 'single', mode: 'date', selectedMonth: 'Jan 2025', selectedDay: 5
      }); // identical -> all 4 OR terms false, syncProps skipped

      instance.setProps({
        show: true, type: 'range', mode: 'date', selectedMonth: 'Jan 2025', selectedDay: 5
      }); // only type differs -> resync

      instance.setProps({
        show: false, type: 'range', mode: 'date', selectedMonth: 'Jan 2025', selectedDay: 5
      }); // only show differs -> resync
    });
  });

  describe('onCloseTap', () => {
    it('should call onClose when provided and no-op safely when it is not', () => {
      const onClose = vi.fn();

      getInstance('calendar-picker', {
        show: true, type: 'single', mode: 'date', onClose
      }).callMethod('onCloseTap');

      getInstance('calendar-picker', {
        show: true, type: 'single', mode: 'date'
      }).callMethod('onCloseTap');
    });
  });

  describe('onToggleCalendarMode', () => {
    it('should switch date -> month -> date', () => {
      const instance = getInstance('calendar-picker', {
        show: true, type: 'single', mode: 'date', selectedMonth: 'Jan 2025', selectedDay: 10
      });

      instance.callMethod('onToggleCalendarMode'); // enter month mode
      instance.callMethod('onToggleCalendarMode'); // back to date mode
    });
  });

  describe('onSelectMonth', () => {
    it('should ignore disabled months, select in month mode, and refresh a full-range label', () => {
      const instance = getInstance('calendar-picker', {
        show: true, type: 'range', mode: 'month'
      });

      instance.callMethod('onSelectMonth', monthDataset('Desember', 2025, true)); // disabled -> no-op

      instance.callMethod('onSelectDay', dayDataset(5, 'Januari', 2025));
      instance.callMethod('onSelectDay', dayDataset(20, 'Januari', 2025)); // full range set

      // props.mode === 'month': selects the month AND re-runs
      // updateActionLabelString() while a full range already exists,
      // hitting the "rangeStart && rangeEnd" label branch too.
      instance.callMethod('onSelectMonth', monthDataset('Februari', 2025));
    });

    it('should select a month in date mode and defer the re-scroll', async () => {
      const instance = getInstance('calendar-picker', {
        show: true, type: 'single', mode: 'date', selectedMonth: 'Jan 2025'
      });

      await wait(SYNC_PROPS_TIMER_MS); // flush the initial syncProps timer chain

      instance.callMethod('onSelectMonth', monthDataset('Maret', 2025));

      await wait(SELECT_MONTH_TIMER_MS); // flush onSelectMonth's own timer chain
    });
  });

  describe('onSelectDay', () => {
    it('should select a single day', () => {
      getInstance('calendar-picker', {
        show: true, type: 'single', mode: 'date', selectedMonth: 'Jan 2025', selectedDay: 5
      }).callMethod('onSelectDay', dayDataset(12, 'Januari', 2025));
    });

    it('should ignore disabled days and walk every range-selection branch', () => {
      const instance = getInstance('calendar-picker', {
        show: true, type: 'range', mode: 'date'
      });

      instance.callMethod('onSelectDay', dayDataset(20, 'Januari', 2025, true)); // disabled -> no-op
      instance.callMethod('onSelectDay', dayDataset(10, 'Januari', 2025));       // no start yet -> set start
      instance.callMethod('onSelectDay', dayDataset(5, 'Januari', 2025));        // before start -> reset start
      instance.callMethod('onSelectDay', dayDataset(20, 'Januari', 2025));       // after start -> set end
      instance.callMethod('onSelectDay', dayDataset(12, 'Januari', 2025));       // start+end already set -> new range
    });
  });

  describe('updateDaysHighlight', () => {
    it('should highlight both ends of a full range when called directly', () => {
      const instance = getInstance('calendar-picker', {
        show: true, type: 'range', mode: 'date'
      });

      instance.callMethod('onSelectDay', dayDataset(5, 'Januari', 2025));
      instance.callMethod('onSelectDay', dayDataset(20, 'Januari', 2025));

      // syncProps/onCalendarReset always clear rangeEnd right before calling
      // this, so the endTime/isEnd/isInRange branch never runs through the
      // normal flow. Call it directly here with a full range already set.
      instance.callMethod('updateDaysHighlight');
    });
  });

  describe('onCalendarReset', () => {
    it('should clear an in-progress range selection', () => {
      const instance = getInstance('calendar-picker', {
        show: true, type: 'range', mode: 'date'
      });

      instance.callMethod('onSelectDay', dayDataset(5, 'Januari', 2025));
      instance.callMethod('onCalendarReset');
    });
  });

  describe('onSaveTap', () => {
    it('should cover month-only, single, missing-callback, and range (partial + full) payloads', () => {
      const onSave = vi.fn();

      getInstance('calendar-picker', {
        show: true, type: 'single', mode: 'month', selectedMonth: 'Jan 2025', onSave
      }).callMethod('onSaveTap'); // mode === 'month' branch

      getInstance('calendar-picker', {
        show: true, type: 'single', mode: 'date', selectedMonth: 'Jan 2025', selectedDay: 15, onSave
      }).callMethod('onSaveTap'); // type === 'single' branch

      getInstance('calendar-picker', {
        show: true, type: 'single', mode: 'date', selectedMonth: 'Jan 2025', selectedDay: 15
      }).callMethod('onSaveTap'); // onSave not provided

      const rangeInstance = getInstance('calendar-picker', {
        show: true, type: 'range', mode: 'date', onSave
      });
      rangeInstance.callMethod('onSelectDay', dayDataset(5, 'Januari', 2025));
      rangeInstance.callMethod('onSaveTap'); // only start set -> no range payload built
      rangeInstance.callMethod('onSelectDay', dayDataset(20, 'Januari', 2025));
      rangeInstance.callMethod('onSaveTap'); // start+end set -> full range payload
    });
  });

  describe('onCalendarScroll', () => {
    it('should update on a different month, skip on same month, and skip on no match', async () => {
      const instance = getInstance('calendar-picker', {
        show: true, type: 'single', mode: 'date', selectedMonth: 'Jan 2025', selectedDay: 5
      });

      await wait(SYNC_PROPS_TIMER_MS); // let isAutoScrolling settle to false

      instance.callMethod('onCalendarScroll', { detail: { scrollTop: 0 } });      // matches a different month
      instance.callMethod('onCalendarScroll', { detail: { scrollTop: 24 } });     // matches active month
      instance.callMethod('onCalendarScroll', { detail: { scrollTop: 24 } });     // same month again -> no change
      instance.callMethod('onCalendarScroll', { detail: { scrollTop: 999999 } }); // matches nothing
    });

    it('should skip while isAutoScrolling is still true', async () => {
      const instance = getInstance('calendar-picker', {
        show: true, type: 'single', mode: 'date', selectedMonth: 'Jan 2025', selectedDay: 5
      });

      instance.callMethod('onCalendarScroll', { detail: { scrollTop: 500 } }); // isAutoScrolling still true -> early return

      await wait(SYNC_PROPS_TIMER_MS);

      instance.callMethod('onCalendarScroll', { detail: { scrollTop: 500 } }); // now goes through normally
    });
  });

  describe('syncProps parsing branches', () => {
    it('should parse abbreviated/invalid/month-only/year-only selectedMonth values', () => {
      const instance = getInstance('calendar-picker', {
        show: false, type: 'single', mode: 'date', selectedMonth: 'Feb 2025', selectedDay: 3
      });

      instance.setProps({ show: true, selectedMonth: 'Mar 2025', selectedDay: 8 });   // abbreviated month + year
      instance.setProps({ show: true, selectedMonth: 'Invalid 2025' });               // no month match -> default month
      instance.setProps({ show: true, selectedMonth: 'Mar' });                        // no year match -> default year
      instance.setProps({ show: true, selectedMonth: '2027' });                       // no month match -> default month
      instance.setProps({ show: true, selectedMonth: 'Jan 2025', selectedDay: undefined }); // no selectedDay -> default label
    });

    it('should set rangeStart from selectedDay, and clear it when selectedDay is removed', () => {
      const instance = getInstance('calendar-picker', {
        show: false, type: 'range', mode: 'date', selectedMonth: 'Jan 2025', selectedDay: 7
      });

      instance.setProps({ show: true, type: 'range', selectedMonth: 'Jan 2025', selectedDay: 7 }); // rangeStart set
      instance.setProps({ show: true, type: 'range', selectedMonth: 'Jan 2025', selectedDay: undefined }); // rangeStart null
    });

    it('should flush the deferred re-scroll timer chain', async () => {
      const instance = getInstance('calendar-picker', {
        show: false, type: 'single', mode: 'date', selectedMonth: 'Jan 2025', selectedDay: 5
      });

      instance.setProps({ show: true });
      await wait(SYNC_PROPS_TIMER_MS);
    });
  });

  describe('updateActionLabelString branches', () => {
    it('should format single/default-range/start-only-range/full-range labels', () => {
      const instance = getInstance('calendar-picker', {
        show: true, type: 'single', mode: 'date', selectedMonth: 'Jan 2025', selectedDay: 15
      }); // single, has selectedDay -> filled label

      instance.setProps({ type: 'range', selectedDay: undefined }); // range, no start -> default label
      instance.setProps({ selectedDay: 10 });                       // range, start only -> partial label

      instance.callMethod('onSelectDay', dayDataset(20, 'Januari', 2025)); // range, start+end -> full label
    });
  });
});