/**
 * 是否为对象
 * @param {any} source
 * @returns {boolean}
 */
export const isObject = (source: any): boolean =>
  Object.prototype.toString.call(source) === '[object Object]'

/**
 * 是否为正则表达式
 * @param {any} source
 * @returns {boolean}
 */
export const isRegexp = (source: any): boolean =>
  Object.prototype.toString.call(source) === '[object RegExp]'

/**
 * 是否为函数
 * @param {any} source
 * @returns {boolean}
 */
export const isFunction = (source: any): boolean =>
  Object.prototype.toString.call(source) === '[object Function]'

/**
 * 判断 url 是否为图片路径
 * @param {string} url
 * @returns {boolean}
 */
export const isImageUrl = (url: string): boolean =>
  /\.((png)|(jpe?g)|(gif)|(svg)|(webp))$/gi.test(url)

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
 * 千分位
 * @param {string} str 需要格式化的数字
 * @returns {string}
 */
export const formatThousandth = (str: string): string => {
  const [integer, decimal = ''] = `${str}`.split('.')
  const formatInteger = integer.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')
  return `${formatInteger}${decimal ? `.${decimal}` : ''}`
}

/**
 * 下划线转小驼峰
 * @param {string} str 转换字符串：user_info => userInfo
 * @param {string[]} separators 扩展分隔符，默认分割下划线：_
 * @returns {string}
 */
export const toLowerCamelCase = (str: string, separators?: string[]): string => {
  if (typeof str !== 'string') return str
  const _separators = [...(separators || []), '_'].join('|')
  return str.replace(new RegExp(`((${_separators})[a-z])+`, 'g'), (match, $1) =>
    $1.replace(new RegExp(_separators), '').toLocaleUpperCase()
  )
}

/**
 * 小驼峰转下划线分割
 * @param {string} str 转换字符串：userInfo => user_info
 * @returns {boolean}
 */
export const toUnderline = (str: string): string => {
  if (typeof str !== 'string') return str
  return str.replace(/([A-Z])/g, ($1) => `_${$1.toLocaleLowerCase()}`)
}

/**
 * 生成随机值
 * @param {number} length 长度
 * @returns {string}
 */
export const createRandomID = (length: number = 12): string => {
  let result: string[] = []
  let word =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const wordLength = word.length
  for (let i = 0; i < length; i++) {
    result.push(word[Math.round(Math.random() * wordLength)])
  }
  return result.join('')
}

/**
 * object key 转换为小驼峰
 * @param source 任意数据
 * @param filterKey 指定需要遍历的 key
 * @returns
 */
export function objectKeyToCamelCase(source: any, filterKey?: string): any {
  let result: any
  if (Array.isArray(source)) {
    result = []
    for (let i = 0; i < source.length; i++) {
      result[i] = objectKeyToCamelCase(filterKey && source[i][filterKey] ? source[i][filterKey] : source[i])
    }
  } else if (isObject(source)) {
    result = {}
    const _source = filterKey && source[filterKey] ? source[filterKey] : source
    for (const [key, value] of Object.entries(_source)) {
      if (Array.isArray(value) || isObject(_source)) {
        result[toLowerCamelCase(key)] = objectKeyToCamelCase(value)
      } else {
        result[toLowerCamelCase(key)] = value
      }
    }
  } else {
    result = source
  }
  return result
}
