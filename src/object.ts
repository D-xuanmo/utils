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

/**
 * 排除对象中的某些属性
 * @param data 原始对象
 * @param keys 要排除的属性
 */
export function exclude<T extends Record<string, any>, K extends keyof T>(data: T, keys: K[]) {
  const result = {} as T
  for (const [key, value] of Object.entries(data)) {
    if (!keys.includes(key as K)) {
      result[key as K] = value
    }
  }
  return result as Exclude<T, K>
}
