import { withInstall } from '@strive-molu/utils';
import FormFrame from './src/form-frame.vue';
import type { SFCWithInstall } from '@strive-molu/utils';

export const SmFormFrame: SFCWithInstall<typeof FormFrame> = withInstall(FormFrame);
export default SmFormFrame;
export * from './src/form-frame';
export type { FormFrameInstance } from './src/instance';
