Component({
  mixins: [],
  data: {
    isOpen: Boolean(false)
  },
  props: {
    title: String(),
    icon: String(),
    isOpen: Boolean(false),
    paragraph: String(),
    onClose: Function() || undefined,
  },
  didMount(){
    this.setData({
      ...this.props,
    })
  },
  didUpdate(prevProps) {
    if (JSON.stringify(prevProps) != JSON.stringify(this.props)) {
      this.setData({
        ...this.props,
      })
    }
  },
  methods: {
    onClose(){
      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  },
});
