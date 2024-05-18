// 给类型扩展属性
type ExtendsType<Type, K extends keyof any, Value = any> = {
  [K in keyof Type]: Type[K];
} & {
  [T in K]: Value;
};
export type Option = {
  /**
   * @desc text如果是字符串，首字母必须大写
   */
  text: Capitalize<string>;
  link?: string;
  items?: Option[];
};

export type NavOption = ExtendsType<Option, 'activeMatch', string>;
