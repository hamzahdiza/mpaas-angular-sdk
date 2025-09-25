Page({
  data: {},
  onLoad() {},
  onMessage(e) {
    const dataNative = {
      clientRelease: getApp().globalData.nativeData.clientRelease,
      clientPlatform: getApp().globalData.nativeData.clientPlatform,
      clientVersion: getApp().globalData.nativeData.clientVersion,
      userAgent: getApp().globalData.nativeData.userAgent,
      authorization: getApp().globalData.nativeData.authorization
    }

    my.navigateToMiniProgram({
      appId: "0100010000030010",
      path: `/src/app/package_transaction/package_whoosh/gather-screen-whoosh/gather-screen-whoosh?customUrlQueryData=${e.detail.payload}`,
      extraData: {
        nativeData: JSON.stringify(dataNative),
        nativeDataAndroid: dataNative,
      },
    });
  },
});
