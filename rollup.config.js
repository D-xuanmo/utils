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
        file: 'dist/index.cjs.js',
        format: 'cjs'
      },
      {
        file: 'dist/index.esm.js',
        format: 'es'
      },
      {
        name: 'JSUtils',
        file: 'dist/index.umd.js',
        format: 'umd'
      }
    ]
  },
  {
    ...baseConfig,
    output: [
      {
        file: 'dist/index.cjs.min.js',
        format: 'cjs',
        plugins: [uglify(uglifyOption)]
      },
      {
        file: 'dist/index.esm.min.js',
        format: 'es',
        plugins: [uglify(uglifyOption)]
      },
      {
        name: 'jsUtils',
        file: 'dist/index.umd.min.js',
        format: 'umd',
        plugins: [uglify(uglifyOption)]
      }
    ]
  }
]
