import { toLowerCamelCase } from './string'
import { isObject } from './base'

/**
 * object key 转换为小驼峰
 * @param source 任意数据
 * @param filterKey 指定需要遍历的 key
 * @param separator 下划线转换自定义分隔符
 * @returns
 */
export function objectKeyToCamelCase(source: any, filterKey?: string, separator?: string[]): any {
  let result: any
  if (Array.isArray(source)) {
    result = []
    for (let i = 0; i < source.length; i++) {
      result[i] = objectKeyToCamelCase(filterKey && source[i][filterKey] ? source[i][filterKey] : source[i], filterKey, separator)
    }
  } else if (isObject(source)) {
    result = {}
    const _source = filterKey && source[filterKey] ? source[filterKey] : source
    for (const [key, value] of Object.entries(_source)) {
      if (Array.isArray(value) || isObject(_source)) {
        result[toLowerCamelCase(key, separator)] = objectKeyToCamelCase(value, filterKey, separator)
      } else {
        result[toLowerCamelCase(key, separator)] = value
      }
    }
  } else {
    result = source
  }
  return result
}
