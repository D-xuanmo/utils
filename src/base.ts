/**
 * 是否为对象
 * @param {any} source
 * @returns {boolean}
 */
export const isObject = (source: any): boolean => Object.prototype.toString.call(source) === '[object Object]'

/**
 * 是否为正则表达式
 * @param {any} source
 * @returns {boolean}
 */
export const isRegexp = (source: any): boolean => Object.prototype.toString.call(source) === '[object RegExp]'

/**
 * 是否为函数
 * @param {any} source
 * @returns {boolean}
 */
export const isFunction = (source: any): boolean => Object.prototype.toString.call(source) === '[object Function]'

/**
 * 判断 url 是否为图片路径
 * @param {string} url
 * @returns {boolean}
 */
export const isImageUrl = (url: string): boolean => /\.((png)|(jpe?g)|(gif)|(svg)|(webp))$/ig.test(url)

/**
 * 是否为空
 * @param {any} source
 * @returns {boolean}
 */
export const isEmpty = (source: any): boolean => {
  if (Array.isArray(source)) return source.length === 0

  if (isObject(source)) return Object.keys(source).length === 0

  return [null, undefined, ''].includes(source)
}

/**
 * 金额千分位
 * @param {string} str 需要格式化的数字
 * @returns {string}
 */
export const formatterMoney = (str: string): string => `${str}`.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')

/**
 * 下划线转小驼峰
 * @param {string} str 转换字符串：user_info => userInfo
 * @returns {boolean}
 */
export const toLowerCamelCase = (str: string): string => {
  return str.replace(/[^_](_[a-z])+/, (match, $1) => $1.replace(/_/, '').toLocaleUpperCase())
}

/**
 * 小驼峰转下划线分割
 * @param {string} str 转换字符串：userInfo => user_info
 * @returns {boolean}
 */
export const toUnderline = (str: string): string => str.replace(/([A-Z])/g, $1 => `_${$1.toLocaleLowerCase()}`)
