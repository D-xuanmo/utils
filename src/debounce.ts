/**
 * 防抖
 * @param {function} fn 执行函数
 * @param {number} wait 等待时间，毫秒
 * @param {boolean} immediate 是否立即执行
 */
export default function debounce(fn: Function, wait: number = 0, immediate: boolean = false): Function {
  let timer: ReturnType<typeof setTimeout>
  let _immediate = immediate
  return function () {
    const args = arguments
    if (_immediate) {
      fn.apply(this, arguments)
      _immediate = false
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      immediate ? (_immediate = true) : fn.apply(this, args)
    }, wait)
  }
}
