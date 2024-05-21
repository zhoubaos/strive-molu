import { isClient } from './browser';

// 用于实现可以在每一帧中执行目标函数
export const rAF = (fn: () => void) =>
  isClient ? requestAnimationFrame(fn) : (setTimeout(fn, 16) as unknown as number);

// 用于取消在每一帧中执行目标函数
export const cAF = (id: number) => (isClient ? cancelAnimationFrame(id) : clearTimeout(id));
