const { treeToMap } = require('../dist/index.cjs')

const source = [{ id: '1', children: [{ id: '1-1', children: [{ id: '1-1-1' }] }] }, { id: '2' }]

test('objectKeyToCamelCase', () => {
  const converted = treeToMap(source, 'id', 'children')
  expect(Array.from(converted.keys()).join(',')).toBe('1,1-1,1-1-1,2')
})
