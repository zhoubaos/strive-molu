import { SetRequiredKey, buildProps, definePropType } from '@strive-molu/utils';
import type { ExtractPropTypes } from 'vue';
import { TableColumnCtx } from 'element-plus';
import { DefaultRow } from 'element-plus/es/components/table/src/table/defaults.mjs';

// 表格排序值
export type SortByItem = 'ascending' | 'descending' | null;

export type Slots = {
  /**
   * @desc 表格的的表头插槽
   */
  title?: string;
  /**
   * @desc 表格的内容插槽
   */
  customRender?: string;
};
// 大部分配置都来自 element-plus TableColumn 组件的prop
export type Column<T extends DefaultRow = DefaultRow> = SetRequiredKey<Partial<TableColumnCtx<T>>, 'prop'> & {
  /**
   * @desc 在使用自定义列的功能时，该属性用于约束该列属性一直可以显示
   * @default false
   */
  isRequired?: boolean;
  /**
   * @desc 表格的表头或内容插槽
   */
  slots?: Slots;
  /**
   * @desc 表格列类型
   * selection: 多选择列
   * single-select: 单选择列
   * index: 索引列
   * expand: 展开列
   */
  type?: 'selection' | 'single-select' | 'index' | 'expand';

  /**
   * 配置多级表头
   */
  children?: Array<Column>;
};

export const tableColumnProps = buildProps({
  /**
   * @desc 表格列的配置项
   */
  column: {
    type: definePropType<Column>(Object),
    default: () => {
      return {} as Column;
    }
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
  }
});

export type TableColumnSlots = {
  [k: string]: (props: { column?: string; index?: number; row?: any; [k: string]: any }) => void;
};

export type TableColumnProps = ExtractPropTypes<typeof tableColumnProps>;
