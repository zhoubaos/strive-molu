<template>
  <div class="sm-table">
    <!-- 自定义列 -->
    <div v-if="isCustomColumn" class="custom-container">
      <div class="custom-column-wp">
        <div class="custom-btn" @click="onClick_openDialog">
          <kj-svg-icon icon-name="setting" />
          <span>自定义列</span>
        </div>
        <el-popover
          placement="top"
          :width="200"
          trigger="hover"
          content="可以通过此功能，选择自己想要在列表上展示的信息列">
          <template #reference>
            <kj-svg-icon icon-name="question-circle" :size="14" />
          </template>
        </el-popover>
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
      :data="tableDataNoEmpty"
      header-cell-class-name="custom-table-header"
      cell-class-name="custom-table-body-cell">
      <template #empty> 空 </template>
      <table-column v-for="col in tableShowColumns" :key="col.prop" :col="col">
        <template v-for="title in getColumnTitles(col)" #[title]="{ column, index }">
          <slot :name="title" :column="column" :index="index"></slot>
        </template>
        <template v-for="render in getColumnRenders(col)" #[render]="{ row, column, index }">
          <slot :name="render" :column="column" :row="sourceTableData[index]" :index="index"> </slot>
        </template>
      </table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { tableProps } from './table';
import { ref, reactive, onBeforeMount, computed, watch, watchEffect } from 'vue';
import CustomColumn from './custom-column/index.vue';
import { type Column } from './table-column';
import {
  getColumnTitles,
  getColumnRenders,
  getLocalColumnProps,
  setLocalColumnProps,
  genTableHash,
  replaceTreeEmptyToPlaceholder
} from './utils';
import { deepClone } from '@strive-molu/utils';
import TableColumn from './table-column/index.vue';

defineOptions({
  name: 'SmTable'
});

const props = defineProps(tableProps);

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
  if (props.isCustomColumn) {
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
  // 生成表格的hash值
  tableHash.value = genTableHash(props.columns.map((item) => item.prop));

  const saveProps = getLocalColumnProps(tableHash.value);
  if (!saveProps.length) {
    tableShowColumns.value = props.columns;
    const columnprops = tableShowColumns.value.map((item) => item.prop);
    setLocalColumnProps(tableHash.value, columnprops);
  }
};
// 设置展示列最后一行的宽度为自适应，防止表格未撑满
const setLastColumnAutoWidth = () => {
  let len = tableShowColumns.value.length;
  if (len > 0) {
    Reflect.has(tableShowColumns.value[len - 1], 'width') &&
      Reflect.deleteProperty(tableShowColumns.value[len - 1], 'width');
  }
};

/**
 * @desc 处理自定义列选择的列
 * @param columnProps
 */
const handle_checkedColumnprops = (columnProps: string[]) => {
  tableShowColumns.value = props.columns.filter((item) => columnProps.includes(item.prop));
};

// #endregion 自定义列相关代码逻辑

// #region 处理单元格数据站位符情况

// 表格源数据
const sourceTableData = ref<any[]>([]);
const tableDataNoEmpty = ref<any[]>([]);
// 更新表格数据
const updateTableData = () => {
  sourceTableData.value = deepClone(props.data);
  tableDataNoEmpty.value = replaceTreeEmptyToPlaceholder(props.data, props.emptyValues, props.placeholder);
};
watchEffect(() => {
  if (props.data.length) {
    updateTableData();
  }
});

// #endregion

// init here
</script>
<!-- 禁止在vue文件内写style标签 -->
