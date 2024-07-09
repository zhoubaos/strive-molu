/**
 * 倒计时函数：具有自动补时功能
 * @param initTime 到计时初始值，单位ms
 * @param callback 获取当前的毫秒值
 */
export const countdown = (initTime: number, callback: (t: number) => void) => {
  /* eslint-disable prefer-const */
  let startTimer: any = null;
  let coundownTimer: any = null;

  const clearTimer = () => {
    startTimer && clearTimeout(startTimer);
    coundownTimer && clearTimeout(coundownTimer);
  };

  // 当前剩余时间，
  let remainTime = Math.ceil(initTime / 1000) * 1000;
  // 执行核心函数间隔时间
  let intervalTime = initTime % 1000 || 1000;

  // 倒计时功能开始执行时间
  let sTime = performance.now();
  startTimer = setTimeout(startCountDown, intervalTime);

  // 执行倒计时核心函数
  function startCountDown() {
    if (remainTime <= 0) return;
    clearTimer();

    const cTime = performance.now();

    // 计算每次执行核销函数的时间
    const executionTime = cTime - sTime;
    // 计算和上一次间隔时间在1秒内的差值
    const diffTime = (executionTime - intervalTime) % 1000;

    // 重新计算下一次调用核心函数的间隔时间
    intervalTime = 1000 - diffTime;

    remainTime = remainTime - (Math.floor(executionTime / 1000) || 1) * 1000;
    callback(remainTime <= 0 ? 0 : remainTime);

    // 重置倒计时开始时间
    sTime = performance.now();
    requestAnimationFrame(() => {
      coundownTimer = setTimeout(startCountDown, intervalTime);
    });
  }
};
