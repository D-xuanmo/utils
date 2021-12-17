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
