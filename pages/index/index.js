import {
  generateSign
} from '../../utils/generateSign.js'

var tools = require("../../utils/lib/e2ee.wsx")

const config = {
  "Android": require("./config/android_key_config.json"),
  "iOS": require("./config/ios_key_config.json")
};

const app = getApp();

Page({
  data: {
    buttSelected: '1M',
    currency: '',
    dataDetail: {
      oneMonthReturn: '5000'
    },
    computedClass: '',
    plain: {
      key: 'preferredLanguage'
    },
    secure: {
      key: 'deviceInfo'
    },
    dataProt: {
      dataProtected: ""
    },
    payload: {
      "type": "REDEEM",
      "productCode": "EL002EQCASHEKN00",
      "productType": "EQTY",
      "accountNumber": "231321312",
      "investmentAccount": "23132131",
      "amount": 500000
    },
    signature: '',
    inputValue: '',
    version: '',
    allData: '',
    firebase: {
      "groupId": "pfmHome",
      "event": [{
        "name": "AppClick",
        "value": "CreateNewAccount"
      }]
    }
  },
  onLoad() {},

  getValue(e) {
    my.call("getValueByKey", {
      params: this.data.plain,
      success: (res) => {
        let value = ""
        for (let key in this.data.config) {
          if (this.data.config[key] === res) {
            const splitResult = res.split('|');
            value = splitResult[1];
            break;
          }
        }
        my.alert({
          title: 'Plain Value',
          buttonText: 'Ok',
          content: value
        });
      },
      fail: (err) => {
        my.alert({
          title: 'Plain Value',
          buttonText: 'Ok',
          content: "Error " + JSON.stringify(this.data.config, null, 2) + err.errorMessage
        });
      }
    });
  },
  getSecureValue(e) {
    my.call("getSecureValueByKey", {
      params: this.data.secure,
      success: (res) => {
        let value = ""
        for (let key in this.data.config) {
          if (this.data.config[key] === res) {
            const splitResult = res.split('|');
            value = splitResult[1];
            break;
          }
        }
        my.alert({
          title: 'Secure Value',
          buttonText: 'Ok',
          content: value
        });
      },
      fail: (err) => {
        my.alert({
          title: 'Secure Value',
          buttonText: 'Ok',
          content: "Error " + JSON.stringify(this.data.config, null, 2) + err.errorMessage
        });
      }
    });
  },

  getData() {
    this.setData({
      allData: JSON.stringify(getApp().globalData.data)
    })
  },

  saveTransaction() {
    my.call("saveTransactionToken", {
      value: this.data.inputValue,
      success: (res) => {
        my.alert({
          title: 'Save Transaction',
          buttonText: 'Ok',
          content: res
        });
      },
      fail: (err) => {
        my.alert({
          title: 'Save Transaction',
          buttonText: 'Ok',
          content: err.errorMessage
        });
      }
    });
  },

  getParameter() {
    // const options = my.getLaunchOptionsSync();
    my.alert({
      title: 'Parameters',
      content: getApp().globalData.parameter
    })
  },

  navigateTo() {
    my.navigateTo({
      url: '/pages/signature/signature'
    })
  },

  navigateToJSAPI() {
    my.navigateTo({
      url: '/pages/allJSAPI/allJSAPI'
    })
  },

  navigateToWebView() {
    my.navigateTo({
      url: '/pages/maps/maps'
    })
  },
});