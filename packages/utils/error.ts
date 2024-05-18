// 该文件保存错误或警告函数
import { isString } from './types';

class StriveMoluError extends Error {
  constructor(m: string) {
    super(m);
    this.name = 'StriveMoluError';
  }
}
/**
 * 抛出错误函数
 * @param scope 错误类型
 * @param message 错误信息
 */
export function throwError(scope: string, message: string): never {
  throw new StriveMoluError(`[${scope}]: ${message}`);
}

// 警告函数的定义（重载）
export function debugWarn(err: Error): void;
export function debugWarn(scope: string, message: string): void;
// 警告函数的实现
export function debugWarn(scope: string | Error, message?: string): void {
  if (process.env.NODE_ENV !== 'production') {
    const error: Error = isString(scope) ? new StriveMoluError(`[${scope}] ${message}`) : (scope as Error);
    // eslint-disable-next-line no-console
    console.warn(error);
  }
}
