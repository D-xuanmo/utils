/**
 * 防抖
 * @param fn 执行函数
 * @param wait 等待时间，毫秒
 * @param immediate 是否立即执行
 */
export function debounce(fn: (...rest: any) => void, wait = 0, immediate = false): () => void {
  let timer: ReturnType<typeof setTimeout>
  return function (...rest: any) {
    if (immediate) {
      fn.apply(this, rest)
    } else {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, rest)
      }, wait)
    }
  }
}

/**
 * 防抖装饰器版
 * @param wait 等待时间，毫秒
 * @param immediate 是否立即执行
 */
export function debounceDecorator(wait: number, immediate?: boolean) {
  let timer: ReturnType<typeof setTimeout>
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const fn = descriptor.value as Function
    descriptor.value = function handler(...rest: any) {
      if (immediate) {
        fn.apply(this, rest)
      } else {
        clearTimeout(timer)
        timer = setTimeout(() => {
          fn.apply(this, rest)
        }, wait)
      }
    }
    return descriptor
  }
}
