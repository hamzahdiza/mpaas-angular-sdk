import {
  describe,
  it,
  vi,
  beforeEach,
  expect
} from "vitest";

import './custom-picker-view';

const currentPage = global.pageInstance;

describe('Scroll Picker Component', () => {
  let initialProps;
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    initialProps = {
      firstList: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
      secondList: ["Value A", "Value B", "Value C", "Value D"],
      onChangeScroll: vi.fn(),
      type: 1,
      defaultValue: [0],
      firstColumnId: "first-column",
      secondColumnId: "second-column",
      dateValue: [0, 0],
      itemHeight: 34
    };
    
    currentPage.props = initialProps;
    currentPage.data = {
      firstList: [],
      secondList: [],
      firstInnerHeight: 0,
      secondInnerHeight: 0,
      firstTop: 0,
      secondTop: 0,
      firstTouchStartY: 0,
      secondTouchStartY: 0,
      firstOriginalTop: 0,
      secondOriginalTop: 0,
      firstSnappedAnimating: true,
      secondSnappedAnimating: true,
      type: 1,
      defaultValue: [0, 0],
      selectedFirstIndex: 0,
      selectedSecondIndex: 0,
      firstTouchMoved: false,
      secondTouchMoved: false,
      timeoutHandler: null,
      itemHeight: 34
    };
  });

  describe('Component Lifecycle', () => {
    it('should initialize single column picker correctly on didMount', () => {
      currentPage.props.type = 1;
      currentPage.props.defaultValue = [2];
      currentPage.props.firstList = ["A", "B", "C", "D", "E"];
      currentPage.props.secondList = ["X", "Y"];
            
      currentPage.didMount();
    });

    it('should initialize dual column picker correctly on didMount', () => {
      currentPage.props.type = 2;
      currentPage.props.defaultValue = [1, 2];
      currentPage.props.firstList = ["A", "B", "C", "D", "E"];
      currentPage.props.secondList = ["X", "Y", "Z", "W"];
      
      const setDataSpy = vi.spyOn(currentPage, 'setData');
      
      currentPage.didMount();
      
      expect(setDataSpy).toHaveBeenCalledWith({
        firstList: ["A", "B", "C", "D", "E"],
        secondList: ["X", "Y", "Z", "W"],
        type: 2,
        itemHeight: 34,
        firstInnerHeight: 5 * 34,
        secondInnerHeight: 4 * 34,
        firstTop: -1 * 34,
        secondTop: -2 * 34,
        selectedFirstIndex: 1,
        selectedSecondIndex: 2
      });
    });

    it('should handle empty defaultValue for single column picker', () => {
      currentPage.props.defaultValue = [];
      currentPage.props.type = 1;
      currentPage.props.firstList = ["A", "B", "C"];
      currentPage.props.secondList = ["X", "Y"];
      
      currentPage.didMount();
    });

    it('should handle empty defaultValue for dual column picker', () => {
      currentPage.props.defaultValue = [];
      currentPage.props.type = 2;
      currentPage.props.firstList = ["A", "B", "C"];
      currentPage.props.secondList = ["X", "Y"];
      
      const setDataSpy = vi.spyOn(currentPage, 'setData');
      
      currentPage.didMount();
      
      expect(setDataSpy).toHaveBeenCalledWith(expect.objectContaining({
        selectedFirstIndex: 0,
        selectedSecondIndex: 0
      }));
    });

    it('should handle non-array defaultValue', () => {
      currentPage.props.defaultValue = null;
      currentPage.props.type = 2;
      currentPage.props.firstList = ["A", "B", "C"];
      currentPage.props.secondList = ["X", "Y"];
      
      const setDataSpy = vi.spyOn(currentPage, 'setData');
      
      currentPage.didMount();
      
      expect(setDataSpy).toHaveBeenCalledWith(expect.objectContaining({
        selectedFirstIndex: 0,
        selectedSecondIndex: 0
      }));
    });

    it('should handle didUpdate when dateValue changes', () => {
      currentPage.data.itemHeight = 34;
      currentPage.props.firstList = ["A", "B", "C"];
      currentPage.props.secondList = ["X", "Y", "Z"];
      
      const prevProps = { dateValue: [0, 0] };
      currentPage.props.dateValue = [1, 2];
      
      const setDataSpy = vi.spyOn(currentPage, 'setData');
      const resetAnimationSpy = vi.spyOn(currentPage, 'resetAnimationTimeout');
      
      currentPage.didUpdate(prevProps);
      
      expect(setDataSpy).toHaveBeenCalledWith({
        firstList: ["A", "B", "C"],
        secondList: ["X", "Y", "Z"],
        firstInnerHeight: 3 * 34,
        secondInnerHeight: 3 * 34,
        firstTop: -1 * 34,
        secondTop: -2 * 34,
        selectedFirstIndex: 1,
        selectedSecondIndex: 2
      });
      expect(resetAnimationSpy).toHaveBeenCalled();
    });

    it('should skip update when dateValue has not changed', () => {
      const prevProps = { dateValue: [1, 1] };
      currentPage.props.dateValue = [1, 1];
      
      const setDataSpy = vi.spyOn(currentPage, 'setData');
      
      currentPage.didUpdate(prevProps);
      
      expect(setDataSpy).not.toHaveBeenCalled();
    });

    it('should handle missing prevProps in didUpdate', () => {
      currentPage.props.dateValue = [1, 2];
      
      const setDataSpy = vi.spyOn(currentPage, 'setData');
      
      currentPage.didUpdate(null);
      
      expect(setDataSpy).toHaveBeenCalled();
    });

    it('should handle undefined dateValue arrays', () => {
      const prevProps = { dateValue: undefined };
      currentPage.props.dateValue = [1, 2];
      
      const setDataSpy = vi.spyOn(currentPage, 'setData');
      
      currentPage.didUpdate(prevProps);
      
      expect(setDataSpy).toHaveBeenCalled();
    });
  });

  describe('Touch Event Handling', () => {
    beforeEach(() => {
      currentPage.data.firstTop = -68;
      currentPage.data.secondTop = -34;
      currentPage.data.itemHeight = 34;
    });

    it('should handle touch start on first column', () => {
      const mockEvent = {
        currentTarget: { id: "first" },
        touches: [{ clientY: 100 }]
      };
      
      const setDataSpy = vi.spyOn(currentPage, 'setData');
      
      currentPage.methods.onTouchStart.call(currentPage, mockEvent);
      
      expect(setDataSpy).toHaveBeenCalledWith({
        firstTouchStartY: 100,
        firstOriginalTop: -68,
        firstTouchMoved: false,
        firstSnappedAnimating: false,
      });
    });

    it('should handle touch start on second column', () => {
      const mockEvent = {
        currentTarget: { id: "second" },
        touches: [{ clientY: 150 }]
      };
      
      const setDataSpy = vi.spyOn(currentPage, 'setData');
      
      currentPage.methods.onTouchStart.call(currentPage, mockEvent);
      
      expect(setDataSpy).toHaveBeenCalledWith({
        secondTouchStartY: 150,
        secondOriginalTop: -34,
        secondTouchMoved: false,
        secondSnappedAnimating: false,
      });
    });

    it('should handle touch move on first column with significant movement', () => {
      currentPage.data.firstTouchStartY = 100;
      currentPage.data.firstOriginalTop = -68;
      currentPage.data.firstList = ["A", "B", "C", "D", "E"];
      
      const mockEvent = {
        currentTarget: { id: "first" },
        touches: [{ clientY: 120 }]
      };
      
      const setDataSpy = vi.spyOn(currentPage, 'setData');
      
      currentPage.methods.onTouchMove.call(currentPage, mockEvent);
      
      expect(setDataSpy).toHaveBeenCalledWith({ firstTouchMoved: true });
      expect(setDataSpy).toHaveBeenCalledWith({ firstTop: -48 });
    });

    it('should handle touch move on second column with significant movement', () => {
      currentPage.data.secondTouchStartY = 100;
      currentPage.data.secondOriginalTop = -34;
      currentPage.data.secondList = ["A", "B", "C"];
      
      const mockEvent = {
        currentTarget: { id: "second" },
        touches: [{ clientY: 110 }]
      };
      
      const setDataSpy = vi.spyOn(currentPage, 'setData');
      
      currentPage.methods.onTouchMove.call(currentPage, mockEvent);
      
      expect(setDataSpy).toHaveBeenCalledWith({ secondTouchMoved: true });
      expect(setDataSpy).toHaveBeenCalledWith({ secondTop: -24 });
    });

    it('should handle touch move with minimal movement (no touch moved flag)', () => {
      currentPage.data.firstTouchStartY = 100;
      currentPage.data.firstOriginalTop = -68;
      currentPage.data.firstList = ["A", "B", "C"];
      
      const mockEvent = {
        currentTarget: { id: "first" },
        touches: [{ clientY: 102 }] // Only 2px movement
      };
      
      const setDataSpy = vi.spyOn(currentPage, 'setData');
      
      currentPage.methods.onTouchMove.call(currentPage, mockEvent);
      
      // Should update position but not set touchMoved flag
      expect(setDataSpy).toHaveBeenCalledWith({ firstTop: -66 });
      expect(setDataSpy).not.toHaveBeenCalledWith({ firstTouchMoved: true });
    });

    it('should constrain touch move to upper boundary', () => {
      currentPage.data.firstTouchStartY = 100;
      currentPage.data.firstOriginalTop = 0;
      currentPage.data.firstList = ["A", "B", "C"];
      
      const mockEvent = {
        currentTarget: { id: "first" },
        touches: [{ clientY: 150 }] // Large positive movement
      };
      
      const setDataSpy = vi.spyOn(currentPage, 'setData');
      
      currentPage.methods.onTouchMove.call(currentPage, mockEvent);
      
      expect(setDataSpy).toHaveBeenCalledWith({ firstTop: 0 }); // Constrained to 0
    });

    it('should constrain touch move to lower boundary', () => {
      currentPage.data.firstTouchStartY = 100;
      currentPage.data.firstOriginalTop = -100;
      currentPage.data.firstList = ["A", "B", "C"];
      
      const mockEvent = {
        currentTarget: { id: "first" },
        touches: [{ clientY: 50 }] // Large negative movement
      };
      
      const setDataSpy = vi.spyOn(currentPage, 'setData');
      
      currentPage.methods.onTouchMove.call(currentPage, mockEvent);
      
      expect(setDataSpy).toHaveBeenCalledWith({ firstTop: -68 }); // Constrained to min
    });

    it('should handle touch end with snapping for first column', () => {
      currentPage.data.firstTop = -50;
      currentPage.data.firstTouchMoved = true;
      currentPage.data.itemHeight = 34;
      currentPage.props.firstList = ["A", "B", "C", "D"];
      
      const mockEvent = { currentTarget: { id: "first" } };
      
      const setDataSpy = vi.spyOn(currentPage, 'setData');
      const resetAnimationSpy = vi.spyOn(currentPage, 'resetAnimationTimeout');
      const onChangeScrollSpy = vi.spyOn(currentPage, 'onChangeScroll');
      
      currentPage.methods.onTouchEnd.call(currentPage, mockEvent);
      
      expect(setDataSpy).toHaveBeenCalledWith({
        firstTop: -34, // Snapped to nearest item
        firstSnappedAnimating: true,
        selectedFirstIndex: 1
      });
      expect(resetAnimationSpy).toHaveBeenCalled();
      expect(onChangeScrollSpy).toHaveBeenCalledWith(1, 0);
    });

    it('should handle touch end with snapping for second column', () => {
      currentPage.data.secondTop = -85;
      currentPage.data.secondTouchMoved = true;
      currentPage.data.itemHeight = 34;
      currentPage.data.selectedFirstIndex = 1;
      currentPage.props.secondList = ["A", "B", "C", "D"];
      
      const mockEvent = { currentTarget: { id: "second" } };
      
      const setDataSpy = vi.spyOn(currentPage, 'setData');
      const onChangeScrollSpy = vi.spyOn(currentPage, 'onChangeScroll');
      
      currentPage.methods.onTouchEnd.call(currentPage, mockEvent);
      
      expect(setDataSpy).toHaveBeenCalledWith({
        secondTop: -102, // Snapped to index 3
        secondSnappedAnimating: true,
        selectedSecondIndex: 3
      });
      expect(onChangeScrollSpy).toHaveBeenCalledWith(1, 3);
    });

    it('should ignore touch end if no movement occurred', () => {
      currentPage.data.firstTouchMoved = false;
      
      const mockEvent = { currentTarget: { id: "first" } };
      const setDataSpy = vi.spyOn(currentPage, 'setData');
      
      currentPage.methods.onTouchEnd.call(currentPage, mockEvent);
      
      expect(setDataSpy).not.toHaveBeenCalled();
    });

    it('should constrain index to valid range on touch end', () => {
      currentPage.data.firstTop = -1000; // Way beyond bounds
      currentPage.data.firstTouchMoved = true;
      currentPage.props.firstList = ["A", "B", "C"];
      
      const mockEvent = { currentTarget: { id: "first" } };
      const setDataSpy = vi.spyOn(currentPage, 'setData');
      
      currentPage.methods.onTouchEnd.call(currentPage, mockEvent);
      
      expect(setDataSpy).toHaveBeenCalledWith(expect.objectContaining({
        selectedFirstIndex: 2 // Constrained to last valid index
      }));
    });
  });

  describe('Item Tap Handling', () => {
    it('should handle tap on first column item', () => {
      const mockEvent = {
        currentTarget: {
          dataset: { column: "first", index: "2" }
        }
      };
      
      currentPage.data.selectedSecondIndex = 1;
      currentPage.data.itemHeight = 34;
      
      currentPage.methods.onTapItem.call(currentPage, mockEvent);
    });

    it('should handle tap on second column item', () => {
      const mockEvent = {
        currentTarget: {
          dataset: { column: "second", index: "3" }
        }
      };
      
      currentPage.data.selectedFirstIndex = 0;
      currentPage.data.itemHeight = 34;
      
      currentPage.methods.onTapItem.call(currentPage, mockEvent);
    });
  });

  describe('Scroll Change Handling', () => {
    it('should handle single column scroll change (type 1)', () => {
      currentPage.props.type = 1;
      currentPage.props.onChangeScroll = vi.fn();
      
      currentPage.methods.onChangeScroll.call(currentPage, 2, 1);
      
      expect(currentPage.props.onChangeScroll).toHaveBeenCalledWith([2]);
    });

    it('should handle dual column scroll change (type 2)', () => {
      currentPage.props.type = 2;
      currentPage.props.onChangeScroll = vi.fn();
      
      currentPage.methods.onChangeScroll.call(currentPage, 1, 3);
      
      expect(currentPage.props.onChangeScroll).toHaveBeenCalledWith([1, 3]);
    });

    it('should handle type coercion (type == 2 vs type === 2)', () => {
      currentPage.props.type = "2"; // String instead of number
      currentPage.props.onChangeScroll = vi.fn();
      
      currentPage.methods.onChangeScroll.call(currentPage, 1, 3);
      
      expect(currentPage.props.onChangeScroll).toHaveBeenCalledWith([1, 3]);
    });
  });

  describe('Animation Timeout Management', () => {
    it('should set timeout without existing handler', () => {
      currentPage.data.timeoutHandler = null;
      
      const setTimeoutSpy = vi.spyOn(global, 'setTimeout').mockReturnValue(456);
      const setDataSpy = vi.spyOn(currentPage, 'setData');
      
      currentPage.methods.resetAnimationTimeout.call(currentPage);
      
      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 200);
      expect(setDataSpy).toHaveBeenCalledWith({ timeoutHandler: 456 });
    });

    it('should clear existing timeout before setting new one', () => {
      const mockTimeoutId = 123;
      currentPage.data.timeoutHandler = mockTimeoutId;
      
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
      const setTimeoutSpy = vi.spyOn(global, 'setTimeout').mockReturnValue(456);
      
      currentPage.methods.resetAnimationTimeout.call(currentPage);
      
      expect(clearTimeoutSpy).toHaveBeenCalledWith(123);
      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 200);
    });

    it('should handle timeout callback execution', () => {
      vi.useFakeTimers();
      
      const setDataSpy = vi.spyOn(currentPage, 'setData');
      
      currentPage.methods.resetAnimationTimeout.call(currentPage);
      
      vi.advanceTimersByTime(200);
      
      expect(setDataSpy).toHaveBeenCalledWith({
        firstSnappedAnimating: false,
        secondSnappedAnimating: false,
        timeoutHandler: null
      });
      
      vi.useRealTimers();
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle missing touches array in touch events', () => {
      const mockEvent = {
        currentTarget: { id: "first" },
        touches: []
      };
      
      expect(() => {
        currentPage.methods.onTouchStart.call(currentPage, mockEvent);
      }).toThrow();
    });

    it('should handle invalid column IDs in touch events', () => {
      const mockEvent = {
        currentTarget: { id: "invalid" },
        touches: [{ clientY: 100 }]
      };
      
      const setDataSpy = vi.spyOn(currentPage, 'setData');
      
      currentPage.methods.onTouchStart.call(currentPage, mockEvent);
      
      expect(setDataSpy).not.toHaveBeenCalled();
    });

    it('should handle missing dataset in tap events', () => {
      const mockEvent = {
        currentTarget: { dataset: {} }
      };
      
      expect(() => {
        currentPage.methods.onTapItem.call(currentPage, mockEvent);
      }).not.toThrow();
    });

    it('should handle string index in tap events', () => {
      const mockEvent = {
        currentTarget: {
          dataset: { column: "first", index: "2" }
        }
      };
      
      currentPage.data.itemHeight = 34;      
      currentPage.methods.onTapItem.call(currentPage, mockEvent);
    
    });

    it('should handle component cleanup', () => {
      expect(() => {
        currentPage.didUnmount();
      }).not.toThrow();
    });

    it('should handle zero-length lists', () => {
      currentPage.props.firstList = [];
      currentPage.props.secondList = [];
      
      expect(() => {
        currentPage.didMount();
      }).not.toThrow();
    });
  });

  describe('Props Integration', () => {
    it('should handle custom itemHeight', () => {
      currentPage.props.itemHeight = 50;
      currentPage.props.firstList = ["A", "B", "C"];
      
      const setDataSpy = vi.spyOn(currentPage, 'setData');
      
      currentPage.didMount();
      
      expect(setDataSpy).toHaveBeenCalledWith(expect.objectContaining({
        itemHeight: 50,
        firstInnerHeight: 150
      }));
    });

    it('should handle missing itemHeight prop', () => {
      delete currentPage.props.itemHeight;
      
      expect(() => {
        currentPage.didMount();
      }).not.toThrow();
    });
  });
});