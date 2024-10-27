const {
  firstLetterUppercase,
  firstLetterLowercase
} = require('../dist/index.cjs')

test('firstLetterUppercase', () => {
  expect(firstLetterUppercase('tom')).toBe('Tom')
})

test('firstLetterLowercase', () => {
  expect(firstLetterLowercase('Tom')).toBe('tom')
})
