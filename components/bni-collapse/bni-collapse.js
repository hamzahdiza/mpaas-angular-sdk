Component({
  mixins: [],
  data: {
    collapseItem: String(""),
    collapseStatus: Array([]),
    arrowUp: String(""),
    arrowDown: String(""),
    collapseAccordion: Boolean(false),
    type: String("default")
  },
  props: {
    collapseItem: String(""),
    type: String(""),
    collapseStatus: String(""),
    arrowDown: String(""),
    arrowUp: String(""),
    idIcon: String(""),
    idTitle: String(""),
    idDesc: String(""),
    /**
    * pixel is a prop that allows us to use pixels in styling
    */
    pixel: Boolean(false),
    titleSlot: Boolean(false)
  },
  didMount: function didMount() {
    this.setData({
      collapseItem: this.props.collapseItem,
      collapseStatus: this.props.collapseStatus,
      arrowUp: this.props.arrowUp,
      arrowDown: this.props.arrowDown,
      type: this.props.type,
      idIcon: this.props.idIcon,
      idTitle: this.props.idTitle,
      idDesc: this.props.idDesc
    });
  },
  didUpdate: function didUpdate() {},
  didUnmount: function didUnmount() {},
  methods: {
    toggleAccordion: function toggleAccordion(e) {
      var index = Number(e.currentTarget.dataset.index);
      var newAccordion = this.data.collapseStatus.map(function (state, i) {
        if (i === index) {
          var newState = !state;
          return newState;
        }
        return false;
      });
      this.setData({
        collapseStatus: newAccordion
      });
    },
    toggleCollapse: function toggleCollapse(e) {
      var index = Number(e.currentTarget.dataset.index);
      var newAccordion = this.data.collapseStatus.map(function (state, i) {
        if (i === index) {
          var newState = !state;
          return newState;
        }
        return state;
      });
      this.setData({
        collapseStatus: newAccordion
      });
    }
  }
});