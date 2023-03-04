module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    semi: 0,
    'no-param-reassign': 0,
    'no-unused-vars': ['error', {
      vars: 'all',
      args: 'none',
      ignoreRestSiblings: true
    }],
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'warn',
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'no-var': 0
  }
}
