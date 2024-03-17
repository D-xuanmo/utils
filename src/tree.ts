/**
 * 一维数组生成树形结构数据
 * @param arr 一维数组
 * @param parentId 父级 id
 * @param parentKey 父级字段 key
 * @param uniKey 可选，唯一标识字段 key，默认：id
 */
export function generateTree(arr: any[], parentId: number | string, parentKey: string, uniKey?: string) {
  const result: any[] = []
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (item[parentKey] === parentId) {
      result.push(item)
      item.children = generateTree(arr, item[uniKey ?? 'id'], parentKey, uniKey)
    }
  }
  return result
}

/**
 * 树形结构转换为 map
 * @param arr 需要被转换的数据
 * @param uniqueKey 唯一标识 key
 * @param childrenKey 子级数据 key
 * @param resultMap 返回结果
 */
export function treeToMap<
  T extends Record<string, any>,
  K extends keyof T & string,
  CK extends keyof T & string
>(
  arr: T[],
  uniqueKey: K,
  childrenKey: CK,
  resultMap = new Map<string, T>()
): Map<string, T> {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    resultMap.set(item[uniqueKey], item)
    if (Array.isArray(item[childrenKey])) {
      treeToMap(item[childrenKey], uniqueKey, childrenKey, resultMap)
    }
  }
  return resultMap
}
