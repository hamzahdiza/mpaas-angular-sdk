Page({
  data: {
      visible : false,
      visibleWithBack: false,
      visibleWithBack2:false,
      dotIndex: 1,
  },
  onLoad() {},
  handleButtonWithoutBack() {
    if(this.data.visible){
      this.setData({
        visible:false
      })
    } else {
      this.setData({
        visible:true
      })
    }
  },
  onTestButtonWithoutBack(){
    this.setData({
      visible:false
    })
  },
  onTestButtonWithBack() {
    if(this.data.dotIndex > 1){
      if(this.data.visibleWithBack2){
        this.setData({
          visibleWithBack2:false
        })
      }
    }else {
      this.setData({
        dotIndex: this.data.dotIndex + 1,
        visibleWithBack: false,
        visibleWithBack2: true
      })
    }
  },
  onHandleBackButton(){
    if(this.data.dotIndex > 0){
      switch(this.data.dotIndex) {
        case 1:
        this.setData({
          visibleWithBack:false
        })
        break;
        case 2:
          this.setData({
            visibleWithBack:true,
            visibleWithBack2:false
          })
          break;
        default:

      }
      this.setData({
        dotIndex: this.data.dotIndex - 1
      })
    }
   
  },
  onHandleButtonWithBack(){
    this.setData({
      visibleWithBack:true,
      dotIndex:1
    })
  }
});
