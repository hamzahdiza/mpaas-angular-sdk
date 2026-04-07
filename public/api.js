import request from "@bni-maverick-mpaas/lib/es/utils/helpers/request"

export function getNewLockey(languageVersion) {
  return request({
    url: `/content-mpaas/v1/retrieve-language-pack?languageVersion=${languageVersion}&feature=WEALTH`,
    headers: {
      "Screen-Id": "portfolioLandingScreen",
    },
  })
}