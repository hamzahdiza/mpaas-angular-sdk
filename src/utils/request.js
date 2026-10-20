import generalError from "./generalError";
import {
  generateUUID
} from "./number-util";
const errorCodeConfig = require("../public/error_code_config.json");

/* JShield-obfus:enable */
const baseUri = "https://be-mpaas-template-management.vercel.app";
/* JShield-obfus:disable */

/**
 * use to send API request
 */
export default function request({
  url,
  method,
  data,
  headers = null
}, that = null) {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        console.info(url, "<<< MPAAS_URL");
        my.request({
          url: baseUri + url,
          method: method,
          data: data,
          timeout: 120000,
          headers: generateHeaders(headers),
          success: (res) => {
            console.info(res, "<<< MPAAS_RES ")
            resolve(res);
          },
          fail: (err) => {
            console.log(err, "<<< MPAAS_ERROR");
            err.statusCode = (err.status ? err.status : err.statusCode)
            handleErrorCode(err)
            reject(err);
          },
          complete: () => {
            that &&
              that.setData({
                isLoading: false,
              });
          },
        });
      },
    );
  });
}
/**
 * Intercept public error codes
 */
function handleErrorCode(err) {
  if (err && err.data && err.data.errorCode) {
    if (errorCodeConfig.toNearestBranch.includes(err.data.errorCode)) {
      my.call('openViewNearestBranch', {}, () => {});
    } else if (errorCodeConfig.toSplashScreen.includes(err.data.errorCode)) {
      generalError({
        err,
        isSwipe: true,
        event: 'goToSplashScreen',
        param: {},
      })
    } else if (errorCodeConfig.validateUSerCredentialResetPassword.includes(err.data.errorCode)) {
      generalError({
        err,
        isSwipe: true,
        event: 'validateUserCredential',
        param: {
          scenario: 'RESET_PASSWORD'
        },
      })
    } else if (errorCodeConfig.validateUSerCredentialProvisioning.includes(err.data.errorCode)) {
      generalError({
        err,
        isSwipe: true,
        event: 'validateUserCredential',
        param: {
          scenario: 'PROVISIONING'
        },
      })
    } else if (errorCodeConfig.toHomeScreen.includes(err.data.errorCode) || err.data.errorCode.startsWith('LIM-')) {
      generalError({
        err,
        isSwipe: true,
        event: 'goToHomeScreen',
        param: {},
      })
    } else if (err.data.errorCode.startsWith('GTW-')) {
      generalError({
        err,
        isSwipe: true,
        event: 'isRequest',
      })
    }
  }
}
/**
 * refresh token
 */
function refreshToken() {
  return new Promise((resolve, reject) => {
    my.request({
      url: `${baseUri}/identity/v1/refresh-tokens`,
      method: "POST",
      headers: generateHeaders({
        "Mav-Authorization": getApp().globalData.nativeData.refreshToken
      }),
      success: (res) => {
        getApp().globalData.nativeData.accessToken = res.data.data.token;
        getApp().globalData.nativeData.refreshToken = res.data.data.refreshToken;
        my.call("saveToken", {
          accessToken: res.data.data.token,
          refreshToken: res.data.data.refreshToken
        });
        resolve(res);
      },
      fail: (err) => {
        err.statusCode = (err.status ? err.status : err.statusCode)
        reject(err);
      },
    });
  });
}
/**
 * generate headers
 */
function generateHeaders(headers = null) {
  const app = getApp();
  const nativeData = (app && app.globalData && app.globalData.nativeData) || {};
  const personalData = (app && app.globalData && app.globalData.personalData) || (my.getStorageSync({ key: 'personalData' }) && my.getStorageSync({ key: 'personalData' }).data) || {};
  return Object.assign({
      "content-type": "application/json",
      "Channel-Id": "MVR",
      "Client-Platform": nativeData.clientPlatform || "Android",
      "Client-Version": nativeData.clientVersion || "1.0.0",
      "Client-Release": nativeData.clientRelease || "release",
      "Accept-Language": nativeData.language || "id-ID",
      "User-Agent": nativeData.userAgent || "wondr/1.0.0",
      "Device-Id": nativeData.deviceId || "DEV-DEVICE-001",
      "Request-Id": generateUUID(),
      authorization: nativeData.authorization || "",
      "Enc-Session-Key": nativeData.encSessionKey || "",
      "wondr-client": nativeData.clientPlatform || "Android",
      "X-CIF": personalData.cif || "CIF-HAMZAH-001",
      "X-Customer-Phone": personalData.phone || "081234567890",
      "X-Account-Number": personalData.accountNumber || "1000785003",
      "x-cif": personalData.cif || "CIF-HAMZAH-001",
      "x-customer-phone": personalData.phone || "081234567890",
      "x-account-number": personalData.accountNumber || "1000785003"
    },
    headers
  );
}
/**
 * Handle api return error code 503
 * @param {API Return} err 
 */
function handle503Error(err) {
  const errorCode = err.data.errorCode;
  if (errorCodeConfig.downTimeErrorTrue.includes(errorCode)) {
    my.call('downTimeError', {
      isScheduled: true,
      endTime: err.data.downtimeEndTime
    }, () => {})
  } else if (errorCodeConfig.downTimeErrorFalse.includes(errorCode)) {
    my.call('downTimeError', {
      isScheduled: false
    }, () => {})
  } else if (errorCodeConfig.normalFeatureOff.includes(errorCode)) {
    my.featureCheckModalFunc(true);
  }
}