/**
 * 指定删除数组的某些元素
 * @param deleteItems 被删除的元素
 * @param source 原始数组
 */
function deleteArrayItems<K extends T[number], T extends (string | number)[]>(deleteItems: K[], source: T): T

/**
 * 指定删除数组的某些元素
 * @param deleteItems 被删除的元素
 * @param source 原始数组
 * @param key 指定对应的属性做删除映射
 */
function deleteArrayItems<
  T extends Record<string, unknown>[],
  K extends keyof T[number],
  V extends T[number][K]
>(deleteItems: V[], source: T, key: K): T

function deleteArrayItems(deleteItems: unknown[], source: unknown[], key?: string) {
  if (typeof source[0] === 'object') {
    return source.filter((item) => !deleteItems.includes((item as Record<string, unknown>)[key!]))
  }
  return source.filter((item) => !deleteItems.includes(item))
}

/**
 * 选择数组的最后一项元素
 * @param source 数据源
 */
export function pickLastItem<T>(source: T[]): T {
  return source[source.length - 1]
}

export { deleteArrayItems }
