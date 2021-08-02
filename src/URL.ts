/**
 * 获取 URL 查询参数
 * @param {string} url URL 查询参数
 * @param {string} key 参数名
 * @returns {string}
 */
export function searchParams(url: string = location?.search, key: string): string | null {
  const searchParams = new URLSearchParams(url)

  return searchParams.get(key)
}

/**
 * 格式化查询参数
 * @param {string} params get 请求查询参数
 * @returns {object} [key: string]: string
 */
export const formatQueryParams = (params: string): { [key: string]: string } => {
  const decodeParams = /\?(?<params>(.*)=.+)/.exec(decodeURIComponent(params))?.groups

  if (!decodeParams) return {}

  const newParams = decodeParams.params.split('&')
  const result: {
    [key: string]: string
  } = {}

  for (let i = 0; i < newParams.length; i++) {
    const item = newParams[i]
    item.replace(/([^?&]*)=([^?&]*)/, (match, $1, $2) => {
      result[$1] = $2
      return match
    })
  }
  return result
}
