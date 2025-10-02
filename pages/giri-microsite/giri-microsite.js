Page({
  data: {},
  onLoad() {},
  onMessage(e) {
    const dataNative = { ...getApp().globalData.nativeData }

    if (e.detail.appId == "0100010000030010") {
      my.navigateToMiniProgram({
        appId: e.detail.appId,
        path: `/src/app/package_transaction/package_whoosh/gather-screen-whoosh/gather-screen-whoosh?customUrlQueryData=${e.detail.payload}`,
        extraData: {
          nativeData: JSON.stringify(dataNative),
          nativeDataAndroid: dataNative,
        },
      });
    } else {
      my.navigateToMiniProgram({
        appId: e.detail.appId,
        path: e.detail.path,
        extraData: {
          nativeData: JSON.stringify(dataNative),
          nativeDataAndroid: dataNative,
        },
      });
    }

  },
});
