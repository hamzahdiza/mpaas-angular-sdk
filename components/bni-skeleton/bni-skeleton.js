Component({
  mixins: [],
  data: {
    paragraph: {
      rows: 0
    }
  },
  props: {
    type: String,
    buttonSize: String,
    showAnimate: Boolean,
    showLoading: Boolean,
    showAvatar: Boolean,
    rowsCount: Number,
    className: String,
    paragraphRows: Number
  },
  didMount: function didMount() {
    this.setData({
      paragraph: {
        rows: this.props.paragraphRows
      }
    });
  },
  didUpdate: function didUpdate() {},
  didUnmount: function didUnmount() {
    this.setData({
      paragraph: {
        rows: 0
      }
    });
  },
  methods: {}
});