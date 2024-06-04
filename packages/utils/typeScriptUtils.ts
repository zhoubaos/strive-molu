/**
 * @desc 替换对象中的属性为新的类型
 */
export type ReplaceObjKeyType<T, Key, NewType> =
  T extends Record<string, any>
    ? {
        [k in keyof T]: [k] extends [Key] ? NewType : T[k];
      }
    : T;

/**
 * @desc 让对象中的某一个属性变为可选
 */
export type PartialKey<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export {};
