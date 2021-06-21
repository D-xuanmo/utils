/**
 * 获取 URL 查询参数
 * @param {string} url URL 查询参数
 * @param {string} key 参数名
 * @returns {string}
 */
export default function searchParams(url: string = location?.search, key: string): string | null {
  const searchParams = new URLSearchParams(url)

  return searchParams.get(key)
}
