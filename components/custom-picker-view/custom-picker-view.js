Component({
  mixins: [],
  data: {
    firstList: [],
    secondList: [],
    firstInnerHeight: Number(0),
    secondInnerHeight: Number(0),
    itemHeight: Number(34),
    firstTop: Number(0),
    secondTop: Number(0),
    firstTouchStartY: Number(0),
    secondTouchStartY: Number(0),
    firstOriginalTop: Number(0),
    secondOriginalTop: Number(0),
    firstSnappedAnimating: Boolean(true),
    secondSnappedAnimating: Boolean(true),
    type: Number(1),
    defaultValue: Array([0, 0]),
    selectedFirstIndex: Number(0),
    selectedSecondIndex: Number(0),
    firstTouchMoved: Boolean(false),
    secondTouchMoved: Boolean(false),
    timeoutHandler: null,
  },
  props: {
    firstList: Array,
    secondList: Array,
    onChangeScroll: Function,
    type: Number(1),
    defaultValue: [],
    firstColumnId: String(""),
    secondColumnId: String(""),
    dateValue: []
  },
  didMount() {
    const {
      defaultValue,
      type,
      firstList,
      secondList
    } = this.props;
    const {
      itemHeight
    } = this.data;

    const resolvedDefault = Array.isArray(defaultValue) && defaultValue.length > 0 ?
      defaultValue :
      type === 2 ? [0, 0] : [0];

    const firstIndex = resolvedDefault[0] || 0;
    const secondIndex = type == 2 ? (resolvedDefault[1] || 0) : 0;

    this.setData({
      firstList,
      secondList,
      type,
      firstInnerHeight: firstList.length * itemHeight,
      secondInnerHeight: secondList.length * itemHeight,
      firstTop: -firstIndex * itemHeight,
      secondTop: -secondIndex * itemHeight,
      selectedFirstIndex: firstIndex,
      selectedSecondIndex: secondIndex
    })
  },
  didUpdate(prevProps) {
    const oldDateValue = (prevProps && prevProps.dateValue) || [];
    const newDateValue = this.props.dateValue || [];

    const isSame =
      oldDateValue[0] === newDateValue[0] &&
      oldDateValue[1] === newDateValue[1];

    if (isSame) return;
    
    const {
      firstList,
      secondList,
    } = this.props;
    const {
      itemHeight,
    } = this.data;

    const [newFirstIndex = 0, newSecondIndex = 0] = newDateValue;

    const updates = {
      firstList,
      secondList,
      firstInnerHeight: firstList.length * itemHeight,
      secondInnerHeight: secondList.length * itemHeight,
      firstTop: -newFirstIndex * itemHeight,
      secondTop: -newSecondIndex * itemHeight,
      selectedFirstIndex: newFirstIndex,
      selectedSecondIndex: newSecondIndex
    };

    this.setData(updates);
    this.resetAnimationTimeout();
  },
  didUnmount() {},
  methods: {
    onTouchStart(e) {
      const {
        id
      } = e.currentTarget;
      const y = e.touches[0].clientY;

      if (id === "first") {
        this.setData({
          firstTouchStartY: y,
          firstOriginalTop: this.data.firstTop,
          firstTouchMoved: false,
          firstSnappedAnimating: false,
        });
      } else if (id === "second") {
        this.setData({
          secondTouchStartY: y,
          secondOriginalTop: this.data.secondTop,
          secondTouchMoved: false,
          secondSnappedAnimating: false,
        });
      }
    },

    onTouchMove(e) {
      const {
        id
      } = e.currentTarget;
      const y = e.touches[0].clientY;
      const {
        itemHeight
      } = this.data;

      if (id === "first") {
        const deltaY = y - this.data.firstTouchStartY;
        if (Math.abs(deltaY) > 5) {
          this.setData({
            firstTouchMoved: true
          });
        }
        let newTop = this.data.firstOriginalTop + deltaY;
        const minTop = -(this.data.firstList.length - 1) * itemHeight;
        newTop = Math.max(minTop, Math.min(0, newTop));
        this.setData({
          firstTop: newTop
        });
      } else if (id === "second") {
        const deltaY = y - this.data.secondTouchStartY;
        if (Math.abs(deltaY) > 5) {
          this.setData({
            secondTouchMoved: true
          });
        }
        let newTop = this.data.secondOriginalTop + deltaY;
        const minTop = -(this.data.secondList.length - 1) * itemHeight;
        newTop = Math.max(minTop, Math.min(0, newTop));
        this.setData({
          secondTop: newTop
        });
      }
    },

    onTouchEnd(e) {
      const id = e.currentTarget.id;
      const moved = this.data[`${id}TouchMoved`];
      if (!moved) return;

      const top = this.data[`${id}Top`];
      const listLength = this.props[`${id}List`].length;

      let index = Math.round(-top / this.data.itemHeight);
      index = Math.max(0, Math.min(index, listLength - 1));
      const snappedTop = -index * this.data.itemHeight;

      const update = {
        [`${id}Top`]: snappedTop,
        [`${id}SnappedAnimating`]: true,
        [`selected${id === 'first' ? 'First' : 'Second'}Index`]: index
      };

      this.setData(update);
      this.resetAnimationTimeout();

      const firstIdx = id === 'first' ? index : this.data.selectedFirstIndex;
      const secondIdx = id === 'second' ? index : this.data.selectedSecondIndex;
      this.onChangeScroll(firstIdx, secondIdx);
    },

    onChangeScroll(firstIndex, secondIndex) {
      if (this.props.type == 2) {
        this.props.onChangeScroll([firstIndex, secondIndex])
      } else {
        this.props.onChangeScroll([firstIndex])
      }
    },

    onTapItem(e) {
      const { column, index } = e.currentTarget.dataset;
      const snappedTop = -index * this.data.itemHeight;
      const update = {
        [`${column}Top`]: snappedTop,
        [`${column}SnappedAnimating`]: true,
        [`selected${column === 'first' ? 'First' : 'Second'}Index`]: index
      };

      this.setData(update);
      this.resetAnimationTimeout();

      const firstIdx = column === 'first' ? index : this.data.selectedFirstIndex;
      const secondIdx = column === 'second' ? index : this.data.selectedSecondIndex;
      this.onChangeScroll(firstIdx, secondIdx);
    },

    resetAnimationTimeout() {
      if (this.data.timeoutHandler) {
        clearTimeout(this.data.timeoutHandler);
      }
      const timeout = setTimeout(() => {
        this.setData({
          firstSnappedAnimating: false,
          secondSnappedAnimating: false,
          timeoutHandler: null
        });
      }, 200);
      this.setData({ timeoutHandler: timeout });
    },
  },
});