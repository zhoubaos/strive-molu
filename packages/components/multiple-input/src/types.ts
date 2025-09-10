export interface ValidateItem {
  /**
   * @desc 自定义验证的方法
   * @param text 当前输入框的值
   * @param otherTexts 其他输入框非空值
   * @param before 当前输入框之前的文本
   * @param after 当前输入框之后的文本
   * @example
   *
   * // 验证输入文本的长度是否在5 ~ 55 之间
   * validate(text, otherTexts) {
   *    return text.trim().length >=5 && text.trim().length <=55
   * }
   */
  validate: (text: string, otherTexts: string[], before: string[], after: string[]) => boolean;
  /**
   * @desc 用于在输入文本不能通过校验函数时，给出的提示
   * @example 以下标题内容只能在5~55字符之间
   */
  errLabel: string; //校验失败文本
  /**
   * @desc 排除源文本
   * @default false
   */
  excludeSource?: boolean;
}
export interface InputItem {
  id: number; // 唯一表示
  value: string;
  validate: boolean; // 验证状态
  el: any; // el实例
}

export interface ErrorValidItem {
  label: string;
  rowNums: number[]; // 验证失败的行数
}

// 快捷按钮配置
export interface QuickBtnConfig {
  /**
   * @desc 快速按钮名称
   */
  name: string;
  /**
   * 处理当前输入框列表
   * @param inputList 当前输入框列表
   */
  handleCallback: (inputList: InputItem[]) => InputItem[];
}
