/* JShield-obfus:enable */
Component({
  mixins: [],
  data: {
    isOpen: Boolean(false),
    startY: Number(),
    initialHeight: Number(0),
    currentHeight: Number(0),
    expandedHeight: Number(518),
    throttleTimeout: null,
    throttleDelay: Number(50)
  },
  props: {
    isOpen: Boolean(false),
    isExpanded: Boolean(false),
    onClose: () => {}
  },
  didMount() {

  },
  didUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      const expandedHeight = (this.props.isOpen ? (this.props.isExpanded ? 518 : 242 ) : 0) 
      this.setData({
        ...this.props,
        currentHeight: expandedHeight
      })
    } 
  },
  didUnmount() {},
  methods: {
    touchStart(e) {
      this.setData({
        startY: e.touches[0].clientY
      })
    },
    touchMove(e) {
      this.throttle(() => {
        let touchY = e.touches[0].clientY;
        let callibration = 53 + touchY
        let deltaY = (callibration - this.data.startY) > 0 ? (callibration - this.data.startY) * 1.7 : 0
        let newHeight = this.data.startY - deltaY + 100

        this.setData({
          currentHeight: newHeight
        })
      }, this.data.throttleDelay)

    },
    touchEnd() {
      if (this.data.throttleTimeout) {
        clearTimeout(this.data.throttleTimeout);
        this.setData({
          throttleTimeout: null
        });
      }

      const finalHeight = this.data.currentHeight

      if (finalHeight < this.data.expandedHeight * 0.75) {

        this.props.onClose()

        this.setData({
          currentHeight: this.data.initialHeight,
          isOpen: false
        })

      } else {
        this.setData({
          currentHeight: this.data.expandedHeight,
          isOpen: true
        })
      }
    },
    throttle(func, delay) {
      if (this.data.throttleTimeout) return;
      this.setData({
        throttleTimeout: setTimeout(() => {
          func();

          this.setData({
            throttleTimeout: null
          });
        }, delay)
      });
    },
  },
});
/* JShield-obfus:disable */