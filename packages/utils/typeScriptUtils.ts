// 替换对象中属性的类型
export type ReplaceObjKeyType<T, Key, NewType> =
  T extends Record<string, any>
    ? {
        [k in keyof T]: [k] extends [Key] ? NewType : T[k];
      }
    : T;
