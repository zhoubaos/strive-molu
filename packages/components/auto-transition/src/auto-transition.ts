import { buildProps } from '@strive-molu/utils';

import type { ExtractPropTypes } from 'vue';

export const autoTransitionProps = buildProps({
  /**
   * 过渡效果函数
   */
  timingFunction: {
    type: String,
    default: 'ease-in-out'
  },
  /**
   * 触发方向
   */
  direction: {
    type: String,
    values: ['vertical', 'horizontal'],
    default: 'vertical'
  }
} as const);
export type AutoTransitionProps = ExtractPropTypes<typeof autoTransitionProps>;

export const autoTransitionEmits = {};
export type AutoTransitionEmits = typeof autoTransitionEmits;
