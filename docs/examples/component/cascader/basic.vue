<template>
  <sm-cascader
    v-model:ids="vModelIds"
    :node-props="{
      titles: ['省', '市', '区', '街道']
    }"
    :tree="tree"></sm-cascader>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { tree } from './tree';

const vModelIds = ref([]);
</script>

<style scoped></style>
