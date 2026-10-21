Page({
  data: {
    fullPageLoading:false,
    isLoading: true,
    isFail:false,
    failMessage:{
      en: "Reload",
      id: "Muat Ulang"
    }
  },
  onLoad() {},
  openFullLoading(){
    this.setData({
      fullPageLoading:true
    })
  },
  closeFullLoading(){
    this.setData({
      fullPageLoading:false
    })
  },
  handleLoading(){
    this.setData({
      isLoading:!this.data.isLoading,
      isFail:false
    })
  },
  simulateFail(){
    const isFail = this.data.isFail
    const isLoading = !isFail?false:true
    this.setData({
      isLoading, 
      isFail: !isFail
    })
  },
  handleReload(){
    this.setData({
      isFail:false,
      isLoading: true
    })
  }
});
