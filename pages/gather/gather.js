Page({
  data: {
    inputValue: "",
    dataPages: "",
    isFetching: true
  },
  onLoad(query) {
    console.info(getApp().globalData.nativeData.allOptions);

    setTimeout(() => {
      this.setData({
        dataPages: query.data ? JSON.parse(query.data) : "",
        isFetching: false,
        dataNative: JSON.stringify(getApp().globalData.nativeData.allOptions)
      })
    }, 4000)
  },
});