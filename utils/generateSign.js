import nacl from "@wecrpto/nacl"
import {
  encodeBase64,
  decodeBase64,
  decodeUTF8,
  encodeUTF8
} from "@wecrpto/nacl-util"

function generateSign(privateKey, publicKey, message) {
  const priv = decodeBase64(privateKey)
  const pub = decodeBase64(publicKey)
  const privateKeyBytes = new Uint8Array(64)
  privateKeyBytes.set(priv)
  if (priv.length != 64) privateKeyBytes.set(pub, priv.length)
  const messageBytes = decodeUTF8(message);

  const signature = nacl.sign.detached(messageBytes, privateKeyBytes);

  return encodeBase64(signature)
}

function generateUUID() {
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
}