import { isObject } from './base'

/**
 * 深拷贝
 * @param data
 */
export default function deepCopy<T>(data: T): T {
  if (isObject(data) || Array.isArray(data)) {
    const result: any = Array.isArray(data) ? [] : {}

    for (const i in data) {
      result[i] = deepCopy(data[i])
    }

    return result
  }

  return data
}
