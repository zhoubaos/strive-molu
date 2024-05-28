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

// 官网：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-emits
export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
};

// 获取运行时且面向内部的prop类型
// 官网：https://cn.vuejs.org/api/utility-types.html#extractproptypes
export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
export type ButtonEmits = typeof buttonEmits;

export type ButtonType = ButtonProps['type'];
