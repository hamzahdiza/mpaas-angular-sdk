import {
  generateSign,
  generateUUID
} from '../../utils/generateSign.js'
import base64File from '../../utils/base64.json'

var tools = {
  encryptKey: (key, data) => 'MOCK_KEY_' + (data || ''),
  encryptData: (key, data) => (typeof data === 'object' ? JSON.stringify(data) : String(data || ''))
};

Page({
  data: {
    dataProt: "",
    protectedData: {
      dataProtected: ""
    },
    payload: {
      "type": "REDEEM",
      "productCode": "BZ002EQCDANSHM00",
      "productType": "EQTY",
      "accountNumber": "1000812721",
      "investmentAccount": "00395705.030",
      "amount": 15000
    },
    signature: '',
    encrypSessKey: '',
    reqID: '',
    response: '',
    private: "",
    public: "",
    prot: "",
    protString: "",
    pdfPath: "",
    header_json: {},
    base64File: ""
  },
  onLoad() {
    this.setData({
      reqID: generateUUID()
    })
  },

  encSessionKey() {
    this.setData({
      encrypSessKey: tools.encryptKey(getApp().globalData.data.beEncryptPublicKey, getApp().globalData.data.sessionKey)
    })
  },

  encPayload() {
    this.setData({
      dataProt: tools.encryptData(getApp().globalData.data.sessionKey, JSON.stringify(this.data.payload))
    })
  },

  dataProtect() {
    this.setData({
      'protectedData.dataProtected': this.data.dataProt
    })
  },

  sign() {
    this.setData({
      signature: generateSign(getApp().globalData.data.signingPrivateKey, getApp().globalData.data.signingPublicKey, JSON.stringify(this.data.protectedData))
    })
    // this.refreshToken()
  },

  refreshToken() {

    my.vibrateShort({
      type: "medium",
      success: function (res) {
        console.log(res);
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },

  callAPI() {
    this.setData({
      private: getApp().globalData.data.signingPrivateKey,
      public: getApp().globalData.data.signingPublicKey,
      prot: this.data.protectedData,
      protString: JSON.stringify(this.data.protectedData)
    })

    my.request({
      url: "https://mav-apigw-ext-test2.bni.co.id:48202/wealth-mf/v1/booking",
      method: "POST",
      data: {
        dataProtected: this.data.dataProt
      },
      headers: {
        "accept": "application/json",
        "authorization": getApp().globalData.parameter.authorization,
        "screen-id": "homeScreen",
        "channel-id": "MAVERICK",
        "scope": "POSTLOGIN",
        "device-id": getApp().globalData.data.deviceId,
        "request-id": this.data.reqID,
        "Mav-Authorization": getApp().globalData.data.accessToken,
        "User-Agent": getApp().globalData.parameter.userAgent,
        "Client-Release": getApp().globalData.parameter.clientRelease,
        "Client-Platform": getApp().globalData.parameter.clientPlatform,
        "Client-Version": getApp().globalData.parameter.clientVersion,
        "Accept-Language": getApp().globalData.data.language,
        "Enc-Session-Key": this.data.encrypSessKey,
        "Content-Type": "application/json"
      },
      success: (res) => {
        this.setData({
          response: JSON.stringify(res)
        })
        my.alert({
          title: 'SUCCESS CALL API',
          content: res
        })
      },
      fail: (err) => {
        my.alert({
          title: 'Error',
          content: err
        })
      }
    })
  },

  atob(a) {
    return Buffer.from(a, 'base64').toString('binary');
  },

  openDocument(filePath) {
    my.openDocument({
      filePath: filePath,
      fileType: 'pdf',
      success: () => console.log('Opening the document...'),
      fail: () => console.log('Failed to open the document...')
    });
  },

  base64ToArrayBuffer(base64) {
    const padding = '='.repeat((4 - base64.length % 4) % 4);
    const base64Actual = (base64 + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = this.atob(base64Actual);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray.buffer;
  },

  saveBase64AsFile(base64, fileName) {
    const arrayBuffer = this.base64ToArrayBuffer(base64);
    const filePath = `${my.env.USER_DATA_PATH}/${fileName}`;

    my.getFileSystemManager().writeFile({
      filePath: filePath,
      data: arrayBuffer,
      encoding: 'binary',
      success: (res) => {
        console.info('success saved', res)
        console.log('File saved successfully:', filePath);
        // Optionally, open or display the file here if needed
        this.openDocument(filePath);
      },
      fail: (err) => {
        console.error('Failed to save file:', err);
      }
    });
  },

  async previewPDF() {
    const base64raw = base64File.base64;
    const base64PDF = base64raw.replace("data:application/pdf;base64,", "");

    const fileName = "downloaded.pdf";
    console.info('MAV_base64_file', base64raw)
    console.info('MAV_base64_file', base64PDF)
    console.info('MAV_PATH', my.env.USER_DATA_PATH)

    // this.saveBase64AsFile(base64Pdf, fileName);
    let fs = my.getFileSystemManager();
    await my.downloadFile({
      url: base64PDF,
      header: {
        'Content-Type': 'application/pdf'
      },
      success(result) {
        console.info('MAV_download_success', result)
        const downPath = result.apFilePath;
        console.info('MAV_DOWNLOAD_PATH', downPath)
        my.openDocument({
          filePath: downPath,
          fileType: 'pdf',
          success: () => console.log('Opening the document...'),
          fail: () => console.log('Failed to open the document...')
        });
      },
      fail(err) {
        console.info('MAV_ERROR_DOWNLOAD', err)
      }
    });

  },


  async previewPDFAPI() {
    await my.request({
      url: "https://mav-apigw-ext-test2.bni.co.id:48202/wealth-mf/v1/files/BZ002EQCDANSHM00?type=FUND_FACT",
      method: "GET",
      dataType: "base64",
      headers: {
        "Authorization": getApp().globalData.parameter.authorization,
        "Screen-Id": "productDetailScreen",
        "Channel-Id": "MVR",
        "Device-Id": getApp().globalData.data.deviceId,
        "Request-Id": this.data.reqID,
        "Mav-Authorization": getApp().globalData.data.accessToken,
        "User-Agent": getApp().globalData.parameter.userAgent,
        "Client-Release": getApp().globalData.parameter.clientRelease,
        "Client-Platform": getApp().globalData.parameter.clientPlatform,
        "Client-Version": getApp().globalData.parameter.clientVersion,
        "Accept-Language": getApp().globalData.data.language,
        "Content-Type": "application/json"
      },
      success: (res) => {
        const base64raw = res.data;
        const base64PDF = base64raw.replace("data:application/pdf;base64,", "");
        my.downloadFile({
          url: base64PDF,
          header: {
            'Content-Type': 'application/pdf'
          },
          success(rest) {
            console.info('MAV_SUCCESS_DOWNLOAD_FILE', rest)
            const downPath = getApp().globalData.platformOS == "iOS" ? rest.apFilePath : rest.tempFilePath;
            my.openDocument({
              filePath: downPath,
              fileType: 'pdf',
              success: () => console.log('Opening the document...'),
              fail: () => console.log('Failed to open the document...')
            });
          },
          fail(error) {
            console.info('MAV_DOWNLOAD_ERROR', error)
          }
        })
      },
      fail: (err) => {
        throw new Error('MAV_ERROR_PERVIEW_ERROR', err)
      }
    })
  },
  navigateTo() {
    my.navigateTo({
      url: '/pages/gather/gather'
    })
  },

  navigateTo() {
    my.navigateTo({
      url: '/pages/maps/maps'
    })
  },

});