/* JShield-obfus:enable */
Component({
  data: {
    maxValue: 0
  },
  props: {
    label: Boolean(false),
    tooltip: Boolean(false),
    type: String(""),
    mode: String(""),
    activeBar: 0,
    onTapBar: () => {},
    barData: Array(),
    labelData: Array([]),
    barId: String(""),
    labelId: String(""),
    tooltipTitleId: String(""),
    tooltipValueId: String(""),
    barLeft: Number(0),
    barRight: Number(0),
    labelTextStyle: String("")
  },
  didMount() {
    this.processData();
  },
  didUpdate(prevProps) {
    if (JSON.stringify(prevProps.barData) !== JSON.stringify(this.props.barData)) {
      this.processData();
    }
  },
  methods: {
    processData() {
      if (this.props.mode === "multiple-bars") {
        const barData = this.props.barData || [];
        if (barData.length === 0) return;
        const maxValue = Math.max(...barData.map(item => item.value), 0);
        const barCount = barData.length;
    
        const margin = barCount <= 2 ? 22 : barCount <= 3 ? 16 : barCount <= 4 ? 8 : 4;
        const width = barCount <= 4 ? '56px' : barCount <= 5 ? '51px' : '42px';
    
        const barDataUpdated = barData.map(bar => ({
          ...bar, 
          margin,
          width: typeof bar.width === 'string' ? bar.width : width
        }));
    
        this.setData({
          maxValue,
          barData: barDataUpdated
        });
      } else {
        const maxValue = Math.max(this.props.barLeft || 0, this.props.barRight || 0);
        this.setData({
          maxValue,
        });
      }
    },
    onTapBar(e) {
      const idx = e.currentTarget.dataset.bar;
      this.setData({
        activeBar: idx
      });
      if (typeof this.props.onTapBar === 'function') {
        this.props.onTapBar(idx);
      }
    }
  }
});