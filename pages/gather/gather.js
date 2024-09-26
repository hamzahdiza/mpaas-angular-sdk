Page({
  data: {
    inputValue: "",
    dataPages: "",
  },
  onLoad(query){
    this.setData({
      dataPages: query.data ? JSON.parse(query.data) : "" 
    })
  },
});