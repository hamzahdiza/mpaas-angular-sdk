
/* JShield-obfus:enable */

Component({
  mixins: [],
  data: {},
  props: {
    
  },
  didMount() {},
  didUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setData({
        ...this.props,
      })
    }

  },
  didUnmount() {},
  methods: {
    onFocus(e){
      this.props.onFocus(e)
    },
    onChange(e){
      this.props.onChange(e)
    },
    onBlurInput(e) {
      this.props.onBlur(e)
    },
    onSuffix() {
      this.props.onSuffix()
    }
  },
});

/* JShield-obfus:disable */