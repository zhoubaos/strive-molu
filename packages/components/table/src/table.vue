<template>
  <div :class="[nsTable.b(), nsTable.m(props.size)]">
    <!-- 自定义列 -->
    <header
      v-if="canCustomColumn"
      :class="nsTable.b('header')">
      <div :class="nsTable.be('header', 'custom-btn')">
        <div
          :class="nsTable.bem('header', 'custom-btn', 'inner')"
          @click="onClick_openDialog">
          <el-icon><Setting /></el-icon>
          <span>自定义列</span>
        </div>
      </div>
      <custom-column
        :key="visible"
        v-model:visible="visible"
        :columns="props.columns"
        :table-hash="tableHash"
        @checked-column-props="handle_checkedColumnprops" />
    </header>
    <!--  自定义列 -->
    <el-table
      ref="tableRef"
      :class="[nsTable.b('body'), nsTable.is('round', props.round)]"
      v-bind="{ ...$attrs, ...props }"
      :data="props.data"
      @row-click="handleRowClick">
      <template #empty>
        <sm-empty />
      </template>
      <table-column
        v-for="col in tableShowColumns"
        :key="col.prop"
        :column="col"
        :placeholder="placeholder"
        :empty-values="emptyValues">
        <template
          v-for="title in getColumnTitles(col)"
          #[title]="{ column, index }">
          <slot
            :name="title"
            :column="column"
            :index="index"></slot>
        </template>
        <template
          v-for="render in getColumnRenders(col)"
          #[render]="{ row, column, index }">
          <slot
            :name="render"
            :column="column"
            :row="row"
            :index="index"></slot>
        </template>
      </table-column>
    </el-table>
    <footer
      v-show="!props.hideOnSinglePage"
      :class="nsTable.b('footer')">
      <el-pagination
        ref="paginationRef"
        v-bind="mergePaginConfig"
        v-model:current-page="page"
        v-model:page-size="pageSize"
        :total="props.total"
        @change="handle_pageAndSizeChange" />
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { Setting } from '@element-plus/icons-vue';
import { tableProps, smTableContextKey, TableEmits } from './table';
import { DEFAULT_PAGINATION_CONFIG, PaginationConfig } from './pagination';
import { useNamespace } from '@strive-molu/hooks';
import { provide, ref, reactive, toRef, onBeforeMount, useAttrs, computed } from 'vue';
import CustomColumn from './custom-column/index.vue';
import { type Column } from './table-column';
import { getColumnTitles, getColumnRenders, getRowKey } from './utils';
import TableColumn from './table-column/index.vue';
import { SmEmpty } from '@strive-molu/components/empty';
import { FormContext, buttonGroupContextKey, formContextKey } from 'element-plus';
import elTableProps, { TableProps as ElTableProps } from 'element-plus/es/components/table/src/table/defaults';
import { useTable } from './use-table';

defineOptions({
  name: 'SmTable'
});

const props = defineProps({ ...elTableProps, ...tableProps });
const emits = defineEmits<TableEmits>();

const nsTable = useNamespace('table');

// 透传size给el-button
provide(
  buttonGroupContextKey,
  reactive({
    size: toRef(props, 'size')
  })
);

// 透传size给el-form相关组件
provide(
  formContextKey,
  reactive({
    size: toRef(props, 'size')
  }) as FormContext
);

const tableRef = ref<any>(null);
const paginationRef = ref(null);

const { tableShowColumns, tableHash, setLastColumnAutoWidth, isSingleSelect } = useTable(props);

//#region 处理单选行逻辑

const singleSelectKey = ref<number | string>('');
const singleRow = ref(null);

provide(
  smTableContextKey,
  reactive({
    rowKey: toRef(props, 'rowKey'),
    isSingleSelect,
    singleSelectKey
  })
);

/**
 * 处理行点击
 */
const handleRowClick = (row: any, column: Column, event: Event) => {
  if (isSingleSelect.value) {
    singleSelectKey.value = row[getRowKey(props.rowKey, row)];
    emits('current-change', row, singleRow.value);
    singleRow.value = row;
  }
  emits('rowClick', row, column, event);
};

