import { buildProps, definePropType } from '@strive-molu/utils';
import { isArray } from '@strive-molu/utils';

import type { ExtractPropTypes } from 'vue';

export interface NodeProps {
  /**
   * id key
   * @default 'id'
   */
  id?: string;
  /**
   * name key
   * @default 'name'
   */
  name?: string;
  /**
   * children key
   * @default 'children'
   */
  children?: string;
  /**
   * 每个层级的标题，不传就不会展示title
   * @example ['一级标题', '二级标题', '三级标题']
   */
  titles?: string[];
  /**
   * 返回选择id策略
   * * all  返回选择的所有id
   * * parent 只返回选择列表中的parent节点id（如果叶子节点的父节点没有选中，就返回选中的叶子节点）
   * * child 只返回叶子节点id
   * @default 'all'
   */
  checkStrategy?: 'all' | 'parent' | 'child';
}

export const cascaderProps = buildProps({
  tree: {
    type: definePropType<any[]>(Array),
    required: true
  },
  /**
   * 宽度
   */
  width: {
    type: String,
    default: '100%'
  },
  /**
   * 最多展示层级
   */
  maxLevel: {
    type: Number,
    default: 3
  },
  /**
   * 是否显示全选框
   */
  showCheckbox: {
    type: Boolean,
    default: true
  },
  /**
   * 节点属性配置
   */
  nodeProps: {
    type: definePropType<Partial<NodeProps>>(Object),
    default: () => ({})
  }
} as const);
export type CascaderProps = ExtractPropTypes<typeof cascaderProps>;

export const cascaderEmits = {
  change: (ids: number[]) => isArray(ids)
};
export type CascaderEmits = typeof cascaderEmits;
