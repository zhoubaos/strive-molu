import { buildProps } from '@strive-molu/utils';

import type { ExtractPropTypes } from 'vue';

export const dragResizeProps = buildProps({} as const);
export type DragResizeProps = ExtractPropTypes<typeof dragResizeProps>;

export const dragResizeEmits = {};
export type DragResizeEmits = typeof dragResizeEmits;
