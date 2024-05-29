import { buildProps, definePropType } from '@strive-molu/utils';
import type { ExtractPropTypes } from 'vue';
import { type Column } from './table-column';

export const tableProps = buildProps({
  /**
   * @desc 表格数据
   */
  data: {
    type: definePropType<any[]>(Array),
    default: () => []
  },
  /**
   * @desc 表格配置项
   */
  columns: {
    type: definePropType<Column[]>(Array),
    default: () => []
  },
  /**
   * @desc 表格数据的总条数
   */
  total: {
    type: Number,
    default: 0
  },
  /**
   * @desc 单元格的值满足 placeHolderValues 的占位符
   */
  placeholder: {
    type: String,
    default: '--'
  },
  /**
   * @desc 单元格的值包含在该属性的值内，使用站位符
   */
  emptyValues: {
    type: definePropType<any[]>(Array),
    default: () => [null, undefined, '']
  },
  /**
   * @desc 是否展示自定义控制表格展示的列的功能，
   * 注意：自定义列暂时不支持多级表头
   */
  isCustomColumn: Boolean
});

export const tableEmits = {};

// 获取运行时且面向内部的prop类型
// eg：https://cn.vuejs.org/api/utility-types.html#extractproptypes
export type TableProps = ExtractPropTypes<typeof tableProps>;
export type TableEmits = typeof tableEmits;
