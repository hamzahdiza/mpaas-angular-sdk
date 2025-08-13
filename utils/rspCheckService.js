const serviceKeyMap = {
  "app.config.wealth.rsp.feature.service.key": "rspFeatureOn",
  "app.config.wealth.rsp.creation.feature.service.key": "rspCreationFeatureOn",
  "app.config.wealth.rsp.modify.feature.service.key": "rspModifyFeatureOn",
  "app.config.wealth.rsp.cancel.feature.service.key": "rspCancelFeatureOn",
};

/**
 * @param {string} serviceName 
 * @returns {Promise<Object>} 
 */
function getServiceStatusPromise(serviceName) {
  return new Promise((resolve) => {
    my.call("getServiceStatus", {
      serviceName
    }, (res) => {
      const dataKey = serviceKeyMap[serviceName];
      const status = res === true || res === 'true';
      if (dataKey) {
        resolve({
          [dataKey]: status
        });
      } else {
        resolve({});
      }
    });
  });
}

/**
 * @param {string[]} serviceNames 
 * @returns {Promise<Object>} 
 */
export async function rspCheckService(serviceNames = []) {
  if (!Array.isArray(serviceNames) || serviceNames.length === 0) {
    return {};
  }


  try {
    const promises = serviceNames.map(name => getServiceStatusPromise(name));

    const resultsArray = await Promise.all(promises);

    const finalResult = Object.assign({}, ...resultsArray);

    return finalResult;

  } catch (error) {
    const errorResult = {};
    serviceNames.forEach(name => {
      const key = serviceKeyMap[name];
      if (key) {
        errorResult[key] = false;
      }
    });
    return errorResult;
  }
}