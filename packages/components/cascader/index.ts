import { withInstall } from '@strive-molu/utils';
import Cascader from './src/cascader.vue';
import type { SFCWithInstall } from '@strive-molu/utils';

export const SmCascader: SFCWithInstall<typeof Cascader> = withInstall(Cascader);
export default SmCascader;

export * from './src/cascader';
export type { CascaderInstance } from './src/instance';
