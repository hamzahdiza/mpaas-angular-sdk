Page({
  data: {
    basicVisible: false
  },
  onLoad({
    title
  }) {
    const transactions = new Array(5).fill(null).map((_, index) => {
      return {
        id: index,
        content: `Transaction ${index}`,
        color: `rgb(${(Math.random()*255).toFixed(0)},${(Math.random()*255).toFixed(0)},${(Math.random()*255).toFixed(0)})`
      }
    })
    this.setData({
      title,
      transactions
    })
  },
  tapOkay(){
    this.setData({
      transactions: [...this.data.transactions.slice(0, -1)]
    })
  },
  tapEdit(){
    this.setData({
      basicVisible: true
    })
  },
  onClosePopup(){
    this.setData({
      basicVisible:false
    })
  }
});
