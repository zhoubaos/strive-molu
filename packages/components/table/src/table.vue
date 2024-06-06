<template>
  <div class="sm-table">
    <!-- 自定义列 -->
    <div v-if="canCustomColumn" class="sm-table-container">
      <div class="sm-table-btn-container">
        <div class="custom-btn" @click="onClick_openDialog">
          <el-icon><Setting /></el-icon>
          <span>自定义列</span>
        </div>
      </div>
      <custom-column
        :key="visible"
        v-model:visible="visible"
        :columns="columns"
        :table-hash="tableHash"
        @checked-column-props="handle_checkedColumnprops" />
    </div>
    <!--  自定义列 -->
    <el-table
      ref="tableRef"
      v-bind="$attrs"
      :data="data"
      header-cell-class-name="custom-table-header"
      cell-class-name="custom-table-body-cell">
      <template #empty>
        <div class="sm-table-empty">
          <img src="@strive-molu/assets/src/images/404.png" alt="" />
          <p class="empty-text">暂无数据~</p>
        </div>
      </template>
      <table-column
        v-for="col in tableShowColumns"
        :key="col.prop"
        :column="col"
        :placeholder="placeholder"
        :empty-values="emptyValues">
        <template v-for="title in getColumnTitles(col)" #[title]="{ column, index }">
          <slot :name="title" :column="column" :index="index"></slot>
        </template>
        <template v-for="render in getColumnRenders(col)" #[render]="{ row, column, index }">
          <slot :name="render" :column="column" :row="row" :index="index"></slot>
        </template>
      </table-column>
    </el-table>
    <footer v-show="isPaginationCompShow || true" class="sm-table-footer">
      <el-pagination
        v-bind="mergePaginConfig"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        @change="handle_pageAndSizeChange" />
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { Setting } from '@element-plus/icons-vue';
import { tableProps, tableEmits, DEFAULT_PAGINATION_CONFIG } from './table';
import { ref, onBeforeMount, computed } from 'vue';
import CustomColumn from './custom-column/index.vue';
import { type Column } from './table-column';
import { getColumnTitles, getColumnRenders, getLocalColumnProps, setLocalColumnProps, genTableHash } from './utils';
import TableColumn from './table-column/index.vue';

defineOptions({
  name: 'SmTable'
});

const props = defineProps(tableProps);
const emits = defineEmits(tableEmits);

// #region 自定义列相关代码逻辑

// 控制自定义选择展示列的弹框
const visible = ref<any>(false);
// 打开弹框
const onClick_openDialog = () => {
  visible.value = true;
};

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
const currentPage = ref(DEFAULT_PAGINATION_CONFIG.defaultCurrentPage);
const pageSize = ref(DEFAULT_PAGINATION_CONFIG.defaultPageSize);

// 合并分页配置
const mergePaginConfig = ref<any>({});
onBeforeMount(() => {
  let mConfig = Object.assign(DEFAULT_PAGINATION_CONFIG, props.paginationConfig);
  let config: any = {
    ...mConfig
  };

  if (mConfig.layout?.length) {
    config.layout = mConfig.layout.join(',');
  }
  // 如果传入的pageSize不在pageSizes内，就添加
  if (!mConfig.pageSizes?.includes(mConfig.defaultPageSize as number)) {
    config.pageSizes = mConfig.pageSizes
      ?.concat(mConfig.defaultPageSize as number)
      .sort((a: number, b: number) => a - b);
  }
  mergePaginConfig.value = config;

  currentPage.value = config.defaultCurrentPage;
  pageSize.value = config.defaultPageSize;
});

// 是否显示分页组件
const isPaginationCompShow = computed(() => props.total / (pageSize.value as number) > 1);

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
  if (defaultCurrentPage != currentPage.value || defaultPageSize != pageSize.value) {
    currentPage.value = defaultCurrentPage;
    pageSize.value = defaultPageSize;
    resetFlag.value = true;

    console.log('==手动更改==', defaultCurrentPage, defaultPageSize);
  }
};

defineExpose({
  resetPageAndSize
});
// #endregion
</script>
