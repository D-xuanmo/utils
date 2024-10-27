const { objectKeyToCamelCase, exclude } = require('../dist/index.cjs')

const expected = {
  name: 'xuanmo',
  display_name: '轩陌',
  children: [
    1,
    {
      age_we1: 999,
      'child.list': [
        {
          user_name: 'tom',
          age: 18
        }
      ]
    }
  ]
}

const received = {
  name: 'xuanmo',
  displayName: '轩陌',
  children: [
    1,
    {
      ageWe1: 999,
      childList: [
        {
          userName: 'tom',
          age: 18
        }
      ]
    }
  ]
}

test('objectKeyToCamelCase', () => {
  expect(JSON.stringify(objectKeyToCamelCase(expected, '', ['\\.']))).toBe(JSON.stringify(received))
})

test('exclude', () => {
  const obj = { a: 1, b: 2, c: 3 }
  expect(exclude(obj, ['a'])).toEqual({ b: 2, c: 3 })
})
