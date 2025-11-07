import { buildProps } from '@strive-molu/utils';

import type { ExtractPropTypes } from 'vue';

export const autoTransitionProps = buildProps({
  /**
   * 过渡效果
   */
  transition: {
    type: String,
    default: 'all ease-in-out 0.5s'
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
