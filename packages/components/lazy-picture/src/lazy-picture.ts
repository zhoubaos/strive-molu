import { type PartialKey } from '@strive-molu/utils';
export type LazyPictureProps = {
  /**
   * @desc 网络图片地址
   */
  lazyUrl: string;
  /**
   * @desc 图片loading显示的图片地址
   */
  loadUrl?: string;
  /**
   * @desc 图片的适配
   */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
};

export const defaultLazyPictureProps: Record<PartialKey<LazyPictureProps>, any> = {
  loadUrl: '',
  objectFit: 'contain'
};
