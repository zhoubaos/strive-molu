<template>
  <sm-multiple-input
    ref="smMInputRef"
    title="多行输入"
    :disabled="false"
    :extend-quick-actions="extendActions"></sm-multiple-input>

  <div style="margin-top: 20px">
    <el-button
      type="primary"
      @click="onClick_setDefaultValue"
      >设置默认值</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { QuickBtnConfig, SmMultipleInput } from 'strive-molu';
import '@strive-molu/components/multiple-input/style/index';
import { ref } from 'vue';

const smMInputRef = ref(null);

const extendActions: QuickBtnConfig[] = [
  {
    name: '过滤字数小于2的行',
    handleCallback: (inputList) => {
      return inputList.filter((item) => item.value.length > 2);
    }
  }
];

const onClick_setDefaultValue = () => {
  smMInputRef.value.setDefaultInputTexts(['zzz', 'xxx', 'ccc']);
};
</script>

<style scoped></style>
