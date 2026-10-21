import decimal from "/src/utils/helpers/decimal";

/* JShield-obfus:enable */
Component({
  mixins: [],
  data: {
    centerX: 1950,
    centerY: 1716,
    radius: 1200,
    canvasWidth: 3900,
    canvasHeight: 3300,
    context: null,
    total: 0,
    iconSize: 288,
    position: null,
    tempProps: {
      data: {
        data: [],
        color: [],
        iconUrls: [],
      },
    },
    isShowLoding: false,
    isDrawing: false,
    currentIndex: -1,
  },
  props: {
    data: {
      data: [],
      color: [],
      iconUrls: [],
    },
    title: "Pie Chart",
    isRedraw: false,
    onSelect: () => { },
  },
  onInit() {
    this.init();
  },
  didMount() {
    this.init();
    if (this.props.data && this.props.data.data && this.props.data.data.length > 0) {
      const total = this.props.data.data.reduce((accumulator, currentValue) => {
        return decimal().plus(accumulator, currentValue);
      }, 0);
      this.setData({
        "tempProps.data": this.props.data,
        total
      });
      setTimeout(() => {
        this.drawPieChart(false);
      }, 80);
    }
  },
  didUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.data.currentIndex = -1;
      if (this.props.data && (JSON.stringify(this.props.data) !== JSON.stringify(this.data.tempProps.data))) {
        this.setData({
          "tempProps.data": this.props.data,
          total: this.props.data.data.reduce((accumulator, currentValue) => {
            return decimal().plus(accumulator, currentValue);
          }, 0)
        });
        this.drawPieChart(true);
    } else if (this.props.isRedraw && !this.data.isShowLoding) {
        this.drawPieChart(true);
      } else if (!this.props.isRedraw && !this.data.isDrawing) {
        this.setData({
          isShowLoding: false
        });
      }
  }
  },
  didUnmount() { 
  },
  methods: {
    init() {
      const canvasId = `chart-canvas-${this.$id}`;
      this.setData({
        context: my.createCanvasContext(canvasId)
      });
      // my.createSelectorQuery()
      //  .select(`#${canvasId}`)
      //  .boundingClientRect()
      //  .exec((res) => {
      //   this.setData({
      //     position: res[0],
      //   });
      // });
    },
    drawPieChart(isAnimate, clickIndex = undefined) {
      if (this.data.isDrawing || this.props.data.data.length == 0 || this.data.total == 0) {
        this.data.isDrawing = false
        return
      }
      this.data.isDrawing = true
      
      this.clear();
      let startAngle = -Math.PI / 2;
      for (let i = 0; i < this.props.data.data.length; i++) {
        const proportion = decimal().divide(this.props.data.data[i], this.data.total);
        const sliceAngle = proportion * Math.PI * 2;
        const endAngle = startAngle + sliceAngle;

        if (clickIndex != undefined) {
          if (clickIndex === i) {
            this.drawChild(i, startAngle, endAngle, 1 * this.data.radius, false, false);
            this.drawChild(i, startAngle, endAngle, 1.12 * this.data.radius, false, true);
          } else {
            this.drawChild(i, startAngle, endAngle, this.data.radius, false, true);
          }
        } else {
          this.drawChild(i, startAngle, endAngle, this.data.radius, false, false);
        }
        if (this.props.data.data.length > 1) {
          this.whiteLine(endAngle);
        }

        if (proportion >= 0.1) {
          const angle = startAngle + sliceAngle / 2;
          const iconX = this.data.centerX + this.data.radius * 0.73 * Math.cos(angle);
          const iconY = this.data.centerY + this.data.radius * 0.73 * Math.sin(angle);
          this.data.context.drawImage(
            this.props.data.iconUrls[i],
            iconX - this.data.iconSize / 2,
            iconY - this.data.iconSize / 2,
            this.data.iconSize,
            this.data.iconSize
          );
        }
        startAngle += sliceAngle;
      }
      // draw a white circle in center make the chart ring
      const context = this.data.context;
      context.beginPath();
      context.moveTo(this.data.centerX, this.data.centerY);
      context.arc(this.data.centerX, this.data.centerY, this.data.radius * 0.5, 0, 2 * Math.PI);
      context.fillStyle = "#FFF";
      context.fill();

      this.draw(true, isAnimate)
    },
    drawChild(i, startAngle, endAngle, _radius, isdraw = true, isTransparency) {
      const context = this.data.context;
      // draw pie with color and angle
      context.beginPath();
      context.moveTo(this.data.centerX, this.data.centerY);
      context.arc(this.data.centerX, this.data.centerY, _radius, startAngle, endAngle);
      context.fillStyle = this.props.data.color[i] + (isTransparency ? "80" : "");
      context.fill();

      if (isdraw) {
        this.draw(true);
      }
    },
    handleCanvasClick(event) {
      if (!this.data.position || (this.data.position.width == 0 || this.data.position.height == 0)) {
        const canvasId = `chart-canvas-${this.$id}`;
        my.createSelectorQuery()
        .select(`#${canvasId}`)
        .boundingClientRect()
        .exec((res) => {
         this.setData({
           position: res[0],
         });
         this.judgeClickEvent(event);
       });
      } else {
        this.judgeClickEvent(event);
      }
    },
    judgeClickEvent(event) {
      const x = event.detail.x;
      const y = event.detail.y;
      const ratio = this.data.position.width / this.data.canvasWidth;
      let xp = x - this.data.centerX * ratio;
      let yp = y - this.data.centerY * ratio;
      // const radiusRatio = (Math.min(this.data.position.height, this.data.position.width) / 2) * this.data.ratio ;
      const radiusRatio = this.data.radius * ratio;
      const len = this.calculateDistance(yp, xp);
      let angle = 0;
      let startAngle = 0;

      let temp = xp
      xp = -yp
      yp = temp

      if (xp >= 0 && yp >= 0) {
        angle = Math.atan2(yp, xp);
      }
      if (xp <= 0 && yp >= 0) {
        angle = Math.atan2(yp, xp);
      }
      if (xp <= 0 && yp <= 0) {
        angle = 2 * Math.PI + Math.atan2(yp, xp);
      }
      if (xp >= 0 && yp <= 0) {
        angle = 2 * Math.PI + Math.atan2(yp, xp);
      }

      for (let i = 0; i < this.props.data.data.length; i++) {
        const endAngle = startAngle + (this.props.data.data[i] / this.data.total) * Math.PI * 2;
        const isInSlice =
          angle > startAngle &&
          angle < endAngle &&
          len > radiusRatio * 0.5 &&
          len <= radiusRatio * 1;

        if (isInSlice) {
          if (i == this.data.currentIndex) {
            this.data.currentIndex = -1;
            this.props.onSelect(-1);
            this.drawPieChart(false);
            break;
          } else {
            this.data.currentIndex = i;
            this.props.onSelect(i);
            this.drawPieChart(false, i);
            break;
          }

        }

        startAngle = endAngle;
      }
      // click blank, cancle highlight
      if (!(len > radiusRatio * 0.5 && len <= radiusRatio * 1)) {
        this.data.currentIndex = -1;
        this.drawPieChart(false);
        this.props.onSelect(-1);
      }
    },
    drawTitle() {
      this.data.context.setFont("700 64px/76.8px TT Interphases Pro")
      this.data.context.fillText(this.props.title, 0, 64);
      this.data.context.draw(true)
    },
    draw(bool = false, isAnimation = false) {
      const context = this.data.context;
      context.draw(bool,(() =>{
        this.data.isDrawing = false
        if (isAnimation && this.props.isRedraw) {
          this.setData({
            isShowLoding: true
          })
        }
      }));
    },
    clear() {
      this.data.context.clearRect(0, 0, this.data.canvasWidth, this.data.canvasHeight);
    },
    calculateDistance(l1, l2) {
      const distance = Math.sqrt(l1 * l1 + l2 * l2);
      return distance;
    },
    whiteLine(angle) {
      // draw white line between pie
      const context = this.data.context;
      context.beginPath();
      context.moveTo(this.data.centerX, this.data.centerY);
      context.arc(this.data.centerX, this.data.centerY, this.data.radius * 1.12, angle, angle);
      context.setStrokeStyle("#FFF");
      context.lineWidth = 12;
      context.stroke();
    },
  }
});
/* JShield-obfus:disable */