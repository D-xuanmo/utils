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

/**
 * 下划线转小驼峰
 * @param {string} str 转换字符串：user_info => userInfo
 * @param {string[]} separators 扩展分隔符，默认分割下划线：_
 * @returns {string}
 */
export const toLowerCamelCase = (str: string, separators?: string[]): string => {
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
  return str.replace(/([A-Z])/g, ($1) => `_${$1.toLocaleLowerCase()}`)
}

/**
 * 中横线转大驼峰
 * @param str
 * @example
 * toPascalCase('d-example-text') // DExampleText
 */
export const toPascalCase = (str: string): string => {
  return str
    .replace(/(-\w)/g, (_) => _.substr(1, 1).toUpperCase())
    .replace(/^(\w)/, _ => _.toUpperCase())
}

/**
 * 生成随机值
 * @param {number} length 长度
 * @returns {string}
 */
export const createRandomID = (length: number = 12): string => {
  let result: string[] = []
  let word = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
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
