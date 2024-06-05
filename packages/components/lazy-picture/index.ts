import { withInstall } from '@strive-molu/utils';
import LazyPicture from './src/lazy-picture.vue';

export const SmLazyPicture = withInstall(LazyPicture);
export default SmLazyPicture;

export type { LazyPictureInstance } from './src/instance';
