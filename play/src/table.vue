<template>
  <div class="wp">
    <SmTable
      ref="smTableRef"
      :data="tableData"
      :columns="columns"
      :total="total"
      :pagination-config="{
        defaultCurrentPage: pageSize.page,
        defaultPageSize: pageSize.size
      }"
      @page-and-size-change="handle_pagesizeChane"></SmTable>
    <div>
      <el-button @click="ond">按钮</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SmTable } from '@strive-molu/components';
import '@strive-molu/components/table/style/index';
import { reactive, ref } from 'vue';

const smTableRef = ref();
const ond = () => {
  smTableRef.value!.resetPageAndSize();
};

const pageSize = reactive({
  page: 1,
  size: 5
});
const data = reactive([
  {
    name: '十多个',
    age: 23,
    address: '重庆市云游戏地方'
  },
  {
    name: '大概的',
    age: 18,
    address: '南京地方空当接龙'
  },
  {
    name: '菜单',
    age: 138,
    address: '南京地方空当接龙'
  },
  {
    name: '打广告',
    age: 15,
    address: '南京地方空当接龙'
  },
  {
    name: '上档次',
    age: 18,
    address: '南京地方空当接龙'
  },
  {
    name: '地方',
    age: 34,
    address: '南京地方空当接龙'
  },
  {
    name: '打得过',
    age: 153,
    address: '南京地方空当接龙'
  },
  {
    name: '水电费',
    age: 143,
    address: '南京地方空当接龙'
  },
  {
    name: '收到',
    age: 133,
    address: '南京地方空当接龙'
  },
  {
    name: '胜多负少',
    age: 1453,
    address: '南京地方空当接龙'
  },
  {
    name: '胜sd多负少',
    age: 153,
    address: '南京地方空当接龙'
  }
]);
const tableData = ref([]);
const total = ref(data.length);
const columns = [
  {
    prop: 'name',
    label: '名字',
    width: 200,
    isRequired: true
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
</script>

<style scoped lang="less">
.dd {
  height: 100px;
}
</style>
