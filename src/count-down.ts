/**
 * 倒计时
 * @param {number} time 时间，单位：秒
 * @param {string} timer 定时器名，用于挂载到 window
 * @param {function} endCallback 结束时的回调函数
 * @param {function} duringCallback 倒计时进行中的回调函数
 */
export default function countDown(time: number, timer: string, endCallback?: Function, duringCallback?: Function): (() => void) | undefined {
  if (!window) throw new Error('window is not defined.')
  if (time > 0) {
    duringCallback && duringCallback()
    time--

    // @ts-ignore
    window[timer] = window.setTimeout(() => {
      countDown(time, timer, endCallback, duringCallback)
    }, 1000)

    // @ts-ignore
    return () => clearTimeout(window[timer])
  }

  // @ts-ignore
  clearTimeout(window[timer])
  endCallback && endCallback()
}
