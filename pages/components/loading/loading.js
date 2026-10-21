Page({
  data: {
    isLoading: Boolean(false)
  },
  onLoad() {
    setTimeout(() => {
      this.setData({
        isLoading: false
      })
    }, 3000);
    
    this.setData({
      isLoading: true
    })
  },
});
