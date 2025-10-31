import { buildProps } from '@strive-molu/utils';

import type { ExtractPropTypes } from 'vue';

export const dragResizeProps = buildProps({
  /**
   * 左右box最小宽度，值为0为left box默认宽度
   * @default 100
   */
  minWidth: {
    type: Number,
    default: 100
  },
  /**
   * drag line width
   */
  dragLineWidth: {
    type: Number,
    default: 4
  }
} as const);
export type DragResizeProps = ExtractPropTypes<typeof dragResizeProps>;

export const dragResizeEmits = {};
export type DragResizeEmits = typeof dragResizeEmits;
