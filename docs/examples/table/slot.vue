<template>
  <sm-table :data="tableData" :columns="tableColumns" :total="tableData.length">
    <template #dateTitle>
      <span>自定义日期</span>
    </template>
    <template #name="{ row }"> 自定义{{ row.name }} </template>
  </sm-table>
</template>

<script lang="ts" setup>
import { SmTable, type Column } from 'strive-molu';

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
];

const tableColumns: Column[] = [
  {
    prop: 'date',
    label: '日期',
    slots: { title: 'dateTitle' }
  },
  {
    prop: 'name',
    label: '名称',
    slots: { customRender: 'name' }
  },
  {
    prop: 'address',
    label: '地址',
    width: 300
  }
];
</script>