//#endregion

// #region 自定义列相关代码逻辑

// 控制自定义选择展示列的弹框
const visible = ref<any>(false);
// 打开弹框
const onClick_openDialog = () => {
  visible.value = true;
};

/**
 * @desc 处理自定义列选择的列
 * @param columnProps
 */
const handle_checkedColumnprops = (columnProps: string[]) => {
  tableShowColumns.value = props.columns.filter((item) => columnProps.includes(item.prop));
  setLastColumnAutoWidth();
};

// #endregion 自定义列相关代码逻辑

// #region 处理表格分页相关逻辑
const page = defineModel<number>('page', {
  default: DEFAULT_PAGINATION_CONFIG.defaultCurrentPage
});
const pageSize = defineModel<number>('pageSize', {
  default: DEFAULT_PAGINATION_CONFIG.defaultPageSize
});

// 合并分页配置
const mergePaginConfig = ref<any>({});
onBeforeMount(() => {
  let mConfig = Object.assign(DEFAULT_PAGINATION_CONFIG, props.paginationConfig, {
    defaultCurrentPage: page.value,
    defaultPageSize: pageSize.value
  });
  let config: PaginationConfig = {
    ...mConfig,
    size: props.size,
    hideOnSinglePage: props.hideOnSinglePage
  };

  if (mConfig.layout?.length) {
    Reflect.set(config, 'layout', mConfig.layout.join(','));
  }
  // 如果传入的pageSize不在pageSizes内，就添加
  if (!mConfig.pageSizes?.includes(mConfig.defaultPageSize as number)) {
    Reflect.set(
      config,
      'pageSizes',
      mConfig.pageSizes?.concat(mConfig.defaultPageSize as number).sort((a: number, b: number) => a - b)
    );
  }
  mergePaginConfig.value = config;
});

/**
 * @desc 处理分页器currentPage或pageSize改变
 * @param page
 * @param size
 */
const handle_pageAndSizeChange = (page: number, size: number) => {
  emits('pageAndSizeChange', page, size, resetFlag.value);
  resetFlag.value = false;
};

// 重置标志
const resetFlag = ref(false);

// 重置分页配置信息
const resetPageAndSize = () => {
  let { defaultCurrentPage, defaultPageSize } = mergePaginConfig.value;
  if (defaultCurrentPage != page.value || defaultPageSize != pageSize.value) {
    page.value = defaultCurrentPage;
    pageSize.value = defaultPageSize;
    resetFlag.value = true;
    console.log('==手动更改==', defaultCurrentPage, defaultPageSize);
  }

  emits('pageAndSizeChange', defaultCurrentPage, defaultPageSize, resetFlag.value);
};

// 清空多选框
const clearSelection = (...args: any[]) => {
  if (isSingleSelect.value) {
    singleRow.value = null;
    singleSelectKey.value = '';
  } else {
    tableRef.value?.clearSelection(...args);
  }
};
// 获取单选或多选的行
const getSelectionRows = () => {
  // 单选
  if (isSingleSelect.value) {
    return singleRow.value ? [singleRow.value] : [];
  }
  return tableRef.value?.getSelectionRows();
};
// 选择或取消选择多选行
const toggleRowSelection = (row: any, selected: boolean) => {
  tableRef.value?.toggleRowSelection(row, selected);
};
// 用于多选表格，切换全选或全不选
const toggleAllSelection = () => {
  tableRef.value?.toggleAllSelection();
};

// 设置单选行
const setSingleSelectRow = (row: any) => {
  singleRow.value = row || null;
  singleSelectKey.value = row ? row[getRowKey(props.rowKey, row)] : '';
};

defineExpose({
  resetPageAndSize,
  clearSelection,
  getSelectionRows,
  toggleRowSelection,
  toggleAllSelection,
  setSingleSelectRow
});

// #endregion
</script>
