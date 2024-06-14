<template>
  <el-button
    class="btn"
    @click="onClick_reset"
    >重置分页</el-button
  >
  <sm-table
    ref="smTableRef"
    :data="tableData"
    :columns="tableColumns"
    :total="total"
    :pagination-config="paginaConfig"
    @page-and-size-change="handle_pagesizeChane"></sm-table>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { SmTable, type Column } from 'strive-molu';
const smTableRef = ref();
const onClick_reset = () => {
  smTableRef.value?.resetPageAndSize();
};

const data = reactive([
  {
    id: 1,
    name: '',
    age: 23,
    address: '重庆市云游戏地方'
  },
  {
    id: 4,
    name: '打广告',
    age: 15,
    address: '大法师'
  },
  {
    id: 5,
    name: '上档次',
    age: 18,
    address: '等等的点点滴滴'
  },
  {
    id: 6,
    name: '地方',
    age: 34,
    address: '水电费水电费'
  },
  {
    id: 7,
    name: '打得过',
    age: 153,
    address: '温文峰'
  },
  {
    id: 8,
    name: '水电费',
    age: 143,
    address: '胜多负少'
  },
  {
    id: 9,
    name: '收到',
    age: 133,
    address: '出去胜多负少'
  },
  {
    id: 10,
    name: '胜多负少',
    age: 1453,
    address: '江苏地第三方'
  },
  {
    id: 11,
    name: '胜sd多负少',
    age: 153,
    address: '北京收到了'
  },
  {
    id: 10,
    name: '胜多负少',
    age: 1453,
    address: '江苏地第三方'
  },
  {
    id: 11,
    name: '胜sd多负少',
    age: 153,
    address: '北京收到了'
  }
]);
const pageSize = reactive({
  page: 1,
  size: 5
});

const paginaConfig = reactive({
  defaultCurrentPage: pageSize.page,
  defaultPageSize: pageSize.size
});
const tableData = ref<any>([]);
const total = ref(data.length);

const checkData = () => {
  let s = (pageSize.page - 1) * pageSize.size;
  tableData.value = data.slice(s, s + pageSize.size);
};
checkData();

const handle_pagesizeChane = (page, size, isReset) => {
  console.log(page, size, isReset);

  pageSize.page = page;
  pageSize.size = size;
  checkData();
};

const tableColumns: Column[] = [
  {
    prop: 'name',
    label: '名字'
  },
  {
    prop: 'age',
    label: '年龄'
  },
  {
    prop: 'address',
    label: '地址'
  }
];
</script>
<style scoped lang="less">
.btn {
  margin-bottom: 16px;
}
</style>
