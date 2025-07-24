<template>
  <div class="flex gap-8">
    <sm-form-frame label="测试">
      <el-input
        v-model="modelValue"
        placeholder="请输入"></el-input>
    </sm-form-frame>
    <sm-form-frame
      label="测试"
      :width="200">
      <el-select
        v-model="modelValue2"
        placeholder="请选择">
        <el-option
          label="选项1"
          value="1"></el-option>
        <el-option
          label="选项2"
          value="2"></el-option>
        <el-option
          label="选项3"
          value="3"></el-option>
      </el-select>
    </sm-form-frame>
    <sm-form-frame
      label="测试"
      :width="200">
      <el-date-picker
        v-model="modelValue3"
        type="date"
        placeholder="选择日期"></el-date-picker>
    </sm-form-frame>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const modelValue = ref<string>('');

const modelValue2 = ref<string>('');

const modelValue3 = ref<string>('');
const labelOption = ref([
  { label: '名称', value: '1' },
  { label: 'ID', value: '2' }
]);
</script>

<style scoped></style>
