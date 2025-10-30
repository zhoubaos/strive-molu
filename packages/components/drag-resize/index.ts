import { withInstall } from '@strive-molu/utils';
import DragResize from './src/drag-resize.vue';
import type { SFCWithInstall } from '@strive-molu/utils';

export const SmDragResize: SFCWithInstall<typeof DragResize> = withInstall(DragResize);
export default SmDragResize;

export * from './src/drag-resize';
export type { DragReszieInstance } from './src/instance';
