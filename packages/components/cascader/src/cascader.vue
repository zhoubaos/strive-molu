<template>
  <div
    ref="hsCascaderRef"
    :class="[nsCascader.b()]"
    :style="{
      width: props.width
    }">
    <div
      v-for="(rawData, columnInd) in renderColumns"
      :key="columnInd"
      :class="[nsCascader.b('container')]"
      :style="{
        minWidth: columnMinWidth
      }">
      <div :class="[nsCascader.be('container', 'header')]">
        <span>{{ columnTitles[columnInd] }}</span>
        <el-checkbox
          v-if="props.showCheckbox"
          v-model="columnCheckAll[columnInd].selected"
          label="全选"
          :indeterminate="columnCheckAll[columnInd].indeterminate"
          @change="(s) => handleCheckAllChange(columnInd, s as any)" />
      </div>
      <div :class="[nsCascader.be('container', 'section')]">
        <el-scrollbar>
          <div :class="[nsCascader.be('container', 'list')]">
            <div
              v-for="node in rawData"
              :key="node[mergeNodeProps.id]"
              :class="[
                nsCascader.be('container', 'node'),
                nsCascader.is(
                  'active',
                  curExpandPath.some((pathNode) => pathNode[mergeNodeProps.id] === node[mergeNodeProps.id]) ||
                    node.selected
                )
              ]"
              @click="onClick_node(node, columnInd)">
              <el-checkbox
                v-model="node.selected"
                :indeterminate="node.indeterminate"
                @change="handleCheckChange(node, columnInd)" />
              <div :class="[nsCascader.bem('container', 'node', 'wrapper')]">
                <span :class="[nsCascader.bem('container', 'node', 'label')]">{{ node[mergeNodeProps.name] }}</span>
                <el-icon
                  v-if="node[mergeNodeProps.children]?.length"
                  :class="[nsCascader.bem('container', 'node', 'postfix')]">
                  <ArrowRight />
                </el-icon>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <!-- 无数据 -->
    <sm-empty v-if="!renderColumns.length" />
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@strive-molu/hooks';
import { cascaderEmits, cascaderProps } from './cascader';
import { useCascader } from './use-cascader';
import { nextTick, onBeforeMount, ref, watch } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue';
import { TreeNode, TreeTools } from '@strive-molu/utils';

defineOptions({
  name: 'SmCascader'
});

const props = defineProps(cascaderProps);
const emits = defineEmits(cascaderEmits);

const nsCascader = useNamespace('cascader');
const hsCascaderRef = ref<HTMLDivElement | null>(null);

const {
  columnMinWidth,
  mergeNodeProps,
  treeTools,
  treeData,
  curExpandPath,
  renderColumns,
  columnTitles,
  columnCheckAll,
  setTreeSelected,
  toggleExpand,
  updateChildNodeSelectStatus,
  updateParentNodeSelectStatus,
  updateCheckAllSelectStatus
} = useCascader(props);

const vModalFlag = ref(false);
// 当前选中的ids
const vModalIds = defineModel<number[]>('ids', {
  required: true,
  default: () => []
});

watch(vModalIds, (n) => {
  if (!vModalFlag.value) {
    setTreeSelected(
      treeData.value,
      mergeNodeProps.checkStrategy === 'parent' ? treeTools.value.getLeafIds(vModalIds.value) : vModalIds.value
    );
    // 更新全选框状态
    updateCheckAllSelectStatus();
  }

  vModalFlag.value = false;
});

watch(
  () => props.tree,
  (n) => {
    // 初始化标题
    initTitleCheckAll();
    // 初始化树形结构
    initTree();
  },
  { deep: true }
);

//   初始化tree
const initTree = () => {
  const t = new TreeTools(props.tree ?? []);
  // 设置自定义属性
  t.addCustomAttr('selected', false);
  t.addCustomAttr('expanded', false);
  t.addCustomAttr('indeterminate', false);

  // 设置选中状态
  setTreeSelected(
    treeData.value,
    mergeNodeProps.checkStrategy === 'parent' ? t.getLeafIds(vModalIds.value) : vModalIds.value
  );

  // 更新全选框状态
  updateCheckAllSelectStatus();

  treeTools.value = t;
  renderColumns.value = t.tree.length ? [t.tree] : [];
};

