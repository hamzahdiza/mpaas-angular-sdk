Page({
  data: {
    urlMicrosite: "https://mpaas.vercel.app/webview-test.html",
    // urlMicrosite: "https://poinplusuat.giift.com/testuser.aspx"
  },
  onLoad() {
    this.webViewContext = my.createWebViewContext('web-view-1'); 
  },
  setToken(){
    const tokenUrl = "Wsk9X0uNZk9d1z- contoh token"
    this.webViewContext.postMessage({'token': tokenUrl});
  },
});
