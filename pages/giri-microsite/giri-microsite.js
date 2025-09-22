Page({
  data: {},
  onLoad() {},
  onMessage(e) {
    const appId = e.detail.appId
    const path = e.detail.path
    
    my.navigateToMiniProgram({
      appId: appId,
      path: path
    });
  },
});
