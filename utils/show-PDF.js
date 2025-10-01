import { generateUUID } from "./number-util";
/**
 * use to show PDF
 * @param {*} url  -- pdf url
 */
export default function showPDF(url, that) {
  my.call("enableSwipe", { isSwipe: false }, () => { })
  that.setData({
    lottieLoading: true
  })

  if ('ios' === getApp().globalData.nativeData.clientPlatform) {
    showPdfOnIos(url, that)
  } else {
    showPdfOnAndroid(url, that)
  }
}

async function showPdfOnAndroid(url, that) {
  await my.downloadFile({
    url: url,
    timeout: 120000,
    header: createHeaders(),
    success(res) {
      processSuccess(res.tempFilePath, that)
    },
    fail() {
      processFail(that)
    },
    complete() {
      processComplete(that)
    }
  })
}

async function showPdfOnIos(url, that) {
  await my.request({
    url: url,
    dataType: "base64",
    timeout: 120000,
    headers: createHeaders(),
    success(res) {
      let base64Str = res.data.replace("data:application/pdf;base64,", "")
      my.downloadFile({
        url: base64Str,
        header: {
          'Content-Type': 'application/pdf'
        },
        success(rest) {
          processSuccess(rest.apFilePath, that)
        },
        fail() {
          processFail(that)
        },
        complete() {
          processComplete(that)
        }
      })
    },
    fail() {
      processFail(that)
    },
    complete() {
      processComplete(that)
    }
  })
}

function createHeaders() {
  const global = getApp().globalData.nativeData;
  const headers = {
    'Authorization': global.authorization,
    'Mav-Authorization': global.accessToken,
    'Accept-Language': global.language,
    'Request-Id': generateUUID(),
    "Screen-Id": "productDetailScreen",
    'User-Agent': global.userAgent,
    'Client-Release': global.clientRelease,
    'Client-Platform': global.clientPlatform,
    'Client-Version': global.clientVersion,
    'Channel-Id': 'MVR',
    'Device-Id': global.deviceId,
    'Content-Type': 'application/json'
  }
  return headers
}

async function processSuccess(filePath, that) {
  that.setData({
    isMissingDocument: false
  })
  my.openDocument({
    filePath: filePath,
    fileType: 'pdf',
    success: () => {
      that.setData({
        isFailedLoadDocument: false,
        alreadyOpened: true,
        isCardGrey: false,
        isAgreeTNC: true
      })
    },
    fail: () => {
      // 当打开PDF失败时，将控制展示弹窗的变量设为true
      that.setData({
        isFailedLoadDocument: true
      })
    },
    complete() {
      my.call("enableSwipe", { isSwipe: true }, () => { })
      that.setData({
        lottieLoading: false
      })
    }
  })
}

function processFail(that) {
  my.call("enableSwipe", { isSwipe: false }, () => { })
  that.setData({
    isMissingDocument: true
  })
}

function processComplete(that) {
  that.setData({
    lottieLoading: false
  })
}