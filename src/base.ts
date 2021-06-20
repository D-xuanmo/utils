/**
 * 是否为对象
 * @param {any} source 数据源
 * @returns {boolean} true/false
 */
export const isObject = (source: any): boolean => Object.prototype.toString.call(source) === '[object Object]'

/**
 * 是否为正则
 * @param {any} source
 * @returns {boolean} true/false
 */
export const isRegexp = (source: any): boolean => Object.prototype.toString.call(source) === '[object RegExp]'

/**
 * 是否为函数
 * @param {any} source
 * @returns {boolean} true/false
 */
export const isFunction = (source: any): boolean => Object.prototype.toString.call(source) === '[object Function]'
