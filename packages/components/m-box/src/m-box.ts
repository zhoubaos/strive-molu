import { buildProps } from '@strive-molu/utils';

import type { ExtractPropTypes } from 'vue';

export const mBoxProps = buildProps({
  name: {
    type: String
  }
} as const);
export type MBoxProps = ExtractPropTypes<typeof mBoxProps>;

export const mBoxEmits = {};
export type MBoxEmits = typeof mBoxEmits;
