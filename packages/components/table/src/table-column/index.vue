<template>
  <el-table-column v-bind="excludeColumnAttrs">
    <template v-if="customTitle" #header="{ column, $index }">
      <slot :name="customTitle" :column="column" :index="$index"></slot>
    </template>
    <template v-if="customRender" #default="{ row, column, $index }">
      <slot :name="customRender" :text="row[column.prop]" :column="column" :row="row" :index="$index"> </slot>
    </template>
    <template v-if="columnChildren.length">
      <table-column v-for="item in columnChildren" :key="item.prop" :column="item">
        <template v-for="title in getColumnTitles(item)" #[title]="{ column, index }">
          <slot :name="title" :column="column" :index="index"></slot>
        </template>
        <template v-for="render in getColumnRenders(item)" #[render]="{ row, column, index }">
          <slot :name="render" :column="column" :row="row" :index="index"> </slot>
        </template>
      </table-column>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { tableColumnProps } from './index';
import { getColumnTitles, getColumnRenders } from './utils';
defineOptions({
  name: 'TableColumn'
});

const props = defineProps(tableColumnProps);
// 自定义表头
const customTitle = props.column?.slots?.title;
// 自定义列
const customRender = props.column?.slots?.customRender;

const columnChildren = props.column?.children || [];
// 每列的attr属性
const excludeColumnAttrs = computed(() => {
  let res: Record<string, any> = {};
  for (const resKey in props.column) {
    if (!['children', 'isRequired', 'slots'].includes(resKey)) {
      res[resKey] = props.column[resKey];
    }
  }
  return res;
});
</script>
