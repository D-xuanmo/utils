import eslint from '@rollup/plugin-eslint'
import typescript from '@rollup/plugin-typescript'
import { uglify } from 'rollup-plugin-uglify'

const uglifyOption = {
  compress: {
    pure_funcs: ['console.log']
  }
}

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
        file: 'dist/javascript-utils.esm.js',
        format: 'es'
      },
      {
        name: 'JSUtils',
        file: 'dist/javascript-utils.umd.js',
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
        plugins: [uglify(uglifyOption)]
      },
      {
        file: 'dist/javascript-utils.esm.min.js',
        format: 'es',
        plugins: [uglify(uglifyOption)]
      },
      {
        name: 'javascriptUtils',
        file: 'dist/javascript-utils.umd.min.js',
        format: 'umd',
        plugins: [uglify(uglifyOption)]
      }
    ]
  }
]
