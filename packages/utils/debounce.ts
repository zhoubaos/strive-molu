/**
 * 防抖函数：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
 * @param {Function} fn 需要执行的函数
 * @param {Number} delay 延迟时间
 * @param {Boolean} immediate 是否立即执行事件 (事件会立即执行。如果第一次执行后，在delay时间内再次触发n次，都不会执行事件)
 * @returns {Function}
 */
export const debounce = (fn: (...arg: any[]) => void, delay: number, immediate = false) => {
  let timer: any = 0;

  const debounceFn = (...reset: any[]) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    timer && clearTimeout(timer);
    if (immediate) {
      if (!timer) {
        fn.apply(context, reset);
      }
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    } else {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(context, reset);
      }, delay);
    }
  };

  debounceFn.cancel = () => {
    clearTimeout(timer);
    timer = null;
  };

  return debounceFn;
};
