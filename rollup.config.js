import pkg from './package.json'

import eslint from '@rollup/plugin-eslint'
import typescript from '@rollup/plugin-typescript'
import { uglify } from 'rollup-plugin-uglify'

const baseConfig = {
  input: 'src/index.ts',

  plugins: [
    eslint(),
    typescript({ tsconfig: './tsconfig.json' })
  ]
}

export default [
  {
    ...baseConfig,
    output: [
      {
        file: pkg.main,
        format: 'cjs'
      },
      {
        file: pkg.module,
        format: 'es'
      },
      {
        name: 'JSUtils',
        file: pkg.browser,
        format: 'umd'
      }
    ]
  },
  {
    ...baseConfig,
    output: [
      {
        file: 'dist/javascript-utils.cjs.min.js',
        format: 'cjs',
        plugins: [uglify()]
      },
      {
        file: 'dist/javascript-utils.esm.min.js',
        format: 'es',
        plugins: [uglify()]
      },
      {
        name: 'javascriptUtils',
        file: 'dist/javascript-utils.umd.min.js',
        format: 'umd',
        plugins: [uglify()]
      }
    ]
  }
]
