<template>
  <sm-multiple-input
    ref="smMInputRef"
    title="多行输入"
    :disabled="false"
    :extend-quick-actions="extendActions"></sm-multiple-input>
</template>

<script setup lang="ts">
import { QuickBtnConfig } from 'strive-molu';

const extendActions: QuickBtnConfig[] = [
  {
    name: '过滤字数小于2的行',
    handleCallback: (inputList) => {
      return inputList.filter((item) => item.value.length >= 2);
    }
  }
];
</script>

<style scoped></style>
