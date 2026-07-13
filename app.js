const iosKeysConfig = require("/configs/ios_key_config.json");
const androidKeysConfig = require("/configs/android_key_config.json")

import {
  encryptSessionKey,
  createKey
} from "/utils/e2ee";

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
      userId: String(""),
      setServiceStatus: {
        rspFeatureOn: "default",
        rspCreationFeatureOn: "default",
        rspModifyFeatureOn: "default",
        rspCancelFeatureOn: "default"
      }
    },
    launchParams: {
      clientRelease: String(""),
      clientPlatform: String(""),
      clientVersion: String(""),
      userAgent: String(""),
      authorization: String("")
    },

    idleTimer: null,
    countdownTimer: null,
    idleTimeoutDuration: 5000,
    currentCountdown: 5,
    onCountdownUpdate: null,
  },
  async onLaunch(options) {
    this.startGlobalIdleTimer();
    // const options = {
    //   query: {
    //     ClientPlatform: "ios",
    //     ClientRelease: "random",
    //     wealthFeatureOn: "true",
    //     wealthTransactionFeatureOn: "true",
    //     wealthMfFeatureOn: "true",
    //     wealthMfTransactionFeatureOn: "true",
    //     wealthBondsFeatureOn: "true",
    //     wealthBondsTransactionFeatureOn: "true",
    //     tab: "MUTUAL_FUNDS",
    //     wealthRSPFeatureServiceOn: "true",
    //     wealthRSPCreationFeatureServiceOn: "true",
    //     wealthRSPModifyFeatureServiceOn: "true",
    //     wealthRSPCancelFeatureServiceOn: "true",
    //     subTypeCode: "MM",
    //     currency: "USD"
    //   }
    // };
    if (options.query) {
      this.globalData.nativeData.allOptions = options.query
      this.globalData.nativeData.clientRelease = options.query["Client-Release"];
      this.globalData.nativeData.clientPlatform = options.query["Client-Platform"];
      this.globalData.nativeData.clientVersion = options.query["Client-Version"];
      this.globalData.nativeData.userAgent = options.query["User-Agent"];
      this.globalData.nativeData.authorization = options.query["Authorization"];
      if (options.query.lifestyleFeatureOn) {
        this.globalData.nativeData.lifestyleFeatureOn =
          options.query.lifestyleFeatureOn.toLowerCase() == "true";
      }
      if (options.query.lifestyleBillPaymentFeatureOn) {
        this.globalData.nativeData.lifestyleBillPaymentFeatureOn =
          options.query.lifestyleBillPaymentFeatureOn.toLowerCase() == "true";
      }
      if (options.query.lifestyleVirtualAccountFeatureOn) {
        this.globalData.nativeData.lifestyleVirtualAccountFeatureOn =
          options.query.lifestyleVirtualAccountFeatureOn.toLowerCase() == "true";
      }
      this.globalData.nativeData.mdidn = options.query.mdidn
      this.globalData.nativeData.transactionType = options.query.transactionType
      this.globalData.nativeData.title = options.query.title
    }

    var {
      platform
    } = my.getSystemInfoSync()

    let keysConfig = platform === "iOS" ? iosKeysConfig : androidKeysConfig;

    configureKeys(keysConfig).then(() => {
      if (getApp().globalData.nativeData.userId !== "") {
        getApp().globalData.languagePack = languagePacks.languagePack[getApp().globalData.nativeData.language]
      }
    })

    getApp().globalData.launchParams.clientRelease = options.query['Client-Release']
    getApp().globalData.launchParams.clientPlatform = options.query['Client-Platform']
    getApp().globalData.launchParams.clientVersion = options.query['Client-Version']
    getApp().globalData.launchParams.userAgent = options.query['User-Agent']
    getApp().globalData.launchParams.authorization = options.query['Authorization']


    getApp().globalData.nativeData.sessionKey = createKey()
    getApp().globalData.languagePack = languagePacks.languagePack[this.globalData.nativeData.language] || {};


    const serviceConfigMap = {
      "app.config.wealth.rsp.feature.service.key": "rspFeatureOn",
      "app.config.wealth.rsp.creation.feature.service.key": "rspCreationFeatureOn",
      "app.config.wealth.rsp.modify.feature.service.key": "rspModifyFeatureOn",
      "app.config.wealth.rsp.cancel.feature.service.key": "rspCancelFeatureOn"
    };
    const rspServiceKeys = Object.keys(serviceConfigMap);
    const that = this;

    console.info(rspServiceKeys, "<<< RSP rspServiceKeys")
    my.call("getAppConfig", {
      keys: rspServiceKeys
    }, (configResponse) => {
      console.info(configResponse, "<<< RSP configResponse")
      for (const configKey in configResponse) {
        if (Object.prototype.hasOwnProperty.call(configResponse, configKey)) {
          const serviceName = configResponse[configKey];
          const propertyName = serviceConfigMap[configKey];
          console.info(serviceName, "<<< RSP serviceName")
          console.info(propertyName, "<<< RSP propertyName")

          if (serviceName && propertyName) {
            my.call("getServiceStatus", {
              serviceName: serviceName
            }, (statusResponse) => {
              console.info(statusResponse, "<<< RSP statusResponse")
              const status = statusResponse === true || statusResponse === 'true';

              console.info(propertyName, "<<< propertyName:");
              console.info(status, "<<< status:");
              if (!that.globalData.nativeData.setServiceStatus) {
                that.globalData.nativeData.setServiceStatus = {};
              }

              that.globalData.nativeData.setServiceStatus[propertyName] = status;
            });
          }
        }
      }
    });

    // keysConfig.forEach((item) => {
    //   if (item.type === "plain") {
    //     my.call(
    //       "getValueByKey", {
    //         key: item.nativeKey,
    //       },
    //       (res) => {
    //         this.globalData.nativeData[item.key] = res.data;
    //         if (item.key === "language") {
    //           this.globalData.languagePack =
    //             languagePacks.languagePack[this.globalData.nativeData.language];
    //           this.globalData.dayjsLocale =
    //             this.globalData.nativeData.language == "en-ID" ? "en" : "id";
    //         }
    //       }
    //     );
    //   } else {
    //     my.call(
    //       "getSecureValueByKey", {
    //         key: item.nativeKey,
    //       },
    //       (res) => {
    //         this.globalData.nativeData[item.key] = res.data;
    //         if (item.key === "beEncryptPublicKey") {
    //           this.globalData.nativeData.encSessionKey = encryptSessionKey(
    //             this.globalData.nativeData.beEncryptPublicKey,
    //             this.globalData.nativeData.sessionKey
    //           );
    //         }
    //       }
    //     );
    //   }
    // })
  },

  startGlobalIdleTimer() {
    this.clearGlobalIdleTimer();

    this.globalData.currentCountdown = this.globalData.idleTimeoutDuration / 1000;

    if (this.globalData.onCountdownUpdate) {
      this.globalData.onCountdownUpdate(this.globalData.currentCountdown);
    }

    this.globalData.countdownTimer = setInterval(() => {
      this.globalData.currentCountdown--;
      if (this.globalData.onCountdownUpdate) {
        this.globalData.onCountdownUpdate(this.globalData.currentCountdown);
      }

      if (this.globalData.currentCountdown <= 0) {
        this.clearGlobalIdleTimer();
        this.onUserIdle();
      }
    }, 1000);
  },

  clearGlobalIdleTimer() {
    if (this.globalData.countdownTimer) {
      clearInterval(this.globalData.countdownTimer);
      this.globalData.countdownTimer = null;
    }
    if (this.globalData.idleTimer) {
      clearTimeout(this.globalData.idleTimer);
      this.globalData.idleTimer = null;
    }
  },

  onUserIdle() {
    console.log("Global: User detected idle for 5 seconds!");
    my.showToast({
      type: 'none',
      content: 'Sesi berakhir karena tidak ada aktivitas.',
      duration: 2000
    });

    my.call("goToSplashScreen", {
      success: (res) => {
        my.alert({
          title: 'success',
          content: res
        });
      }
    })
  }
});