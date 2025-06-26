/**
 * @function js动画函数
 * @param from 动画开始参数
 * @param to 动画结束参数
 * @param duration 动画持续时间
 * @param callback 获取当前参数的回调函数
 */

import { rAF } from './raf';

type Callback = {
  (curVaule: number): void;
};

// 传入参数配置
export type Option = {
  from: number; // 动画开始数值
  to: number; //动画结束数值
  duration?: number; //动画持续时间，单位ms
  decimalCount?: number; //保留小数位数，默认不保留
};

export function animationFn(option: Option, callback: Callback): void {
  const { from, to, duration, decimalCount } = Object.assign(
    {
      duration: 400,
      decimalCount: 0
    },
    option
  );
  const dis = to - from;
  const speed = dis / duration;
  const startT = performance.now();
  let value = Number(from.toFixed(decimalCount)); //当前的值
  callback(value);
  function _run(timeStamp: number) {
    const time = timeStamp - startT;
    if (time >= duration) {
      value = to;
      callback(value);
      return;
    }
    const d = time * speed; //删除得到数值的小数部分
    value = Number((from + d).toFixed(decimalCount)); //当前的值
    callback(value);
    rAF(_run);
  }
  rAF(_run);
}
