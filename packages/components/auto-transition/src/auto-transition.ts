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
  },
  /**
   * 触发方式
   * @default 'hover' // 鼠标移入或移出触发
   */
  trigger: {
    type: String,
    values: ['custom', 'hover'],
    default: 'hover'
  }
} as const);
export type AutoTransitionProps = ExtractPropTypes<typeof autoTransitionProps>;

export const autoTransitionEmits = {};
export type AutoTransitionEmits = typeof autoTransitionEmits;
