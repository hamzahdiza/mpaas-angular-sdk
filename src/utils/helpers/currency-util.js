import {
  bigTruncRetain,
  normalRetain
} from './number-util.js';

const currencySymbol = {
  'en-US': {
    'isUS': true,
    'symbol': 'USD ',
    'floatSeparator': '.',
    'quantileSeparator': ',',
    'abbreMap': {
      "6": 'Million',
      "9": 'Billion',
      "12": 'Trillion'
    }
  },
  'id-ID': {
    'isUS': false,
    'symbol': 'Rp',
    'floatSeparator': ',',
    'quantileSeparator': '.',
    'abbreMap': {
      "6": 'Juta',
      "9": 'Miliar',
      "12": 'Triliun'
    }
  }
};

function addThousandsSeparator(intPart, quantileSeparator) {
  const result = [];
  let counter = 0;

  for (let i = intPart.length - 1; i >= 0; i--) {
    result.push(intPart[i]);
    counter++;
    if (counter % 3 === 0 && i !== 0) {
      result.push(quantileSeparator);
    }
  }

  return result.reverse().join('');
}

function currencyDefaultFormat(localInfo, value, places, retainCall, isPrefix) {
  const { symbol, floatSeparator, quantileSeparator } = localInfo;

  const strVal = String(value || '0');
  const positive = strVal.startsWith('-') ? strVal.slice(1) : strVal;

  const retained = (retainCall || normalRetain)(positive, places);
  const [intPart, floatPart = ''.padEnd(places, '0')] = (retained !== undefined ? retained.toString() : positive).split('.');

  const formattedIntPart = addThousandsSeparator(intPart || '0', quantileSeparator);
  const formatValue = `${formattedIntPart}${floatSeparator}${floatPart}`;

  return {
    currencyString: `${isPrefix ? symbol : ''}${formatValue}`,
    formatValue,
    currencySymbol: symbol,
    isFront: true,
    negativeNumber: Number(value) < 0,
    value: positive,
  };
}

export function currencyFormat({
  value,
  abbreviation = false,
  abbreLimit = 1000000,
  isUS = false,
  intFloat = false,
  places = 2,
  retainCall,
  isPrefix = true,
}) {
  const localInfo = currencySymbol[isUS ? 'en-US' : 'id-ID'];
  const currency = currencyDefaultFormat(localInfo, String(value || '0'), places, retainCall || normalRetain, isPrefix);

  if (abbreviation && Number(currency.value) >= abbreLimit) {
    const maps = Object.entries(localInfo.abbreMap);
    for (const [key, val] of maps) {
      let temp = Number(currency.value) / (10 ** parseInt(key));
      if (temp < 100 || key === maps.slice(-1)[0][0]) {
        currency.abbreValue = bigTruncRetain(temp, places);
        currency.abbreLevel = val;
        break;
      }
    }
  }

  if (!intFloat) {
    ['currencyString', 'formatValue'].forEach(item => {
      if (currency[item] && currency[item].endsWith(localInfo.floatSeparator.padEnd(places + 1, '0'))) {
        currency[item] = currency[item].slice(0, currency[item].length - places - 1);
      }
    });
  }
  return currency;
}

export default currencyFormat;
