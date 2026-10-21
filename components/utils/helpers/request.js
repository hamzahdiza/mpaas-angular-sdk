/**
 * Local mock request helper for mpaas-angular-sdk
 * No external API or nexus calls.
 */
export default function request({
  url = '',
  method = 'GET',
  data = {},
  headers = null
} = {}, that = null) {
  return new Promise((resolve) => {
    // Local mock response
    resolve({
      data: {
        code: '00',
        message: 'Success (Mock)',
        data: {}
      }
    });
  });
}