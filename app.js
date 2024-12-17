import ConfigAndroid from "./configs/android_key_config.json"
import ConfigIOS from "./configs/ios_key_config.json"

App({
  globalData: {
    idleTimer: null,
    timeoutDuration: 10000, // 5 minutes
    data: {
      language: '',
      deviceId: '',
      refreshToken: '',
      accessToken: '',
      beEncryptPublicKey: '',
      beE2EEPublicKey: '',
      sessionKey: '',
      signingPrivateKey: '',
      signingPublicKey: '',
      userId: ''
    },
    platformOS: '',
    parameter: {
      clientRelease: '',
      clientPlatform: '',
      clientVersion: '',
      userAgent: '',
      authorization: ''
    },
    urlMicrosite: ""
  },
  async onLaunch(options) {
    var {
      platform
    } = my.getSystemInfoSync()

    // my.on('nativeToTiny', (resp) => {
    //   console.info('MAV_SUCCESS_CALL', JSON.stringify(resp))
    //   my.navigateTo({
    //     url: `/pages/gather/gather?data=${JSON.stringify(resp)}`,
    //     success: (res) => {
    //       console.info('MAV_NAVIGATE_SUCCESS', res)
    //     },
    //     fail: (err) => {
    //       console.info('MAV_ERROR', err)
    //     }
    //   })
    // })
    
    getApp().globalData.parameter.clientRelease = options.query['Client-Release']
    getApp().globalData.parameter.clientPlatform = options.query['Client-Platform']
    getApp().globalData.parameter.clientVersion = options.query['Client-Version']
    getApp().globalData.parameter.userAgent = options.query['User-Agent']
    getApp().globalData.parameter.authorization = options.query['Authorization']

    const config = platform == "iOS" ? ConfigIOS : ConfigAndroid

    const fetchConfigValues = async (config) => {
      return Promise.all(config.map((res) => {
        return new Promise((resolve, reject) => {
          const method = res.type == "plain" ? "getValueByKey" : "getSecureValueByKey";
          my.call(method, {
            key: res.value,
            success: (resp) => {
              getApp().globalData.data[res.key] = resp.data;
              resolve();
            },
            fail: (err) => {
              console.info('ERR_GET_DATA_INTERACTION', err)
              reject(err)
            }
          })
        })
      }))
    }

    await fetchConfigValues(config)


    // if (getApp().globalData.platformOS == "iOS") {
    //   ConfigIOS.map(async (res) => {
    //     if (res.type == 'plain') {
    //       await my.call("getValueByKey", {
    //         key: res.value,
    //         success: (resp) => {
    //           getApp().globalData.data[res.key] = resp.data
    //         }
    //       });
    //     } else {
    //       await my.call("getSecureValueByKey", {
    //         key: res.value,
    //         success: (resp) => {
    //           getApp().globalData.data[res.key] = resp.data
    //         },
    //       });
    //     }
    //   })
    // } else {
    //   ConfigAndroid.map(async (res) => {
    //     if (res.type == 'plain') {
    //       await my.call("getValueByKey", {
    //         key: res.value,
    //         success: (resp) => {
    //           getApp().globalData.data[res.key] = resp.data
    //         }
    //       });
    //     } else {
    //       await my.call("getSecureValueByKey", {
    //         key: res.value,
    //         success: (resp) => {
    //           getApp().globalData.data[res.key] = resp.data
    //         }
    //       });
    //     }
    //   })
    // }
  },

  // onHide() {
  //   clearTimeout(this.globalData.idleTimer);
  // },

  // onShow() {
  //   this.resetTimer();
  // },

  // resetTimer() {
  //   clearTimeout(this.globalData.idleTimer);
  //   this.globalData.idleTimer = setTimeout(() => {
  //     this.handleTimeout();
  //   }, this.globalData.timeoutDuration);
  // },

  // handleTimeout() {
  //   console.log("Inactive for 5 minutes. Handling timeout.");
  //   my.redirectTo({
  //     url: '/pages/signature/signature' // Redirect to a logout or information page
  //   });
  // }
});