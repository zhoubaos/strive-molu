<template>
  <sm-table
    :data="data"
    hide-on-single-page
    :columns="tableColumns"
    row-key="id"
    @current-change="handleCurrentChange">
  </sm-table>
</template>

<script setup lang="ts">
import { type Column } from 'strive-molu';

const data = new Array(5).fill(0).map((_, index) => {
  return {
    id: index,
    date: '2016-05-03',
    name: 'Tom' + index,
    address: 'No. 189, Grove St, Los Angeles'
  };
});
const tableColumns: Column[] = [
  {
    width: 50,
    prop: 'id',
    type: 'single-select'
  },
  {
    prop: 'date',
    label: '日期'
  },
  {
    prop: 'name',
    label: '名称'
  },
  {
    prop: 'address',
    label: '地址',
    width: 300
  }
];

const handleCurrentChange = (row: any, oldRow: any) => {
  console.log(row);
};
</script>
<style></style>
