/**
 * 是否为对象
 * @param {any} source 数据源
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
