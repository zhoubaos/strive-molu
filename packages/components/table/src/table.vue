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
      v-bind="$attrs"
      :data="props.data"
      :style="{
        height: isNumber(props.height) ? `${props.height}px` : props.height
      }">
      <template #empty>
        <div :class="nsTable.e('empty')">
          <img
            src="@strive-molu/assets/src/images/404.png"
            alt="" />
          <p :class="nsTable.em('empty', 'text')">暂无数据~</p>
        </div>
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
        @change="handle_pageAndSizeChange" />
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { Setting } from '@element-plus/icons-vue';
import { tableProps, tableEmits } from './table';
import { DEFAULT_PAGINATION_CONFIG, PaginationConfig } from './pagination';
import { useNamespace } from '@strive-molu/hooks';
import { provide, ref, reactive, toRef, onBeforeMount } from 'vue';
import CustomColumn from './custom-column/index.vue';
import { type Column } from './table-column';
import { getColumnTitles, getColumnRenders, getLocalColumnProps, setLocalColumnProps, genTableHash } from './utils';
import TableColumn from './table-column/index.vue';
import { FormContext, buttonGroupContextKey, formContextKey } from 'element-plus';
import { isNumber } from '@strive-molu/utils';

defineOptions({
  name: 'SmTable'
});

const props = defineProps(tableProps);
const emits = defineEmits(tableEmits);

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

// #region 自定义列相关代码逻辑

// 控制自定义选择展示列的弹框
const visible = ref<any>(false);
// 打开弹框
const onClick_openDialog = () => {
  visible.value = true;
};

const tableRef = ref<any>(null);
const paginationRef = ref(null);

// 表格展示的列
const tableShowColumns = ref<Array<Column>>([]);
onBeforeMount(() => {
  if (props.canCustomColumn) {
    handleCustomColumns();
  } else {
    tableShowColumns.value = props.columns;
  }
  setLastColumnAutoWidth();
});

// 表格hash值
const tableHash = ref('');

// 处理需要有自定义列功能的逻辑
const handleCustomColumns = () => {
  const allColumnKeys = props.columns.map((item) => item.prop);
  // 生成表格的hash值
  tableHash.value = genTableHash(allColumnKeys);

  const localProps = getLocalColumnProps(tableHash.value);

  if (!localProps.length) {
    tableShowColumns.value = props.columns;
    const columnprops = tableShowColumns.value.map((item) => item.prop);
    setLocalColumnProps(tableHash.value, columnprops);
  } else {
    tableShowColumns.value = props.columns.filter((item) => localProps.includes(item.prop));
  }
};

/**
 * @desc 处理自定义列选择的列
 * @param columnProps
 */
const handle_checkedColumnprops = (columnProps: string[]) => {
  tableShowColumns.value = props.columns.filter((item) => columnProps.includes(item.prop));
  setLastColumnAutoWidth();
};

// 设置展示列最后一行的宽度为自适应，防止表格未撑满
const setLastColumnAutoWidth = () => {
  let len = tableShowColumns.value.length;
  if (len == 1 && Reflect.has(tableShowColumns.value[len - 1], 'width')) {
    tableShowColumns.value[len - 1] = {
      ...tableShowColumns.value[len - 1]
    };
    Reflect.deleteProperty(tableShowColumns.value[len - 1], 'width');
  }
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
    total: props.total,
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
  console.log('==组件更改==', page, size);

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

const clearSelection = (...args: any[]) => {
  tableRef.value?.clearSelection(...args);
};
const getSelectionRows = (...args: any[]) => {
  return tableRef.value?.getSelectionRows(...args);
};

defineExpose({
  resetPageAndSize,
  clearSelection,
  getSelectionRows
});

// #endregion
</script>
