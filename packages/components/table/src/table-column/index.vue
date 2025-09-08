<template>
  <el-table-column v-bind="excludeColumnAttrs">
    <template
      v-if="customTitle"
      #header="{ column, $index }">
      <slot
        :name="customTitle"
        :column="column"
        :index="$index"></slot>
    </template>
    <template
      v-if="customRender || smTableContext?.isSingleSelect"
      #default="{ row, column, $index }">
      <!-- 单选 -->
      <el-radio
        v-if="props.column?.type == 'single-select'"
        :model-value="row[getRowKey(smTableContext?.rowKey, row)] === smTableContext?.singleSelectKey"
        :value="true"></el-radio>
      <slot
        v-else-if="customRender"
        :name="customRender"
        :text="row[column.prop]"
        :column="column"
        :row="row"
        :index="$index"></slot>
    </template>
    <template v-if="columnChildren.length">
      <table-column
        v-for="item in columnChildren"
        :key="item.prop"
        :column="item"
        :placeholder="placeholder"
        :empty-values="emptyValues">
        <template
          v-for="title in getColumnTitles(item)"
          #[title]="{ column, index }">
          <slot
            :name="title"
            :column="column"
            :index="index"></slot>
        </template>
        <template
          v-for="render in getColumnRenders(item)"
          #[render]="{ row, column, index }">
          <slot
            :name="render"
            :column="column"
            :row="row"
            :index="index"></slot>
        </template>
      </table-column>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { tableColumnProps, TableColumnSlots } from './index';
import { getColumnTitles, getColumnRenders, getRowKey } from '../utils';
import TableColumn from './index.vue';
import { smTableContextKey } from '../table';

defineOptions({
  name: 'SmTableColumn'
});
const props = defineProps(tableColumnProps);
defineSlots<TableColumnSlots>();

const smTableContext = inject(smTableContextKey, undefined);

// 自定义表头
const customTitle = props.column?.slots?.title;
// 自定义列
const customRender = props.column?.slots?.customRender;

const columnChildren = props.column?.children || [];
// 表格每列的attr属性
const excludeColumnAttrs = computed(() => {
  let res: Record<string, any> = {};
  for (const resKey in props.column) {
    if (!['children', 'isRequired', 'slots'].includes(resKey)) {
      res[resKey] = (props.column as Record<string, any>)[resKey];
    }
    // 给每列数据的空白数据添加占位符
    res['formatter'] = (row: any, column: any, cellValue: any, index: number) => {
      return props.emptyValues.includes(cellValue) ? props.placeholder : cellValue;
    };
  }

  return res;
});
</script>
