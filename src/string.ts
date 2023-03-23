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
export const createRandomID = (length = 12): string => {
  const result: string[] = []
  const word = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const wordLength = word.length
  for (let i = 0; i < length; i++) {
    result.push(word[Math.round(Math.random() * wordLength)])
  }
  return result.join('')
}
