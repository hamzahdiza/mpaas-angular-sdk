Page({
  data: {
    progressLoading: true,
    
    paragraph: {
      rows: 7
    }
  },
  onLoad() {

    setTimeout(() => {
      this.setData({
        progressLoading: false

      });
    }, 2000);
  },

});
