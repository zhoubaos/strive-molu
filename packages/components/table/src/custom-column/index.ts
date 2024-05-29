import { buildProps, definePropType } from '@strive-molu/utils';
import { type Column } from '../table-column';
import type { ExtractPropTypes } from 'vue';

export const customColumnProps = buildProps({
  /**
   * @desc 控制自定义列弹框显示隐藏
   * @example v-model:visible = "xxx"
   */
  visible: Boolean,
  columns: {
    type: definePropType<Column[]>(Array),
    default: () => []
  },
  tableHash: {
    type: String,
    default: ''
  }
});

console.log(customColumnProps);

export const customColumnEmits = {
  'update:visible': (visible: boolean) => true,
  'checked-column-props': (cols: string[]) => Array.isArray(cols)
};

export type CustomColumnProps = ExtractPropTypes<typeof customColumnProps>;
