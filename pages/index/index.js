import {
  generateSign
} from '../../utils/generateSign.js'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import {
  customFormatDate,
  dateFormat
} from '/utils/dateformat.js';

// dayjs.locale('id');

var tools = require("../../utils/lib/e2ee.wsx")
const {
  flag,
  code,
  name,
  countries
} = require('country-emoji');

const config = {
  "Android": require("./config/android_key_config.json"),
  "iOS": require("./config/ios_key_config.json")
};

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
    inputPhoneNumberValue: '',
    version: '',
    allData: "",
    firebase: {
      "groupId": "pfmHome",
      "event": [{
        "name": "AppClick",
        "value": "CreateNewAccount"
      }]
    },
    startPeriod: '',
    endPeriod: '',
    flag: '',
    inputValueRsp: ""
  },
  onLoad() {
    this.setData({
      flag: flag('ID')
    })

    setTimeout(() => {
      console.info('JSAPI_ALLDATA', JSON.stringify(getApp().globalData.nativeData))
    }, getApp().globalData.nativeData.userId ? 0 : 1500);

    const startDate = customFormatDate('2024-08-12 00:00:00.000+0700', 'id', '{DD} {MMM} {YYYY} {HH}:{mm} WIB')
    console.info(startDate)
    const endDate = customFormatDate('2024-12-19 23:59:59.999+0700', 'id', '{DD} {MMMM} {YYYY} {HH}:{mm} WIB')

    this.setData({
      startPeriod: startDate,
      endPeriod: endDate,
    })
  },

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
      allData: JSON.stringify(getApp().globalData.nativeData)
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
    this.setData({
      allData: JSON.stringify(getApp().globalData.launchParams)
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
  navigateToUploadPdf() {
    my.navigateTo({
      url: '/pages/upload-pdf/upload-pdf'
    })
  },
  navigateToOpenUrl() {
    my.navigateTo({
      url: '/pages/openUrl/openUrl'
    })
  },
  navigateToOpenUrl() {
    getApp().globalData.urlMicrosite = this.data.inputValue
    my.navigateTo({
      url: `/pages/microsite/webview/webview`
    })
  },
  navigateToOpenUrlUndian() {
    getApp().globalData.urlMicrosite = this.data.inputValue
    my.navigateTo({
      url: "/pages/microsite/webview-undian-rejeki/webview-undian-rejeki"
    })
  },

  handleInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  handleInputPhone(e) {
    this.setData({
      inputPhoneNumberValue: e.detail.value
    })
  },

  handlePhone() {
    console.log(this.data.inputPhoneNumberValue, "<<< inputPhoneNumberValue");

    my.makePhoneCall({
      number: `${this.data.inputPhoneNumberValue}`,

      success: (res) => {
        console.info(res, "<<< RES PHONE")
      },
      fail: (err) => {
        my.alert({
          content: "Error " + JSON.stringify(err)
        })
      }
    })
  },

  exitMiniprogram() {
    console.info("exitMiniprogram")
    my.call("exitTinyApp", {}, () => {})
  },

  goToAppDemo() {
    my.navigateTo({
      url: "/pages/appDemoAnt/index/index"
    })
  },

  checkContact() {
    // my.choosePhoneContact({
    //   success: (res) => {
    //     console.info('Name:' + res.name + '\nPhone number:' + res.mobile)
    //   },
    // });
    my.navigateTo({
      url: "/pages/contact/contact"
    })
  },

  handleInputRsp(e) {
    this.setData({
      inputValueRsp: e.detail.value
    })
  },

  toRspIntroduction(){
    console.log(this.data.inputValueRsp, "<<< Index input Rsp");
    getApp().globalData.inputValueRsp = this.data.inputValueRsp
    my.navigateTo({
      url:"/pages/rsp-introduction-screen/rsp-introduction-screen",
    })
  }
});