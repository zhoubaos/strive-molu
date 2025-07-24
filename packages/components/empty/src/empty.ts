import { buildProps } from '@strive-molu/utils';

import type { ExtractPropTypes } from 'vue';

export const emptyProps = buildProps({
  /**
   * 图片地址
   */
  src: {
    type: String
  },
  /**
   * 图片尺寸
   * @default 140
   */
  size: {
    type: Number,
    default: 140
  },
  /**
   * 图片描述
   */
  description: {
    type: String
  }
} as const);
export type EmptyProps = ExtractPropTypes<typeof emptyProps>;

export const emptyEmits = {};
export type EmptyEmits = typeof emptyEmits;
