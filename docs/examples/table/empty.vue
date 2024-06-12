<template>
  <sm-table
    :data="tableData"
    :columns="tableColumns"
    :total="tableData.length"
    placeholder="空"
    :empty-values="['', undefined]"></sm-table>
</template>

<script setup lang="ts">
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
    address: null
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: undefined
  },
  {
    date: '2016-05-01',
    name: 'DD',
    address: ''
  }
];

const tableColumns: Column[] = [
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
</script>
