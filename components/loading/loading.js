Component({
  data: {},
  props: {
    /**
     * loading: set loading state
     * default: false
     */
    loading: Boolean(false)
  },
  didMount() {
    const {
      loading,
    } = this.props
    this.setData({
      loading
    })
  },
  didUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setData({
        ...this.props
      })
    }
  },
  methods: {},
});