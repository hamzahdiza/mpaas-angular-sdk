const FormData = require("../../../utils/FormData/formData")

Page({
  data: {
    refreshTimes: 0
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onShow() {
    this.setData({
      refreshTimes: this.data.refreshTimes + 1
    })
  },
  chooseFile() {
    my.chooseFileFromDisk({
      success: (res) => {
        my.alert({
          content: JSON.stringify(res)
        })
        my.uploadFile({
          url: 'http://110.42.233.152/apibuilder/file/upload',
          filePath: res.apFilePath,
          name: "file",
          formData: {
            fileName: "fileNameFromParam.txt"
          },
          success(uploadRes) {
            my.alert({
              title: "upload succ",
              content: JSON.stringify(uploadRes.data)
            })
          },
          fail(err) {
            my.alert({
              title: "upload fail",
              content: JSON.stringify(err)
            })
          },
        })
      },
      fail: (result) => {
        my.alert({
          content: JSON.stringify(result)
        })
      }
    })
  },
  navigateToTarget() {
    const nativeData = {
      "clientRelease": "",
      "clientPlatform": "ios",
      "clientVersion": "3.2.41",
      "userAgent": "Maverick-IT(3.2.41-1) x86_64 iOS/17.0 CFNetwork/1.0 Darwin/23.5.0 Model: Simulator iPhone15,4",
      "authorization": "Basic OTBmYWI1NzktNzJhYi00ZjNmLWExOGMtODgyZmNhNTgwN2E3OmE1NzFmMmQ5LWQ5OGUtNDRkMi04YWJjLTM3ZDgzZjQ0ZTE0YQ=="
    }
    const partnerMenu = {
      "id": "jM3p1F8fXAQV9zRr4ek6uIDcb2X7QdCKxbo4",
      "position": 5,
      "transactionType": "jjf",
      "paymentType": "BILL_PAYMENT",
      "category": "event",
      "icon": "http://asset-service-comp-dev2.apps.jtl-dev.maverick.ocp.hq.bni.co.id/asset/v1/image/ipV2Q7CD2ezcYp78BiHML.png",
      "displayImage": "http://asset-service-comp-test2.apps.jtl-dev.maverick.ocp.hq.bni.co.id/asset/v1/image/BXQeXWap2hpNtdsQc1VvF.png"
    }
    my.navigateToMiniProgram({
      appId: '5000000000000002',
      path: 'pages/common/index/index',
      extraData:{
        nativeData: nativeData,
        partnerMenu: partnerMenu
      },
      success: (res) => {
        console.log(JSON.stringify(res))
      },
      fail: (res) => {
        console.log(JSON.stringify(res))
      }
    })
  },
  closeMiniProgram() {
    my.call("closeMiniProgram", {appId: '2024011700000001'}, ()=>{} )
  },
  exitTinyApp() {
    console.log(222)
    my.call("exitTinyApp",{}, ()=>{})
  },
  exitApp() {
    console.log(333)
    my.call("exitApp",{}, ()=>{})
  },
  navigateToWebview() {
    my.navigateTo({
      url: '/pages/appDemoAnt/webview/webview'
    })
  }
});