import { TreeTools, TreeNode } from '@strive-molu/utils';
import { CascaderProps, NodeProps } from './cascader';
import { computed, ref, defineModel, shallowRef, watch } from 'vue';

export function useCascader(props: CascaderProps) {
  //   节点属性
  const mergeNodeProps: Required<NodeProps> = Object.assign(
    {
      id: 'id',
      name: 'name',
      children: 'children',
      checkStrategy: 'all',
      titles: []
    },
    props.nodeProps ?? {}
  );
  //   列最小宽度
  const columnMinWidth = computed(() => {
    const w = parseInt(props.width);
    const unit = props.width.slice(String(w).length);
    const v = w / props.maxLevel + 0.01;

    return v + unit;
  });

  const treeTools = ref(new TreeTools(props.tree ?? []));
  const treeData = computed(() => treeTools.value.tree ?? []);

  //   设置Tree 选择状态
  const setTreeSelected = (tree: TreeNode[], ids: Array<string | number>) => {
    if (!tree?.length) return;
    for (const node of tree) {
      if (ids.includes(node[mergeNodeProps.id])) {
        node.selected = true;
        node.indeterminate = false;
        // 更新子节点选中状态
        updateChildNodeSelectStatus(node);
        // 更新父节点选中状态
        updateParentNodeSelectStatus(node);
      } else {
        node.selected = false;
        node.indeterminate = false;
      }
      setTreeSelected(node[mergeNodeProps.children], ids);
    }
  };
  //   列标题
  const columnTitles = ref<string[]>([]);
  const columnCheckAll = ref<Array<Record<'selected' | 'indeterminate', boolean>>>([]);

  //   当前渲染的节点数据
  const renderColumns = shallowRef<TreeNode[][]>([]);

  // 当前展开路径
  const curExpandPath = ref<TreeNode[]>([]);
  /**
   * 处理面包展开
   * @param node
   * @param ind 当前点击的列索引
   */
  const toggleExpand = (node: TreeNode, ind: number) => {
    const children = node[mergeNodeProps.children] || [];
    if (children.length) {
      renderColumns.value = [...renderColumns.value.slice(0, ind + 1), children];
    } else {
      renderColumns.value = [...renderColumns.value.slice(0, ind + 1)];
    }
    curExpandPath.value = [...curExpandPath.value.slice(0, ind), node];
  };

  /**
   * 更新子元素节点选中状态
   */
  const updateChildNodeSelectStatus = (node: TreeNode) => {
    if (!node[mergeNodeProps.children] || node[mergeNodeProps.children].length === 0) {
      return;
    }
    const children = node[mergeNodeProps.children];
    for (const cNode of children) {
      cNode.selected = node.selected;
      updateChildNodeSelectStatus(cNode);
    }

    // 当前节点的中间态状态
    node.indeterminate = children.some((cNode: TreeNode) => cNode.selected || cNode.indeterminate) && !node.selected;
  };
  /**
   * 更新父节点选中框状态
   */
  const updateParentNodeSelectStatus = (node: TreeNode) => {
    let parent = node.parentNode;
    while (parent) {
      const children = parent[mergeNodeProps.children] || [];
      parent.selected = children.every((cNode: TreeNode) => cNode.selected);
      parent.indeterminate =
        children.some((cNode: TreeNode) => cNode.selected || cNode.indeterminate) && !parent.selected;
      parent = parent.parentNode;
    }
  };

  /**
   * 更新全选框选中状态
   */
  const updateCheckAllSelectStatus = () => {
    if (!columnCheckAll.value.length) return;
    // 设置第一列的选中状态
    columnCheckAll.value[0].selected = treeData.value.every((cNode) => cNode.selected);
    columnCheckAll.value[0].indeterminate =
      treeData.value.some((cNode) => cNode.selected || cNode.indeterminate) && !columnCheckAll.value[0].selected;

    // 设置其他列的选中状态
    for (let i = 0; i < curExpandPath.value.length; i++) {
      const curNode = curExpandPath.value[i];
      if (columnCheckAll.value[i + 1]) {
        columnCheckAll.value[i + 1].selected = curNode.selected;
        columnCheckAll.value[i + 1].indeterminate = curNode.indeterminate;
      }
    }
  };

  return {
    setTreeSelected,
    mergeNodeProps,
    columnMinWidth,
    treeTools,
    treeData,
    curExpandPath,
    toggleExpand,
    renderColumns,
    columnTitles,
    columnCheckAll,
    updateChildNodeSelectStatus,
    updateParentNodeSelectStatus,
    updateCheckAllSelectStatus
  };
}
