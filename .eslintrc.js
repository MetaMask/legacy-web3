module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: [
    '@metamask/eslint-config',
    '@metamask/eslint-config/config/nodejs',
  ],
  plugins: [
    'json',
  ],
  globals: {
    web3: true,
    Web3: true,
    window: true,
  },
  rules: {
    'import/unambiguous': 'off',
    'import/extensions': 'off',
    'import/no-unassigned-import': 'off',
  },
  ignorePatterns: [
    '!.eslintrc.js',
    'node_modules/',
    'dist/',
  ],
}
