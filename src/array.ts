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
export function pickLastItem<T extends unknown[] = []>(source: T): T[number] {
  return source[source.length - 1]
}

/**
 * 合并两个数组，只会合并一级对象
 * @param target 目标数组
 * @param source 源数组
 * @param uniqueKey 唯一标识
 */
export function mergeObjectArray<T extends Record<string, any>>(target: T[], source: T[], uniqueKey: keyof T): T[] {
  const map = new Map<string, T>()
  source.forEach((item: T) => {
    map.set(item[uniqueKey], item)
  })
  target.forEach((item: T) => {
    const sourceItem = map.get(item[uniqueKey])
    if (sourceItem) {
      map.set(item[uniqueKey], { ...sourceItem, ...item })
    } else {
      map.set(item[uniqueKey], item)
    }
  })
  return Array.from(map.values())
}

export { deleteArrayItems }
