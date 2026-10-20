/**
 * Mock E2EE Implementation (Zero External Dependencies)
 */

export function encryptAPIData(sessionKey, data) {
  return typeof data === 'object' ? JSON.stringify(data) : String(data);
}

export function decryptAPIData(sessionKey, data) {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }
  return data;
}

export function encryptMPIN(beE2EEPublicKey, userId, mp) {
  return `MOCK_ENCRYPTED_PIN_${mp}`;
}

export function encryptSessionKey(beEncryptPublicKey, data) {
  return 'MOCK_ENCRYPTED_SESSION_KEY_0123456789abcdef';
}

export function createKey() {
  return '0123456789abcdef0123456789abcdef';
}

export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}