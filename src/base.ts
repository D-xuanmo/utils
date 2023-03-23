/**
 * 获取真实类型
 * @param source
 */
export const realType = (source: any): string => Object.prototype.toString.call(source)

/**
 * 是否为对象
 * @param {any} source
 * @returns {boolean}
 */
export const isObject = (source: any): boolean => realType(source) === '[object Object]'

/**
 * 是否为正则表达式
 * @param {any} source
 * @returns {boolean}
 */
export const isRegexp = (source: any): boolean => realType(source) === '[object RegExp]'

/**
 * 是否为函数
 * @param {any} source
 * @returns {boolean}
 */
export const isFunction = (source: any): boolean => realType(source) === '[object Function]'

/**
 * 判断 url 是否为图片路径
 * @param {string} url
 * @returns {boolean}
 */
export const isImageUrl = (url: string): boolean => /\.((png)|(jpe?g)|(gif)|(svg)|(webp))$/gi.test(url)

/**
 * 是否为整数
 * @param source
 */
export const isInteger = (source: any): boolean => /^\d+$/.test(source + '')

/**
 * 是否为浮点数
 * @param source
 */
export const isFloatNumber = (source: any): boolean => /^\d+\.\d+$/.test(source + '')

/**
 * 是否为数字
 * @param source
 */
export const isNumber = (source: any): boolean => isInteger(source) || isFloatNumber(source)

/**
 * 判断是否为布尔值
 * @param source
 */
export const isBoolean = (source: any) => typeof source === 'boolean'

/**
 * 是否为 Promise
 * @param source
 */
export const isPromise = (source: any) => realType(source) === '[object Promise]'

/**
 * 转换 string 布尔值;
 * @param source
 */
export const toBoolean = (source: any): boolean => {
  if (source === 'true') return true
  if (source === 'false') return false
  return Boolean(source)
}

/**
 * 是否为空
 * @param {any} source 任意数据
 * @returns {boolean}
 */
export const isEmpty = (source: any): boolean => {
  if (Array.isArray(source)) return source.length === 0

  if (isObject(source)) return Object.keys(source).length === 0

  if (['[object Set]', '[object Map]'].includes(realType(source))) return source.size === 0

  return [null, undefined, ''].includes(source)
}

/**
 * 千分位
 * @param {string} str 需要格式化的数字
 * @returns {string}
 */
export const formatThousandth = (str: string): string => {
  const [integer, decimal = ''] = `${str}`.split('.')
  const formatInteger = integer.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')
  return `${formatInteger}${decimal ? `.${decimal}` : ''}`
}
