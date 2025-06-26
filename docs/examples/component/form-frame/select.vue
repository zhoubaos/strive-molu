<template>
  <div class="flex gap-8">
    <sm-form-frame
      v-model="modelValue"
      label-type="select"
      :label-width="70"
      :label-option="labelOption"
      @change="handleLabelChange">
      <el-input
        v-model="modelValue2"
        placeholder="请输入"></el-input>
    </sm-form-frame>
    <sm-form-frame
      v-model="modelValue"
      label-type="select"
      :label-width="70"
      :label-option="labelOption"
      disabled>
      <el-input
        v-model="modelValue2"
        placeholder="请输入"></el-input>
    </sm-form-frame>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const modelValue = ref<string>('1');
const labelOption = ref([
  { label: '名称', value: '1' },
  { label: 'ID', value: '2' }
]);

const modelValue2 = ref<string>('');
const handleLabelChange = (value: string) => {
  console.log('Label changed to:', value);
};
</script>

<style scoped></style>
