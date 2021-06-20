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
        file: 'dist/javascript-utils.cjs.js',
        format: 'cjs'
      },
      {
        file: 'dist/javascript-utils.ejs.js',
        format: 'es'
      },
      {
        name: 'javascriptUtils',
        file: 'dist/javascript-utils.umd.js',
        format: 'umd'
      }
    ]
  },
  {
    ...baseConfig,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        plugins: [uglify()]
      },
      {
        file: pkg.module,
        format: 'es',
        plugins: [uglify()]
      },
      {
        name: 'javascriptUtils',
        file: pkg.browser,
        format: 'umd',
        plugins: [uglify()]
      }
    ]
  }
]
