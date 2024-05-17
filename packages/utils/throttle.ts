/**
 * 节流函数：在一定时间内只执行一次
 * @param fn 待执行函数
 * @param delay 延迟时间
 * @param immediate 是否立即执行
 * @returns
 */
export const throttle = (fn: (...args: any[]) => void, delay: number, immediate = false) => {
  let timer: any = null;
  let flag = true;

  const throttleFn = (...reset: any[]) => {
    if (!flag) return;
    if (immediate) {
      fn.apply(this, reset);
      flag = false;
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        flag = true;
      }, delay);
    } else {
      flag = false;
      timer = setTimeout(() => {
        fn.apply(this, reset);
        clearTimeout(timer);
        timer = null;
        flag = true;
      }, delay);
    }
  };

  throttleFn.cancel = () => {
    clearTimeout(timer);
    timer = null;
    flag = true;
  };

  return throttleFn;
};
