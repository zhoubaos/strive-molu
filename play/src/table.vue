<template>
  <div class="wp">
    <SmTable
      ref="smTableRef"
      :data="tableData"
      :columns="columns"
      :total="total"
      is-custom-column
      row-key="id"
      :pagination-config="{
        defaultCurrentPage: pageSize.page,
        defaultPageSize: pageSize.size
      }"
      @page-and-size-change="handle_pagesizeChane">
      <template #name="{ row }">{{ row.name }}</template>
      <template #oprate="{ row }">
        <el-button @click="onClick_view(row)">详情</el-button>
      </template>
    </SmTable>
    <div>
      <el-button @click="ond">按钮</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SmTable, type Column } from '@strive-molu/components';
// @ts-ignore
import '@strive-molu/components/table/style/index';
import { reactive, ref } from 'vue';

const smTableRef = ref();
const ond = () => {
  smTableRef.value!.resetPageAndSize();
};

const onClick_view = (row) => {
  console.log(row);
};

const pageSize = reactive({
  page: 1,
  size: 5
});
const columns: Column[] = [
  {
    prop: 'name',
    label: '名字',
    slots: { customRender: 'name' }
  },
  {
    prop: 'age1',
    label: '年龄',
    children: [
      {
        prop: 'age',
        label: '年龄1'
      }
    ]
  },
  {
    prop: 'address',
    label: '地址'
  },
  {
    prop: 'oprate',
    label: '操作',
    slots: { customRender: 'oprate' }
  }
];
const data = reactive([
  {
    id: 1,
    name: '',
    age: 23,
    address: '重庆市云游戏地方',
    children: [
      {
        id: 2,
        name: '大概的',
        age: null,
        address: '南京地方空当接龙'
      },
      {
        id: 3,
        name: '菜单',
        age: 138,
        address: '对的撒'
      }
    ]
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
const tableData = ref([]);
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
</script>

<style scoped lang="less">
.dd {
  height: 100px;
}
</style>
