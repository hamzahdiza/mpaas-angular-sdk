import ConfigAndroid from "./configs/android_key_config.json"
import ConfigIOS from "./configs/ios_key_config.json"
import languagePacks from "./configs/language-pack.json"

import {
  encryptSessionKey,
  createKey
} from "/utils/e2ee";

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
  onLaunch(options) {

    if (options.query) {
      this.globalData.launchParams.clientRelease = options.query['Client-Release']
      this.globalData.launchParams.clientPlatform = options.query['Client-Platform']
      this.globalData.launchParams.clientVersion = options.query['Client-Version']
      this.globalData.launchParams.userAgent = options.query['User-Agent']
      this.globalData.launchParams.authorization = options.query['Authorization']
    }

    this.globalData.nativeData.sessionKey = tools.createKey()
    this.globalData.languagePack = languagePacks.languagePack[this.globalData.nativeData.language]

    let keysConfig =
      this.globalData.nativeData.clientPlatform === "ios" ? ConfigIOS : ConfigAndroid;

    keysConfig.forEach((item) => {
      if (item.type === "plain") {
        my.call(
          "getValueByKey", {
            key: item.nativeKey,
          },
          (res) => {
            this.globalData.nativeData[item.key] = res.data;
            if (item.key === "language") {
              this.globalData.languagePack =
                languagePacks.languagePack[this.globalData.nativeData.language];
              this.globalData.dayjsLocale =
                this.globalData.nativeData.language == "en-ID" ? "en" : "id";
            }
          }
        );
      } else {
        my.call(
          "getSecureValueByKey", {
            key: item.nativeKey,
          },
          (res) => {
            this.globalData.nativeData[item.key] = res.data;
            if (item.key === "beEncryptPublicKey") {
              this.globalData.nativeData.encSessionKey = encryptSessionKey(
                this.globalData.nativeData.beEncryptPublicKey,
                this.globalData.nativeData.sessionKey
              );
            }
          }
        );
      }
    })
  }
});