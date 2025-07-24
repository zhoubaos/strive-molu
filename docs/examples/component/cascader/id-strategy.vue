<template>
  <sm-cascader
    v-model:ids="vModelIds"
    :tree="tree"
    :node-props="nodeProps"
    @change="handleChange"></sm-cascader>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { tree } from './tree';
import { NodeProps } from 'strive-molu';

const vModelIds = ref([]);
const nodeProps = reactive<NodeProps>({
  checkStrategy: 'parent'
});
const handleChange = (ids: any[]) => {
  console.log('==选择的节点==', ids);
};
</script>

<style scoped></style>
