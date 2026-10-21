/**
 * Number utilities for calculations, formatting and truncation
 */

export function bigTruncRetain(value, n) {
  let str = String(value || '0');
  if (/^(\-|\+)?\d+$/.test(str)) {
    str = Number(str).toFixed(n);
  }

  if (/^(-?\d+)(\.\d+)?$/.test(str)) {
    if (n === 0) {
      return str.split('.')[0];
    }
    const dotIndex = str.indexOf('.');
    if (dotIndex === -1) return str;
    return str.slice(0, dotIndex + n + 1);
  } else {
    return str;
  }
}

export function retain(value, n) {
  if (n === 'null' || n === 'undefined' || n === 0) return parseInt(value || 0);
  const num = Number(value || 0);
  const positive = num < 0;
  const tran = Math.round(Math.abs(num) * Math.pow(10, n)) / Math.pow(10, n);
  let tranV = tran.toString();
  const newVal = tranV.indexOf('.');
  if (newVal < 0) {
    tranV += '.';
  }
  for (let i = tranV.length - tranV.indexOf('.'); i <= n; i++) {
    tranV += '0';
  }
  return (positive ? '-' : '') + tranV;
}

export function normalRetain(number, p) {
  const power = 10 ** p;
  return Math.trunc(Number(number || 0) * power) / power;
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
  bigTruncRetain,
  retain,
  normalRetain,
  generateUUID
};
