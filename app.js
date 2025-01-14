import ConfigAndroid from "./configs/android_key_config.json"
import ConfigIOS from "./configs/ios_key_config.json"
import languagePacks from "./configs/language-pack.json"
import {
  encryptSessionKey,
  createKey
} from "/utils/lib/e2ee"

function configureKeys(platformConfig) {
  return Promise.all(platformConfig.map((configItem) => {
    const method = configItem.type === 'plain' ? "getValueByKey" : "getSecureValueByKey";
    return my.call(method, {
      key: configItem.nativeKey,
    }, (resp) => {
      getApp().globalData.nativeData[configItem.key] = resp.data;
    });
  }));
}

App({
  globalData: {
    languagePack: Object({}),
    nativeData: {
      language: String(""),
      deviceId: String(""),
      refreshToken: String(""),
      accessToken: String(""),
      beEncryptPublicKey: String(""),
      beE2EEPublicKey: String(""),
      sessionKey: String(""),
      signingPrivateKey: String(""),
      signingPublicKey: String(""),
      userId: String("")
    },
    launchParams: {
      clientRelease: String(""),
      clientPlatform: String(""),
      clientVersion: String(""),
      userAgent: String(""),
      authorization: String("")
    }
  },
  async onLaunch(options) {

    if (options.query) {
     this.globalData.launchParams.clientRelease = options.query['Client-Release']
     this.globalData.launchParams.clientPlatform = options.query['Client-Platform']
     this.globalData.launchParams.clientVersion = options.query['Client-Version']
     this.globalData.launchParams.userAgent = options.query['User-Agent']
     this.globalData.launchParams.authorization = options.query['Authorization']
    }

    this.globalData.nativeData.sessionKey = createKey()


    var {
      platform
    } = my.getSystemInfoSync()

    const config = platform == "iOS" ? ConfigIOS : ConfigAndroid

    configureKeys(config).then(() => {
      if (getApp().globalData.nativeData.userId !== "") {
        this.globalData.languagePack = languagePacks.languagePack[getApp().globalData.nativeData.language]
      } 

      if (getApp().globalData.nativeData.beEncryptPublicKey !== "") {
        this.globalData.nativeData.encSessionKey = encryptSessionKey(
          this.globalData.nativeData.beEncryptPublicKey,
          this.globalData.nativeData.sessionKey
        );
      }
    })






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