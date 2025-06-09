<template>
  <div></div>
</template>

<script setup lang="ts">
import { TreeTools } from '@strive-molu/utils';

let tree = [
  {
    id: 1,
    name: '1',
    children: [
      {
        id: 11,
        name: '11',
        children: [
          {
            id: 111,
            name: '111',
            children: [
              {
                id: 1111,
                name: '1111'
              }
            ]
          },
          {
            id: 112,
            name: '112'
          }
        ]
      },
      {
        id: 12,
        name: '12'
      }
    ]
  }
];

let treeTools = new TreeTools(tree);
// 遍历tree
treeTools.map((item) => {
  console.log('==map遍历==', item);
});

// 添加自定义属性
treeTools.addCustomAttr('selected', false);
console.log(treeTools);
console.log(treeTools.getAllIds());
console.log(treeTools.getAllLeafIds());
</script>

<style scoped></style>
