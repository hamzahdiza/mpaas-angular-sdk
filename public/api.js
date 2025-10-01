import request from "../utils/request"

export function getRspList(queryParam = '', headers) {
  let baseUrl = '/wealth-rsp/v1/list'
  return request({
    url: baseUrl + queryParam,
    headers: {
      "Screen-Id": "wealthRspDashboardScreen",
      ...headers
    }
  })
}

export function getNewLockey(languageVersion) {
  return request({
    url: `/content-mpaas/v1/retrieve-language-pack?languageVersion=${languageVersion}&feature=WEALTH`,
    headers: {
      "Screen-Id": "portfolioLandingScreen",
    },
  })
}