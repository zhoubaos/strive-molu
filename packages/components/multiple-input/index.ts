import { withInstall } from '@strive-molu/utils';
import MultipleInput from './src/multiple-input.vue';
import type { SFCWithInstall } from '@strive-molu/utils';

export const SmMultipleInput: SFCWithInstall<typeof MultipleInput> = withInstall(MultipleInput);
export default SmMultipleInput;

export * from './src/multiple-input';
export * from './src/types';
export * from './src/utils';
export type { MultipleInputInstance } from './src/instance';
