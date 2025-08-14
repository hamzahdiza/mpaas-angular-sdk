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
  },
  async onLaunch(options) {

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
  }
});