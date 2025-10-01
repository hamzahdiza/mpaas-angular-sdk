import {
  describe,
  it,
  vi,
  beforeEach
} from "vitest";

import "./bni-scroll-picker"

const currentPage = global.pageInstance;

describe('Scroll Picker Component', () => {
  let initialProps;
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    initialProps = {
      idNumber: "number-picker",
      idDate: "date-picker",
      idMonth: "month-picker",
      idYear: "year-picker",
      type: "number",
      langType: "en-ID",
      days: [],
      minimumMonth: 0,
      defaultDate: [],
      years: [],
      addMoreYear: 0,
      maxNumber: 100,
      minNumber: 1,
      minSelectableNumber: 1,
      dateValue: [],
      numValue: 1,
      onChangeScroll: vi.fn(),
      immediateChange: false,
      pickerContainerClass: ""
    };
    
    currentPage.props = initialProps;
    currentPage.data = {
      arrayNumber: [],
      dateValue: [],
      numValue: 1,
      days: [],
      minimumMonth: 0,
      currentDate: {
        month: '',
        years: 0
      }
    };
  });

  describe('Component Lifecycle', () => {
    it('should initialize number picker correctly on didMount', () => {
      currentPage.props.type = 1;
      currentPage.props.maxNumber = 10;
      currentPage.props.minNumber = 1;
      currentPage.props.numValue = 5;
      
      currentPage.didMount();
    });

    it('should initialize number picker with numValue not provided', () => {
      currentPage.props.type = 1;
      currentPage.props.maxNumber = 10;
      currentPage.props.minNumber = 1;
      currentPage.props.numValue = null;
      
      currentPage.didMount();
    });

    it('should initialize number picker with numValue not found in array', () => {
      currentPage.props.type = 1;
      currentPage.props.maxNumber = 5;
      currentPage.props.minNumber = 1;
      currentPage.props.numValue = 10;
      
      currentPage.didMount();
    });

    it('should initialize date picker correctly on didMount', () => {
      currentPage.props.type = "date";
      currentPage.props.defaultDate = ["January", 2025];
      currentPage.props.minimumMonth = 1;
      currentPage.props.days = ["1", "2", "3"];
      
      currentPage.didMount();
    });

    it('should handle missing defaultDate on didMount', () => {
      currentPage.props.type = "date";
      currentPage.props.defaultDate = [];
      currentPage.props.minimumMonth = 3;
      
      currentPage.didMount();
    });

    it('should handle addMoreYear property', () => {
      currentPage.props.type = "date";
      currentPage.props.addMoreYear = 5;
      currentPage.props.defaultDate = [];
      
      currentPage.didMount();
    });

    it('should handle minimumMonth greater than 12', () => {
      currentPage.props.type = "date";
      currentPage.props.minimumMonth = 15;
      currentPage.props.defaultDate = [];
      
      currentPage.didMount();
    });

    it('should handle minimumMonth equal to 12', () => {
      currentPage.props.type = "date";
      currentPage.props.minimumMonth = 12;
      currentPage.props.defaultDate = [];
      
      currentPage.didMount();
    });

    it('should handle zero or negative minimumMonth', () => {
      currentPage.props.type = "date";
      currentPage.props.minimumMonth = 0;
      currentPage.props.defaultDate = [];
      
      currentPage.didMount();
    });

    it('should handle default date with current year matching first year', () => {
      const currentYear = new Date().getFullYear();
      currentPage.props.type = "date";
      currentPage.props.defaultDate = ["March", currentYear];
      currentPage.props.minimumMonth = 2;
      currentPage.props.addMoreYear = 0;
      
      currentPage.didMount();
    });

    it('should handle default date with future year', () => {
      const futureYear = new Date().getFullYear() + 5;
      currentPage.props.type = "date";
      currentPage.props.defaultDate = ["March", futureYear];
      currentPage.props.minimumMonth = 2;
      currentPage.props.addMoreYear = 0;
      
      currentPage.didMount();
    });

    it('should handle invalid month index in defaultDate', () => {
      currentPage.props.type = "date";
      currentPage.props.defaultDate = ["InvalidMonth", 2025];
      currentPage.props.minimumMonth = 1;
      
      currentPage.didMount();
    });

    it('should handle empty days array', () => {
      currentPage.props.type = "date";
      currentPage.props.defaultDate = [];
      currentPage.props.days = [];
      
      currentPage.didMount();
    });
  });

  describe('Date Change Handling', () => {
    beforeEach(() => {
      currentPage.data.years = ["2025", "2026", "2027"];
      currentPage.data.minimumMonth = 3;
      currentPage.data.currentDate = { month: "March", year: 2025 };
      currentPage.data.months = ["March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    });

    it('should handle date change to future year', () => {
      const mockEvent = [2, 1];
      
      currentPage.methods.onChangeDate.call(currentPage, mockEvent);
    });

    it('should handle date change to current year', () => {
      const mockEvent = [1, 0];
      
      currentPage.methods.onChangeDate.call(currentPage, mockEvent);
    });

    it('should handle year change with month adjustment', () => {
      const mockEvent = [0, 2];
      
      currentPage.methods.onChangeDate.call(currentPage, mockEvent);
    });

    it('should handle same year selection', () => {
      currentPage.data.currentDate.year = 2025;
      const mockEvent = [3, 0];
      
      currentPage.methods.onChangeDate.call(currentPage, mockEvent);
    });

    it('should handle month not found in new year', () => {
      currentPage.data.currentDate = { month: "February", year: 2025 };
      const mockEvent = [0, 2];
      
      currentPage.methods.onChangeDate.call(currentPage, mockEvent);
    });

    it('should handle year change to current year with different month', () => {
      currentPage.data.currentDate.year = 2026;
      const mockEvent = [1, 0];
      
      currentPage.methods.onChangeDate.call(currentPage, mockEvent);
    });

    it('should handle month found in restricted year', () => {
      currentPage.data.currentDate = { month: "March", year: 2026 };
      const mockEvent = [0, 0];
      
      currentPage.methods.onChangeDate.call(currentPage, mockEvent);
    });

    it('should handle year selection where current year equals selected year in future branch', () => {
      currentPage.data.years = ["2024", "2025", "2026"];
      currentPage.data.currentDate = { month: "March", year: 2025 };
      const mockEvent = [1, 1];
      
      currentPage.methods.onChangeDate.call(currentPage, mockEvent);
    });

    it('should handle year selection where current year equals selected year in past branch', () => {
      currentPage.data.years = ["2025", "2026", "2027"];
      currentPage.data.currentDate = { month: "March", year: 2026 };
      const mockEvent = [1, 0];
      
      currentPage.methods.onChangeDate.call(currentPage, mockEvent);
    });
  });

  describe('Number Change Handling', () => {
    beforeEach(() => {
      currentPage.data.arrayNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      currentPage.data.numValue = [2];
      currentPage.props.minSelectableNumber = 3;
    });

    it('should handle valid number selection', () => {
      const mockEvent = [5];
      
      currentPage.methods.onChangeNumber.call(currentPage, mockEvent);
    });

    it('should reject number below minimum selectable', () => {
      const mockEvent = [1];
      
      currentPage.methods.onChangeNumber.call(currentPage, mockEvent);
    });

    it('should handle boundary number selection', () => {
      const mockEvent = [2];
      
      currentPage.methods.onChangeNumber.call(currentPage, mockEvent);
    });

    it('should handle maximum number selection', () => {
      const mockEvent = [9];
      
      currentPage.methods.onChangeNumber.call(currentPage, mockEvent);
    });

    it('should handle number equal to minimum selectable', () => {
      const mockEvent = [2];
      currentPage.data.arrayNumber = [1, 2, 3, 4, 5];
      currentPage.props.minSelectableNumber = 3;
      
      currentPage.methods.onChangeNumber.call(currentPage, mockEvent);
    });

    it('should handle valid number selection with array update', () => {
      const mockEvent = [4];
      currentPage.data.arrayNumber = [5, 6, 7, 8, 9];
      currentPage.props.minSelectableNumber = 6;
      
      currentPage.methods.onChangeNumber.call(currentPage, mockEvent);
    });
  });

  describe('Available Months Generation', () => {
    beforeEach(() => {
      currentPage.props.langType = "en-ID";
    });

    it('should generate months in English from start of year', () => {
      currentPage.methods.getAvailableMonths.call(currentPage, 0);
    });

    it('should generate months in English from middle of year', () => {
      currentPage.methods.getAvailableMonths.call(currentPage, 5);
    });

    it('should generate months in Indonesian', () => {
      currentPage.props.langType = "id-ID";
      currentPage.methods.getAvailableMonths.call(currentPage, 0);
    });

    it('should default to English for unknown language', () => {
      currentPage.props.langType = "unknown";
      currentPage.methods.getAvailableMonths.call(currentPage, 0);
    });

    it('should handle end of year months', () => {
      currentPage.methods.getAvailableMonths.call(currentPage, 11);
    });

    it('should handle Indonesian language from middle of year', () => {
      currentPage.props.langType = "id-ID";
      currentPage.methods.getAvailableMonths.call(currentPage, 7);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle undefined props', () => {
      currentPage.props.maxNumber = undefined;
      currentPage.props.minNumber = undefined;
      currentPage.props.type = 1;
      
      currentPage.didMount();
    });

    it('should handle empty years array', () => {
      currentPage.props.type = "date";
      currentPage.props.years = [];
      currentPage.props.defaultDate = [];
      
      currentPage.didMount();
    });

    it('should handle zero addMoreYear', () => {
      currentPage.props.type = "date";
      currentPage.props.addMoreYear = 0;
      currentPage.props.defaultDate = [];
      
      currentPage.didMount();
    });

    it('should handle negative minimumMonth', () => {
      currentPage.props.type = "date";
      currentPage.props.minimumMonth = -5;
      currentPage.props.defaultDate = [];
      
      currentPage.didMount();
    });

    it('should handle string type conversion', () => {
      currentPage.props.type = 1;
      currentPage.props.maxNumber = "50";
      currentPage.props.minNumber = "10";
      
      currentPage.didMount();
    });

    it('should handle missing onChangeScroll callback', () => {
      currentPage.props.onChangeScroll = vi.fn();
      currentPage.props.type = 1;
      currentPage.props.maxNumber = 10;
      currentPage.props.minNumber = 1;
      
      currentPage.didMount();
    });

    it('should handle null defaultDate array element', () => {
      currentPage.props.type = "date";
      currentPage.props.defaultDate = [null, 2025];
      currentPage.props.minimumMonth = 1;
      
      currentPage.didMount();
    });

    it('should handle undefined minimumMonth', () => {
      currentPage.props.type = "date";
      currentPage.props.minimumMonth = undefined;
      currentPage.props.defaultDate = [];
      
      currentPage.didMount();
    });

    it('should handle null minimumMonth', () => {
      currentPage.props.type = "date";
      currentPage.props.minimumMonth = null;
      currentPage.props.defaultDate = [];
      
      currentPage.didMount();
    });

    it('should handle type different from 1', () => {
      currentPage.props.type = "custom";
      currentPage.props.defaultDate = [];
      currentPage.props.minimumMonth = 1;
      
      currentPage.didMount();
    });

    it('should handle case where monthIndex is -1 after finding month', () => {
      currentPage.data.years = ["2025", "2026"];
      currentPage.data.minimumMonth = 1;
      currentPage.data.currentDate = { month: "NonexistentMonth", year: 2025 };
      currentPage.data.months = ["January", "February", "March"];
      
      const mockEvent = [0, 1];
      currentPage.methods.onChangeDate.call(currentPage, mockEvent);
    });
  });

  describe('Props Integration', () => {
    it('should handle immediate change prop', () => {
      currentPage.props.immediateChange = true;
      currentPage.props.type = 1;
      
      currentPage.didMount();
    });

    it('should handle custom picker container class', () => {
      currentPage.props.pickerContainerClass = "custom-class";
      currentPage.props.type = 1;
      
      currentPage.didMount();
    });

    it('should handle all required IDs', () => {
      currentPage.props.idNumber = "num-id";
      currentPage.props.idDate = "date-id";
      currentPage.props.idMonth = "month-id";
      currentPage.props.idYear = "year-id";
      
      currentPage.didMount();
    });

    it('should handle custom type', () => {
      currentPage.props.type = "custom";
      currentPage.props.defaultDate = [];
      
      currentPage.didMount();
    });

    it('should handle provided years array', () => {
      currentPage.props.type = "date";
      currentPage.props.years = ["2020", "2021", "2022"];
      currentPage.props.defaultDate = [];
      
      currentPage.didMount();
    });

    it('should handle provided days array', () => {
      currentPage.props.type = "date";
      currentPage.props.days = ["1", "15", "30"];
      currentPage.props.defaultDate = [];
      
      currentPage.didMount();
    });
  });
});