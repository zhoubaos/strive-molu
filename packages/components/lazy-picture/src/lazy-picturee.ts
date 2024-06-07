import type { ExtractPropTypes, PropType } from 'vue';

export const lazyPictureProps = {
  /**
   * @desc 网络图片地址
   */
  lazyUrl: {
    type: String,
    required: true
  },
  /**
   * @desc 图片loading显示的图片地址
   */
  loadUrl: {
    type: String,
    default: ''
  },
  objectFit: {
    type: Object as PropType<'contain' | 'cover' | 'fill' | 'none' | 'scale-down'>,
    default: 'contain'
  }
};
export type LazyPictureProps = ExtractPropTypes<typeof lazyPictureProps>;
