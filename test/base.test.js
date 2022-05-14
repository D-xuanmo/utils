const { toLowerCamelCase, isObject, isNumber, toPascalCase } = require('../dist/javascript-utils.cjs')

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
  expect(toLowerCamelCase('is_system_admin')).toBe('isSystemAdmin')
  expect(toLowerCamelCase('user.name', ['\\.'])).toBe('userName')
  expect(toLowerCamelCase('is.system.admin', ['\\.'])).toBe('isSystemAdmin')
})

test('isNumber', () => {
  expect(isNumber('222px')).toBe(false)
  expect(isNumber(222)).toBe(true)
  expect(isNumber('222')).toBe(true)
})

test('toPascalCase', () => {
  expect(toPascalCase('d-example-text')).toBe('DExampleText')
  expect(toPascalCase('d-example')).toBe('DExample')
})
