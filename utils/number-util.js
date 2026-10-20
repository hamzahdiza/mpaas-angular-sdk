/**
 * Big data character truncation; The retention rule is that if it is an integer, it directly returns the integer. 
 * If it is a decimal and the number of decimal places is less than the predetermined number n, zero is not added.
 * @param {string | number} value target value
 * @param {number} n Retain decimal places n >= 0
 */
export function bigTruncRetain(value, n = 0) {
  if (n < 0) {
    throw new Error('n must be greater than or equal to 0')
  }
  let [intPart, floatPart] = String(value).split('.');

  floatPart && (floatPart = floatPart.slice(0, n))
  // if integer 
  if (!floatPart || /^0+$/.test(floatPart)) {
    return intPart
  } else {
    return intPart + '.' + String(+('0.' + floatPart)).split('.')[1]
  }
}

/**
 * Generate UUID
 * @returns {string} UUID
 */
export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Determine whether floatPart needs to be filled with zeros 
 * @param {*} floatPart
 * @param {*} places 
 */
export function supplementFloatPartZero(floatPart, places) {
  if (!floatPart || /^0+$/.test(floatPart)) {
    return false
  }
  return floatPart.length < places
}