const customUrlQueryData = 'customUrlQueryData'

/**
 * @typedef {'mutualFunds'|'bonds'|'createSID'} FeatureType
 */

/**
 * Routing jump with parameters, the receiving page uses my. customUrlQueryData [query. customUrlQueryData] to retrieve object data 
 * @param {Object} params - The parameters for the navigation.
 * @param {string} params.url - The URL to navigate to.
 * @param {Object} params.data - The data to be sent along with the URL.
 * @param {FeatureType} params.featureType - The type of feature being used. Default is 'mutualFunds'.
 * @param {Function} params.success - The callback function to be invoked on success.
 * @param {Function} params.fail - The callback function to be invoked on failure.
 * @param {Function} params.complete - The callback function to be invoked on completion.
 * @param {string} [params.mode='navigateTo'] - The navigation mode. Default is 'navigateTo'.
 */
export function customNavigateTo({
  url,
  data,
  featureType = 'mutualFunds',
  success,
  fail,
  complete,
  mode = 'navigateTo'
}) {
  const urls = url.split('/')
  const mark = urls[urls.length - 1]
  if (my[customUrlQueryData]) {
    my[customUrlQueryData][`${mark}`] = JSON.parse(JSON.stringify({...data, featureType}))
  } else {
    my[customUrlQueryData] = {
      [`${mark}`] : JSON.parse(JSON.stringify({...data, featureType}))
    }
  }
  if (my[mode]) {
    my[mode]({
      url: `${url}?${customUrlQueryData}=${mark}`,
      success,
      fail,
      complete
    })
  }
}
