import { isObject } from './base'

/**
 * 深拷贝
 * @param {array | object} data
 * @returns {*}
 */
export default function deepCopy(data: any): any {
  if (isObject(data) || Array.isArray(data)) {
    const result: any = Array.isArray(data) ? [] : {}

    for (let i in data) {
      result[i] = deepCopy(data[i])
    }

    return result
  }

  return data
}
