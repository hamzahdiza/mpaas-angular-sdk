import generalError from "./generalError";
import {
  generateUUID
} from "./number-util";
import env from "../env.json"
const errorCodeConfig = require("../public/error_code_config.json");

/* JShield-obfus:enable */
const baseUri = env.MPAAS_BASE_URL
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
        if (url != "/wealth-mf/v1/transactions" && url != "/wealth-bonds/v1/booking/execution" && url != "/wealth-bonds/v1/early-redemption/execution" && url != "/wealth-rsp/v1/creation/execution" && url != "/wealth-rsp/v1/edit/execution" && url != "/wealth-bonds/v1/topup-payment/execution") {
          headers["Mav-Authorization"] = getApp().globalData.nativeData.accessToken;
        }
        my.request({
          url: baseUri + url,
          method: method,
          data: data,
          timeout: 120000,
          headers: generateHeaders(headers),
          success: (res) => {
            resolve(res);
          },
          fail: (err) => {
            err.statusCode = (err.status ? err.status : err.statusCode)
            if (err.statusCode === 401) {
              // Refresh Token when status code is 401
              refreshToken()
                .then(() => {
                  // Retry after refresh token
                  if (url != "/wealth-mf/v1/transactions") {
                    headers["Mav-Authorization"] = getApp().globalData.nativeData.accessToken;
                  }
                  my.request({
                    url: baseUri + url,
                    method: method,
                    data: data,
                    timeout: 120000,
                    headers: generateHeaders(headers),
                    success: (res) => {
                      resolve(res);
                    },
                    fail: (err) => {
                      err.statusCode = (err.status ? err.status : err.statusCode)
                      if (err.statusCode === 503) {
                        handle503Error(err)
                        reject(err);
                      } else {
                        handleErrorCode(err)
                        reject(err);
                      }

                    },
                  });
                })
                .catch((err) => {
                  generalError({
                    err,
                    isSwipe: true,
                    isRefresh: true,
                    event: 'goToSplashScreen',
                    param: {},
                  })
                  err.isIntercept = true
                  reject(err);
                });
            } else if (err.statusCode === 503) {
              handle503Error(err)
              reject(err);
            } else {
              handleErrorCode(err)
              reject(err);
            }
          },
          complete: () => {
            that &&
              that.setData({
                isLoading: false,
              });
          },
        });
      },
      getApp().globalData.nativeData.userId ? 0 : 1500
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
  } else if (err.error == 13) {
    const errData = {
      data: {
        errorCode: "13",
        errorTitle: 'miniProgramLoadingViewErrorTitle',
        errorMessage: 'miniProgramLoadingViewErrorDescription',
        errorButton: 'miniProgramLoadingViewErrorLockey'
      }
    }
    generalError({
      err: errData,
      isSwipe: true,
      event: 'goToHomeScreen',
      param: {},
    })
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
  const nativeData = getApp().globalData.nativeData;
  return Object.assign({
      "content-type": "application/json",
      "Channel-Id": "MVR",
      "Client-Platform": nativeData.clientPlatform,
      "Client-Version": nativeData.clientVersion,
      "Client-Release": nativeData.clientRelease,
      "Accept-Language": nativeData.language,
      "User-Agent": nativeData.userAgent,
      "Device-Id": nativeData.deviceId,
      "Request-Id": generateUUID(),
      authorization: nativeData.authorization,
      "Enc-Session-Key": nativeData.encSessionKey,
      "wondr-client": nativeData.clientPlatform,
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