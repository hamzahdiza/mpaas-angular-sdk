import {
  defineConfig
} from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    css: true,
    setupFiles: [
      './configTest/setup.js',
      './configTest/globalAli.js',
    ],
    coverage: {
      provider: 'istanbul',
      assetsInclude: ['**/*.acss', '**/*.axml'],
      include: ['pages/*', 'package_riskProfile/**/*', 'package_transaction/**/*', 'package_sid/**/*', 'package_bonds/**/*', 'utils/*', 'components/*', 'package_profile_investor/**/*', 'package_rsp/**/*', 'package_topup/**/*'],
      exclude: ['components/mp-html/*', '**/*.spec.js', '**/*.acss', '**/*.axml', '**/*.json',
        '**/*.css',
        '**/*.less',
      ],
      reporter: ['text', 'lcov'],
      all: true,
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
      watermarks: {
        lines: [70, 80],
        functions: [70, 80],
        branches: [70, 80],
        statements: [70, 80],
      },
    },
  },
})