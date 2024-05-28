import { buildProps, definePropType } from '@strive-molu/utils';
import type { ExtractPropTypes } from 'vue';

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
export type Column = {
  /**
   * @desc 字段名称 对应列内容的字段名
   */
  prop: string;
  /**
   * @desc 表头标题名称
   */
  label?: string;
  columnKey?: string;
  type?: 'selection' | 'index' | 'expand';
  index?: (index: number) => number | string;
  width?: string | number;
  minWidth?: string | number;
  fixed?: true | 'left' | 'right';
  /**
   *  @desc 表格数据排序方式 true 在当前页排序 custom 自定义排序方式
   */
  sortable?: 'custom' | true | false;
  sortMethod?: (a: any, b: any) => any;
  sortBy?: (row: any, index: number) => any | string | string[];
  sortOrders?: SortByItem[];
  formatter?: (...reset: any[]) => any;
  selectable?: (row: any, index: number) => boolean;
  showOverflowTooltip?: boolean;
  align?: 'left' | 'center' | 'right';
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
   * 配置表格的多级表头
   */
  children?: Column[];
} & {
  [k in string]: any;
};

export const tableColumnProps = buildProps({
  column: {
    type: definePropType<Column>(Object),
    required: true
  }
});

export type TableColumnProps = ExtractPropTypes<typeof tableColumnProps>;
