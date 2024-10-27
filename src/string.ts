/**
 * 下划线转小驼峰
 * @param {string} str 转换字符串：user_info => userInfo
 * @param {string[]} separators 扩展分隔符，默认分割下划线：_
 * @returns {string}
 */
export const toLowerCamelCase = (str: string, separators?: string[]): string => {
  const _separators = [...(separators || []), '_'].join('|')
  return str.replace(new RegExp(`((${_separators})[a-z])+`, 'g'), (_match, $1) =>
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
    .replace(/(-\w)/g, (_) => _.substring(1, 2).toUpperCase())
    .replace(/^(\w)/, _ => _.toUpperCase())
}

/**
 * 生成随机值
 * @param length ID 长度，默认 12 位
 */
export const createRandomID = (length = 12): string => {
  const result: string[] = []
  const word = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  const wordLength = word.length
  for (let i = 0; i < length; i++) {
    result.push(word[Math.round(Math.random() * wordLength)])
  }
  return result.join('')
}

/**
 * 首字母大写
 * @param str
 */
export const firstLetterUppercase = <T extends string>(str: T) => {
  const [first, ...rest] = str
  return `${first.toUpperCase()}${rest.join('')}` as FirstLetterUppercase<T>
}

/**
 * 首字母小写
 * @param str
 */
export const firstLetterLowercase = <T extends string>(str: T) => {
  const [first, ...rest] = str
  return `${first.toLowerCase()}${rest.join('')}` as FirstLetterLowercase<T>
}

export type FirstLetterUppercase<T extends string> = T extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : T

export type FirstLetterLowercase<T extends string> = T extends `${infer First}${infer Rest}` ? `${Lowercase<First>}${Rest}` : T
