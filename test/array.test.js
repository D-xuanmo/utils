const { deleteArrayItems } = require('../dist/javascript-utils.cjs')
test('deleteArrayItems', () => {
  expect(deleteArrayItems([1], [1, 2, 3])).toStrictEqual([2, 3])
  expect(deleteArrayItems(['22'], ['22', '33'])).toStrictEqual(['33'])
  expect(deleteArrayItems(['22'], [{ id: '22' }, { id: '33' }], 'id')).toStrictEqual([{ id: '33' }])
})
