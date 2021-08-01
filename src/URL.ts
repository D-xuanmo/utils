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
export const formatQueryParame = (params: string): { [key: string]: string } => {
  const decodeParams = decodeURIComponent(params).replace('?', '').split('&')
  const result: {
    [key: string]: string;
  } = {}
  for (let i = 0; i < decodeParams.length; i++) {
    const item = decodeParams[i]
    item.replace(/([^?&]*)=([^?&]*)/, (match, $1, $2) => {
      result[$1] = $2
      return match
    })
  }
  return result
}
