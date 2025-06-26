import { buildProps, definePropType } from '@strive-molu/utils';
import { SelectContext } from 'element-plus';

import type { ExtractPropTypes } from 'vue';

export const formFrameProps = buildProps({
  /**
   * label
   */
  label: String,
  /**
   * label 宽度
   */
  labelWidth: Number,
  /**
   * 宽度
   */
  width: Number,
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * @desc label类型
   * @default default
   * @example
   * default => 默认为字符串
   * select => 下拉选择框
   */
  labelType: {
    type: definePropType<'default' | 'select'>(String),
    default: 'default'
  },
  /**
   * @desc type为select时el-select的配置项
   */
  labelOption: {
    type: definePropType<Array<{ label: string; value: string | number }>>(Array),
    default: () => []
  },
  /**
   * @desc type为select-search时el-select的属性
   */
  labelProps: {
    type: definePropType<Partial<SelectContext['props']>>(Object),
    default: () => ({})
  }
} as const);
export type FormFrameProps = ExtractPropTypes<typeof formFrameProps>;
