import { round } from 'lodash-es';
import { rAF } from './raf';
/**
 * @function js动画函数
 * @param from 动画开始参数
 * @param to 动画结束参数
 * @param duration 动画持续时间
 * @param callback 获取当前参数的回调函数
 */
type Callback = {
  (curVaule: number): void;
};

// 传入参数配置
export type Option = {
  from: number; // 动画开始数值
  to: number; //动画结束数值
  duration?: number; //动画持续时间，单位ms
  decimal?: number; //保留小数位数，默认不保留
};

export function animationFn(option: Option, callback: Callback): void {
  const { from, to, duration, decimal } = Object.assign(
    {
      duration: 400
    },
    option
  );
  //   获取to精度
  const _decimal = Number(decimal) ?? (to.toString().split('.')[1]?.length || 0);

  const rFrom = round(from, _decimal); //开始的值
  const rTo = round(to, _decimal); //结束的值

  const dis = rTo - rFrom;
  const speed = dis / duration;
  const startT = performance.now();
  let value = rFrom; //当前的值
  callback(value);
  function _run(timeStamp: number) {
    const time = timeStamp - startT;
    if (time >= duration) {
      callback(rTo);
      return;
    }
    const d = time * speed; //删除得到数值的小数部分
    value = round(rFrom + d, _decimal); //当前的值
    callback(value);
    rAF(_run);
  }
  rAF(_run);
}
