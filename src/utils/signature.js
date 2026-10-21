/**
 * Local mock signature generator
 */
export function generateSignature(privateKey, publicKey, message) {
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

export default {
  generateSignature
};