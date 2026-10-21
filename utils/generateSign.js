export function generateSign(privateKey, publicKey, message) {
  const str = String(message || '');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  const safeBase64 = typeof btoa !== 'undefined' ? btoa(str.slice(0, 16)) : (typeof Buffer !== 'undefined' ? Buffer.from(str.slice(0, 16)).toString('base64') : 'SIG');
  return "MOCK_SIG_" + hex + "_" + safeBase64;
}

export function generateUUID() {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

export default {
  generateUUID,
  generateSign
};