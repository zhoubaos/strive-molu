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
export type SetPartialKey<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * @desc 获取对象中必填的属性类型
 * @example
 * type A = { a: string, b?: number, c: string };
 * type B = RequiredKey<A>; // "a" | "c"
 */
export type RequiredKey<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

/**
 * @desc 获取对象中可选的属性类型
 * @example
 * type A = { a: string, b?: number, c: string };
 * type B = OptionalKey<A>; // "b"
 */
export type PartialKey<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

export type Arrayable<T> = T | T[];

export {};
