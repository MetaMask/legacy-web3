import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

module.exports = {
  input: 'src/web3Wrapper.js',
  output: [
    {
      file: 'dist/metamask.web3.min.js',
      format: 'iife',
      plugins: [
        terser(),
      ],
    },
    {
      file: 'dist/index.js',
      format: 'umd',
    },
  ],
  plugins: [
    resolve(),
    commonjs({
      sourceMap: false,
    }),
  ],
}
