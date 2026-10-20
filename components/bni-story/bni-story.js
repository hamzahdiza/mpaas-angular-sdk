Component({
  props: {
    items: {
      type: Number,
      default: 3
    },
    current: {
      type: Number,
      default: 0
    },
    onNext: {
      type: Function
    },
    onPrev: {
      type: Function
    },
    onSwiperChange: {
      type: Function,
    },
    mode: {
      type: String,
      default: "Horizontal"
    },
    /**
     * fillDuration: duration for progress bar animation with milli second,
     * applicable for: type "withProgress",
     * default: "5000"
     */
    fillDuration: Number(5000),
    /**
     * backgroundColor: Hex color code for the background of the progress circle,
     * applicable for: type "circle",
     * default: "#ECF789"
     */
    backgroundColor: String('#C2F0EC'),
    /**
     * foregroundColor: Hex color code for the foreground of the progress circle,
     * applicable for: type "steps",
     * default: "#71DBD3"
     */
    progressColor: String("#3AA8A0"),
    /**
     * progressBar: condition active or no progress bar
     * default: "true"
     */
    progressBar: Boolean(true),
    /**
     * autoPlay: condition auto swipe progress bar
     * default: "true"
     */
    autoPlay: Boolean(false),
    /**
     * paddingBar: padding container progress bar progress bar
     * default: "0 24px"
     */
    paddingBar: String("0 24px"),
    /**
     * classChevron: styling css for image Chevron next and prev
     * default: "width:24px; height:24px; padding:8px"
     */
    classChevronLeft: String(""),
    classChevronRight: String(""),
    /**
     * disabledSwipe: active swipe with finger on screen
     * default: false
     */
    disabledSwipe: Boolean(false),
    /**
     * withChevron: active chevron for next or prev story screen
     * default: false
     */
    withChevron: Boolean(false),
     /**
     * type  for story screen
     * default: fix
     */
    type:String("fix")
  },

  data: {
    currentIndex: Number(0),
    animationState: String('running'),
    swiperAutoPlay: Boolean(false),
    swiperInterval: Number(5000),  
    slideStartTime: Number(0),
    pauseStartTime:Number(0),
    totalPauseDuration:Number(0) 
  },

  didMount() {
    this.setData({
      currentIndex: this.props.current || 0,
      mode: this.props.mode,
      swiperInterval: this.props.fillDuration,
      swiperAutoPlay: this.props.autoPlay,
      slideStartTime:Date.now()
    });
    
  },

  didUpdate(prevProps) {
    if (prevProps.current !== this.props.current) {
      this.setData({
        currentIndex: this.props.current,
        mode: this.props.mode,
        swiperInterval: this.props.fillDuration,
        swiperAutoPlay: this.props.autoPlay,
        slideStartTime:Date.now(),
        totalPauseDuration:0,
        pauseStartTime:0,
      });
    }
  },

  methods: {
    handleNext() {
      this.setData({
        swiperInterval:this.props.fillDuration,
        slideStartTime:Date.now(),
        totalPauseDuration:0,
        pauseStartTime:0,
      })
      this.props.onNext();
    },

    handlePrev() {
      this.setData({
        swiperInterval:this.props.fillDuration,
        slideStartTime:Date.now(),
        totalPauseDuration:0,
        pauseStartTime:0,
      })
      this.props.onPrev();
    },

    swiperChange(e) {
      const current = e.detail.current;
      this.setData({
        currentIndex: current,
        swiperInterval: this.props.fillDuration,  // Reset ke default
        swiperAutoPlay: this.props.autoPlay,
        slideStartTime:Date.now(),
        totalPauseDuration:0,
        pauseStartTime:0,
      });
      
      if (this.props.onSwiperChange) {
        this.props.onSwiperChange(e);
      }
    },

    handleTouchStart() {
      this.setData({
        animationState: 'paused',
        swiperAutoPlay: false ,
        pauseStartTime:  Date.now(),
      });
    },
  
    handleTouchEnd() {
      let{
        pauseStartTime,
        totalPauseDuration,
        slideStartTime
      } = this.data
      
      const pauseDuration = Date.now() - pauseStartTime;
      totalPauseDuration += pauseDuration;
      
      const elapsedTime = Date.now() - slideStartTime - totalPauseDuration;
      const remainingTime = Math.max(100, this.props.fillDuration - elapsedTime);
      this.setData({
        animationState: 'running',
        swiperInterval: remainingTime,
        swiperAutoPlay: this.props.autoPlay? true :false,
        totalPauseDuration:totalPauseDuration,
      });
    }
  }
});