//   初始化列标题
const initTitleCheckAll = () => {
  // 传入标题len
  const len = mergeNodeProps.titles.length;

  columnCheckAll.value = new Array(treeTools.value.deepLevel).fill('').map((item) => {
    return {
      selected: false,
      indeterminate: false
    };
  });
  columnTitles.value =
    len < treeTools.value.deepLevel
      ? mergeNodeProps.titles.concat(new Array(treeTools.value.deepLevel - len).fill(''))
      : mergeNodeProps.titles.slice(0, treeTools.value.deepLevel);
};

onBeforeMount(() => {
  // 初始化标题
  initTitleCheckAll();
  // 初始化树形结构
  initTree();
});
/**
 * 处理全选框变化
 * @param index
 */
const handleCheckAllChange = (index: number, selected: boolean) => {
  const curColumnNodes: TreeNode[] = renderColumns.value[index];
  const curColumnChexkAll = columnCheckAll.value[index];
  curColumnChexkAll.indeterminate = false;

  for (const node of curColumnNodes) {
    node.selected = selected;
    // 更新子节点选中状态
    updateChildNodeSelectStatus(node);

    // 更新父节点选中状态
    updateParentNodeSelectStatus(node);
  }
  // 设置全选节点选中状态
  updateCheckAllSelectStatus();
  renderColumns.value = renderColumns.value.slice(0, index + 1);

  handleSelectedNodeIds();
};

/**
 * 处理复选框变化
 * @param node
 * @param ind 当前列索引
 */
const handleCheckChange = (node: TreeNode, index: number) => {
  // 更新子节点选中状态
  updateChildNodeSelectStatus(node);

  // 更新父节点选中状态
  updateParentNodeSelectStatus(node);

  // 设置全选节点
  updateCheckAllSelectStatus();
  // 设置全选节点选中状态
  handleSelectedNodeIds();
};

/**
 * 点击Node
 * @param node
 * @param ind 当前点击的列索引
 */
const onClick_node = (node: TreeNode, ind: number) => {
  toggleExpand(node, ind);
  updateCheckAllSelectStatus();
  // 滚动到最右边
  nextTick(() => {
    hsCascaderRef.value?.scroll({
      behavior: 'smooth',
      left: hsCascaderRef.value?.scrollWidth ?? 999
    });
  });
};

/**
 * 处理返回的选中节点ids
 */
const handleSelectedNodeIds = () => {
  // 返回节点id策略
  const strategy = {
    all: handleStrategyWithAll,
    parent: handleStrategyWithParent,
    child: handleStrategyWithChild
  };
  if (typeof strategy[mergeNodeProps.checkStrategy] === 'function') {
    let selectedIds = strategy[mergeNodeProps.checkStrategy]();
    vModalIds.value = selectedIds;
    emits('change', selectedIds);
    vModalFlag.value = true;
  }
};

/**
 * 处理 checkStrategy 为all的逻辑
 */
const handleStrategyWithAll = (): any[] => {
  const allSelectedIds: any[] = [];

  function _getAllSelectedIds(tree: TreeNode[]) {
    for (const node of tree) {
      if (node.selected) {
        allSelectedIds.push(node[mergeNodeProps.id]);
      }

      if (node[mergeNodeProps.children] && node[mergeNodeProps.children].length) {
        _getAllSelectedIds(node[mergeNodeProps.children]);
      }
    }
  }
  _getAllSelectedIds(treeData.value);
  return allSelectedIds;
};

/**
 * 处理 checkStrategy 为parent的逻辑
 */
const handleStrategyWithParent = () => {
  let allSelectedIds = [];
  const nodes = treeTools.value.getNodesByLeafIds(handleStrategyWithAll());

  allSelectedIds = nodes.map((item) => item[mergeNodeProps.id]);
  return allSelectedIds;
};

/**
 * 处理 checkStrategy 为child的逻辑
 */
const handleStrategyWithChild = () => {
  let allSelectedIds: any[] = [];
  function _getAllSelectedIds(tree: TreeNode[]) {
    for (const node of tree) {
      if (node[mergeNodeProps.children] && node[mergeNodeProps.children].length) {
        _getAllSelectedIds(node[mergeNodeProps.children]);
      } else {
        node.selected && allSelectedIds.push(node[mergeNodeProps.id]);
      }
    }
  }
  _getAllSelectedIds(treeData.value);
  return allSelectedIds;
};

// exposes
// 获取选中的节点
const getSelectedNodes = () => treeTools.value.getNodes(vModalIds.value, treeTools.value.sourceTree);
// init here
</script>
