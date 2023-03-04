/**
 * 防抖
 * @param {function} fn 执行函数
 * @param {number} wait 等待时间，毫秒
 * @param {boolean} immediate 是否立即执行
 */
export default function debounce(fn: () => void, wait = 0, immediate = false): () => void {
  let timer: ReturnType<typeof setTimeout>
  let _immediate = immediate
  return function (...rest: any) {
    if (_immediate) {
      fn.apply(this, rest)
      _immediate = false
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      immediate ? (_immediate = true) : fn.apply(this, rest)
    }, wait)
  }
}
