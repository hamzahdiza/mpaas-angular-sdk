import {
  bigTruncRetain,
  supplementFloatPartZero} from './number-util'

const currencySymbol = {
  "USD": {
    symbol: "USD ",
    floatSeparator: ".",
    quantileSeparator: ","
  },
  "IDR": {
    symbol: "Rp",
    floatSeparator: ",",
    quantileSeparator: "."
  },
};

const abbreviationMap = {
  6: "millionAbbreviation",
  9: "billionAbbreviation",
  12: "trillionAbbreviation",
}

function currencyDefaultFormat(localInfo, value, places, retainCall, supplementCall) {
  const {
    floatSeparator,
    quantileSeparator
  } = localInfo;
  const positive = value.slice(value.startsWith("-"), value.length);
  // Preserve decimals on data
  const [intPart, floatPart] = retainCall(positive, places).toString().split(".");
  const currency = Object.defineProperty({
      negativeNumber: Number(value) < 0,
      value: positive,
      intPart: intPart.replace(/\B(?=(\d{3})+(?!\d))/g, quantileSeparator),
      floatSeparator,
    },
    "floatPart", {
      set(newFloatPart) {
        if (newFloatPart && /^\d+$/.test(newFloatPart)) {
          this.formatValue = this.intPart + this.floatSeparator + newFloatPart;
        } else {
          this.formatValue = this.intPart;
        }
      },
      get() {
        return this.formatValue.split(this.floatSeparator)[1] || "";
      },
    }
  );
  currency.floatPart = !/^0+$/.test(floatPart) && floatPart;

  if (supplementCall && supplementCall(currency.floatPart, places)) {
    currency.floatPart = currency.floatPart.padEnd(places, "0");
  }
  return currency;
}

/**
 * Generate monetary numerical form objects for target values
 * @param {value:String | Number,  currency: Stirng,isAbbr:Boolean, isPrefix:Boolean, places:Number}
 * @return currency string
 */
export function currencyFormat({
  value, // [required] Origin value
  currency = 'IDR', // [option] Currency type
  isAbbr = false, // [option] Need abbreviations
  isPrefix = true, // [option] Need prefix
  showNegativeSymbol = false, // [option] Force display of positive and negative signs
  places // [option] Default maximum number of decimal places to be retained
}) {
  const localInfo = currencySymbol[currency];
  if (!places && places !== 0) {
      if (currency === 'IDR') {
          places = 0
      } else {
          places = 2
      }
  }

  const currencyInfo = currencyDefaultFormat(
    localInfo,
    String(value),
    places,
    bigTruncRetain,
    supplementFloatPartZero
  );
  let result = currencyInfo.formatValue

  // EXTENDS - Abbreviation Settings
  if (isAbbr && currencyInfo.value >= 1000000) {
    const maps = Object.entries(abbreviationMap);
    for (const [multiple, abbSymbol] of maps) {
      let temp = currencyInfo.value / 10 ** parseInt(multiple);
      if (temp < 1000 || multiple === maps.slice(-1)[0][0]) {
        const currencyTemp = currencyDefaultFormat(localInfo, String(temp), 2, bigTruncRetain, supplementFloatPartZero)
        result = currencyTemp.formatValue + ' ' + getApp().globalData.languagePack[abbSymbol]
        break;
      }
    }
  }

  // EXTENDS - required prefix
  if (isPrefix) {
    result = localInfo.symbol + result
  }

  // EXTENDS - required sign
  if (showNegativeSymbol && bigTruncRetain(String(value).replace(/[-+]/g, ''), currency === "IDR" ? 0 : 2) !== "0") {
    result = (currencyInfo.negativeNumber ? '-' : '+') + result
  }
  return result
}
/**
 * Format the unit
 * @param {*} value
 * @return formatValue
 */
