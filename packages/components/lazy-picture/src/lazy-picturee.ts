import { buildProps, definePropType } from '@strive-molu/utils';
import type { ExtractPropTypes, PropType } from 'vue';

export const lazyPictureProps = buildProps({
  /**
   * @desc 网络图片地址
   */
  url: {
    type: String,
    required: true
  },
  /**
   * @desc 图片loading地址
   */
  loadingUrl: {
    type: String,
    default: ''
  },
  objectFit: {
    type: definePropType<'contain' | 'cover' | 'fill' | 'none' | 'scale-down'>(
      String
    ),
    default: 'contain'
  }
});

export type LazyPictureProps = ExtractPropTypes<typeof lazyPictureProps>;
