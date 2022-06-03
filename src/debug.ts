import { toPascalCase } from './base'

/**
 * 统一报错信息处理
 * @param name 信息名称
 * @param message 错误信息内容
 */
export const throwError = (name: string, message: string) => {
  throw `[${toPascalCase(name)}]: ${message}`
}

/**
 * 警告信息统一处理
 * @param name 信息名称
 * @param message 警告信息内容
 */
export const debugWarn = (name: string, message: string) => {
  console.warn(`[${name}]: ${message}`)
}
