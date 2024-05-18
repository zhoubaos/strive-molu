import { buildProps } from '@strive-molu/utils';
import type { ExtractPropTypes } from 'vue';

export const buttonTypes = ['default', 'primary', 'success', 'warning', 'danger', 'info', 'text'] as const;

export const buttonProps = buildProps({
  /**
   * @description: 按钮是否禁止点击
   */
  disabled: Boolean,
  /**
   * @description: 按钮类型
   */
  type: {
    type: String,
    values: buttonTypes,
    default: 'default'
  }
});

// 获取运行时且面向内部的prop类型
// eg：https://cn.vuejs.org/api/utility-types.html#extractproptypes
export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
export type ButtonType = ButtonProps['type'];
