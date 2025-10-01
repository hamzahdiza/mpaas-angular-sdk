/**
 * Get product type by abbreviation
 * @param {String} key Abbreviation of the type to be obtained, e.g. MM, BALN
 */
export function typeMap(key) {
	let lang = getApp().globalData.languagePack;
  let result = null
  switch (key) {
    case 'FIXD':
      result = lang.productListScreenFixedIncome
      break;
    case 'EQTY':
      result = lang.productListScreenStocks
      break;
    case 'MM':
      result = lang.productListScreenMoneyMarket
      break;
    case 'BALN':
      result = lang.productListScreenMixed
      break;
    default:
      result = lang.productListScreenDefaultFallbackName
      break;
  }
  return result
}

/**
 * Access to risk types based on acronyms
 * @param {String} key Abbreviation of the type of risk to be acquired, e.g. VHIGH, LOW
 */
export function riskLevel(key) {
	let lang = getApp().globalData.languagePack;
	const risk = new Map();
	risk.set("VHIGH", lang.productDetailScreenRiskVHIGH);
	risk.set("HIGH", lang.productDetailScreenRiskHIGH);
	risk.set("MED", lang.productDetailScreenRiskMED);
	risk.set("LOW", lang.productDetailScreenRiskLOW);
	if (key === "") {
		return undefined;
	} else {
		return risk.get(key);
	}
}
