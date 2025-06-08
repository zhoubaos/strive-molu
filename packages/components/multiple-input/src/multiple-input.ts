import { buildProps, definePropType } from '@strive-molu/utils';

import type { ExtractPropTypes } from 'vue';

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

export const multipleInputProps = buildProps({
  /**
   * @desc title
   */
  title: {
    type: String,
    required: true
  },
  /**
   * @desc 默认文本
   */
  defaultTexts: {
    type: definePropType<string[]>(Array),
    default: () => [] as string[]
  },
  /**
   * @desc 宽度
   */
  width: String,
  /**
   * @desc 最大行数，默认无限制
   */
  max: Number,
  /**
   * @desc 是否显示最大行数
   * @default true
   */
  showMax: {
    type: Boolean,
    default: true
  },
  /**
   * @desc 提示信息
   */
  tips: String,
  placeholder: {
    type: String,
    default: '请输入内容'
  },
  /**
   * @desc 是否支持乱序
   * @default false
   */
  supporOutSort: {
    type: Boolean,
    default: false
  },
  /**
   * @desc 验证规则
   */
  validateList: {
    type: definePropType<ValidateItem[]>(Array),
    default: () =>
      [
        {
          validate: (val: string) => {
            return val.length >= 1;
          },
          errLabel: '内容不能为空',
          excludeSource: false
        }
      ] as ValidateItem[]
  },
  /**
   * @desc 解析剪贴板内容
   */
  parseTextsWithClipboard: {
    type: definePropType<(val: string) => string[]>(Function),
    default: (val: string) => {
      return val.split('\n');
    }
  }
} as const);
export type MultipleInputProps = ExtractPropTypes<typeof multipleInputProps>;

export const multipleInputEmits = {};
export type MultipleInputEmits = typeof multipleInputEmits;
