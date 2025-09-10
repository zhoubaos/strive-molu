import { buildProps, definePropType } from '@strive-molu/utils';

import type { ExtractPropTypes } from 'vue';
import { QuickBtnConfig, ValidateItem } from './types';

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
   * @default Infinity
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
  tip: String,
  /**
   * @desc 输入框的占位符
   */
  placeholder: {
    type: String,
    default: '请粘贴或输入，回车可换行'
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
   * @desc 所有功能不能操作，只能展示
   * @default false
   */
  disabled: {
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
  },
  /**
   * @desc 扩展快速操作
   */
  extendQuickActions: {
    type: definePropType<QuickBtnConfig[]>(Array),
    default: () => [] as QuickBtnConfig[]
  }
} as const);
export type MultipleInputProps = ExtractPropTypes<typeof multipleInputProps>;

export const multipleInputEmits = {};
export type MultipleInputEmits = typeof multipleInputEmits;
