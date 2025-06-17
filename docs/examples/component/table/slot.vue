<template>
  <sm-table
    ref="smTableRef"
    v-model:page="pageSize.page"
    v-model:page-size="pageSize.size"
    :data="tableData"
    :columns="tableColumns"
    :total="tableTotal"
    @page-and-size-change="handle_pagesizeChane">
    <template #dateTitle>自定义日期title</template>
    <template #action="{ row }">
      <el-button
        link
        type="primary"
        @click="onClick_view(row)"
        >操作</el-button
      >
    </template>
  </sm-table>
</template>

<script setup lang="ts">
import { type Column } from 'strive-molu';
import { onBeforeMount, reactive, ref } from 'vue';

const smTableRef = ref();
const pageSize = reactive({
  page: 1,
  size: 5
});

const data = new Array(5).fill(0).map((_, index) => {
  return {
    date: '2016-05-03',
    name: 'Tom' + index,
    address: index === 2 ? '' : 'No. 189, Grove St, Los Angeles'
  };
});

const tableData = ref<any[]>([]);

const tableTotal = ref(5);

const tableColumns: Column[] = [
  {
    prop: 'date',
    slots: { title: 'dateTitle' }
  },
  {
    prop: 'name',
    label: '名称'
  },
  {
    prop: 'address',
    label: '地址',
    width: 300
  },
  {
    prop: 'action',
    label: '操作',
    slots: { customRender: 'action' }
  }
];

const handle_pagesizeChane = (page, size, isReset) => {
  console.log(page, size, isReset);
  getTableData();
};

const getTableData = () => {
  tableData.value = data.slice(pageSize.page - 1, pageSize.page - 1 + pageSize.size);
};
onBeforeMount(() => {
  getTableData();
});

/**
 * 操作
 */
const onClick_view = (row) => {
  console.log(row);
};
</script>
<style></style>
