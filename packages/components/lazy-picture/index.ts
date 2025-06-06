import { SFCWithInstall, withInstall } from '@strive-molu/utils';
import LazyPicture from './src/lazy-picture.vue';

export const SmLazyPicture: SFCWithInstall<typeof LazyPicture> =
  withInstall(LazyPicture);
export default SmLazyPicture;

export type { LazyPictureInstance } from './src/instance';
