var tools = require('./lib/e2ee.wsx')
/**
 *  Encrypt API request and response body
 * @param {*} sessionKey
 * @param {*} data 
 */
export function encryptAPIData(sessionKey, data) {
  return tools.encryptData(sessionKey, data)
}

/**
 * Decrypt API request and response body
 * @param {*} sessionKey
 * @param {*} data
 */
export function decryptAPIData(sessionKey, data) {
  return tools.decryptData(sessionKey, data)
}

/**
 * Encrypt MP
 * @param {*} beE2EEPublicKey
 * @param {*} userId
 * @param {*} mp
 */
export function encryptMPIN(beE2EEPublicKey, userId, mp) {
  return tools.encryptPassword(beE2EEPublicKey, userId, mp)
}

/**
 * Encrypt sessionKey
 * @param {*} beEncryptPublicKey 
 * @param {*} data 
 */
export function encryptSessionKey(beEncryptPublicKey, data) {
  return tools.encryptKey(beEncryptPublicKey, data)
}

/**
 * Create sessionKey
 */
export function createKey() {
  return tools.createKey()
}

/**
 * Generate UUID
 * @returns {string} UUID
 */
export function generateUUID() {
  let key32 = tools.createKey().toLowerCase();
  let uuid = ""
  for (let i = 1; i <= 32; i++) {
    uuid += key32.charAt(i - 1)
    if (i == 8 || i == 12 || i == 16 || i == 20) uuid += "-";
  }
  return uuid;
}