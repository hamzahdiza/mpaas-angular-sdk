Page({
  data: {
    urlDummy: ""
  },
  onLoad() {

  },

  handleTapJsApi() {
    my.call("openURL", {
      url: "https://maps.app.goo.gl/AAQU1YmX3M3i9SPm9",
      success: (res) => {
        console.info(res, "<<< Open URL Success");
        my.alert({
          content: 'success: ' + JSON.stringify(res)
        });
      },
      fail: (res) => {
        console.info(res, "<<< Open URL Error");
        my.alert({
          content: 'Error: ' + JSON.stringify(res)
        });
      }
    });
  }
});