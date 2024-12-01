const { deleteArrayItems, mergeObjectArray } = require('../dist/index.cjs')

test('deleteArrayItems', () => {
  expect(deleteArrayItems([1], [1, 2, 3])).toStrictEqual([2, 3])
  expect(deleteArrayItems(['22'], ['22', '33'])).toStrictEqual(['33'])
  expect(deleteArrayItems(['22'], [{ id: '22' }, { id: '33' }], 'id')).toStrictEqual([{ id: '33' }])
})

test('mergeObjectArray', () => {
  const source = [{ id: 1 }, { id: 2 }, { id: 3 }]
  const target = [{ id: 1, name: '1' }]
  expect(mergeObjectArray(source, target, 'id')).toStrictEqual([{ id: 1, name: '1' }, { id: 2 }, { id: 3 }]
  )
})
