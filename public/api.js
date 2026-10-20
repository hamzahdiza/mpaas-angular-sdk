/**
 * Mock Root Public API Service
 */
export function getNewLockey(languageVersion) {
  return Promise.resolve({
    data: {
      languageVersion: languageVersion || 'id',
      lockeys: {}
    },
    statusCode: 200
  });
}