export function unitFormat(value) {
  const localInfo = currencySymbol[getApp().globalData.nativeData.language === 'id-ID' ? "IDR" : "USD"];
  const currency = currencyDefaultFormat(
    localInfo,
    String(value),
    4,
    bigTruncRetain
  );
  return currency.formatValue;
}
/**
 * Format the percentage
 * 
 * This function formats a given value as a percentage with options for symbols, spaces, 
 * and decimal precision. It supports an "auto" trim mode to automatically adjust 
 * decimal precision to the smallest non-zero decimal value, with a maximum precision of 5.
 * 
 * @param {Number|String} value - The value to format as a percentage.
 * @param {Boolean} symbol - Whether to include a "+" or "-" sign for the percentage (default: false).
 * @param {Boolean} space - Whether to include a space between the sign and the percentage (default: false).
 * @param {Number|String} precision - Decimal precision or "auto" for automatic trimming (default: 2).
 * @returns {String} - The formatted percentage string.
 */
export function percentageFormat(value, symbol = false, space = false, precision = 2) {
  // Check if value is numeric or a numeric string
  if (value == null || (typeof value !== "number" && typeof value !== "string") || isNaN(Number(value))) {
    return "undefined"
  }
  
  if (precision !== 'auto' && (isNaN(precision) || precision < 0)) {
    return "undefined"
  }

  const localInfo = currencySymbol[getApp().globalData.nativeData.language === 'id-ID' ? "IDR" : "USD"]
  const { floatSeparator } = localInfo
  const maxTrim = 5

  const autoTrimDecimals = (numStr, maxTrim) => {
    if (!numStr.includes(floatSeparator)) return numStr
    const [intPart, floatPart] = numStr.split(floatSeparator)
    // Trim trailing zeros using iteration
    let trimmedFloat = floatPart;
    while (trimmedFloat.endsWith("0")) {
        trimmedFloat = trimmedFloat.slice(0, -1);
    }

    const finalTrimLength = Math.min(trimmedFloat.length, maxTrim)
    return trimmedFloat.length > 0
      ? `${intPart}${floatSeparator}${trimmedFloat.slice(0, finalTrimLength)}`
      : intPart
  }

  // Determine trim logic
  const trimPrecision = precision === 'auto' ? maxTrim : precision
  const currency = currencyDefaultFormat(
    localInfo,
    String(value),
    trimPrecision,
    bigTruncRetain,
    supplementFloatPartZero
  )

  let formattedValue = currency.formatValue || "0"

  if (precision === 'auto') {
    formattedValue = autoTrimDecimals(formattedValue, maxTrim)
  }

  if (formattedValue === "0") {
    return "0%"
  }

  if (space && symbol) {
    return !currency.negativeNumber
      ? `+ ${formattedValue}%`
      : `- ${formattedValue}%`
  }
  
  if (symbol) {
    return !currency.negativeNumber
      ? `+${formattedValue}%`
      : `-${formattedValue}%`
  }

  return `${formattedValue}%`
}

export function findLongestSubstringWithNumericEdges(s,currency) {
  let maxLength = 0;
  let longestSubstring = "";
  for (let i = 0; i < s.length; i++) {
      if (!isNaN(s[i])) {
          for (let j = s.length - 1; j >= i; j--) {
              if (!isNaN(s[j])) {
                  const currentSubstring = s.slice(i, j + 1);
                  if (currentSubstring.length > maxLength) {
                      maxLength = currentSubstring.length;
                      longestSubstring = currentSubstring;
                  }
                  break;
              }
          }
      }
  }
  let cleanedStr = longestSubstring.replace(currency === 'IDR' ? /[^0-9,]/g : /[^0-9.]/g, '')
  let firstCommaPosition = cleanedStr.indexOf(currency === 'IDR'?',' : '.');
  if (firstCommaPosition === -1) {
      return cleanedStr.slice(0, 12);
  } else {
      let substring = cleanedStr.substring(0, firstCommaPosition);
      return substring.slice(0, 12);
  }
}