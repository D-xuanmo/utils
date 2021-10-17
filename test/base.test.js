const { toLowerCamelCase, isObject } = require('../dist/javascript-utils.cjs')

test('isObject', () => {
  expect(isObject({})).toBe(true)
  expect(isObject([])).toBe(false)
  expect(isObject(null)).toBe(false)
  expect(isObject(undefined)).toBe(false)
  expect(isObject('')).toBe(false)
  expect(isObject(0)).toBe(false)
  expect(isObject(new Date())).toBe(false)
})

test('toLowerCamelCase', () => {
  expect(toLowerCamelCase('user')).toBe('user')
  expect(toLowerCamelCase('user_name')).toBe('userName')
})
