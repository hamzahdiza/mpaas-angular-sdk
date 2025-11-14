Page({
  data: {
    webUrl: 'https://www.google.com', 
    receivedData: '' 
  },

  onLoad(options) {
    console.log('Parameter yang diterima:', options);

    const inputData = options.data; 

    if (inputData) {
      this.setData({
        receivedData: inputData,
        webUrl: 'https://m.alipay.com',
      });
    } else {
      this.setData({
        receivedData: 'Tidak ada data input yang diterima.',
        webUrl: 'https://www.alipay.com' 
      });
    }
  },
});