const { default: resolve } = require('@rollup/plugin-node-resolve')
const { terser } = require('rollup-plugin-terser')

module.exports = {
  input: 'index.js',
  output: {
    file: 'dist/metamask.web3.min.js',
    format: 'iife',
  },
  plugins: [
    resolve(),
    terser({
      ecma: 5,
    }),
  ],
}
