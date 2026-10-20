Component({
  mixins: [],
  data: {},
  props: {
    onClick: Function,
    toggleStatus: Boolean(false),
    disabled: Boolean(false),
    /**
     * pixel is a prop that allows us to use pixels in styling
     */
    pixel: Boolean(false)
  },
  methods: {
    onClick: function onClick() {
      this.props.onClick();
    }
  }
});