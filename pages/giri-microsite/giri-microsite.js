Page({
  data: {},
  onLoad() {},
  onMessage(e) {
    const dataNative = { ...getApp().globalData.nativeData }
    console.info(dataNative + " dataNative yang dikirim dari dummy")
    if (e.detail.appId == "0100010000030010") {
      my.navigateToMiniProgram({
        appId: e.detail.appId,
        path: `/src/app/package_transaction/package_whoosh/gather-screen-whoosh/gather-screen-whoosh?customUrlQueryData=${e.detail.payload}`,
        query : {nativeData: JSON.stringify(dataNative)},
        extraData: {
          nativeData: JSON.stringify(dataNative),
          nativeDataAndroid: dataNative,
        },
      });
    } else {
      my.navigateToMiniProgram({
        appId: e.detail.appId,
        path: e.detail.path,
        query : {nativeData: JSON.stringify(dataNative)},
        extraData: {
          nativeData: JSON.stringify(dataNative),
          nativeDataAndroid: dataNative,
        },
      });
    }

  },
});
