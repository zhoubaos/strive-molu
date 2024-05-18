// 该文件用于保存数据类型判断
import { isArray, isObject } from '@vue/shared';
export { isArray, isFunction, isObject, isString, isDate, isPromise, isSymbol } from '@vue/shared';
export { isVNode } from 'vue';

// typescript is关键字作用：用于类型保护，判断某个变量是否是某个类型，如果函数返回值是true，则说明该变量是该类型，可以直接使用该类型的方法

export const isUndefined = (val: any): val is undefined => val === undefined;
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean';
export const isNumber = (val: any): val is number => typeof val === 'number';

// 判断是否是null或undefined
export const isNil = (val: any): val is null | undefined => val == null;

// 判断是否是空值
export const isEmpty = (val: unknown) =>
  (!val && val !== 0) ||
  (isArray(val) && (val as Array<unknown>).length === 0) ||
  (isObject(val) && !Object.keys(val).length);

export const isElement = (e: unknown): e is Element => {
  if (typeof Element === 'undefined') return false;
  return e instanceof Element;
};
