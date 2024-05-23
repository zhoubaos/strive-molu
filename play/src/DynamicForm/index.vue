<template>
  <el-form :model="formData" v-bind="$attrs">
    <template v-for="(item, index) in formItems" :key="index">
      <form-item-comp-render
        :form-state="item"
        :form="formData"
        v-model="formData[item.payload.prop]"></form-item-comp-render>
    </template>
  </el-form>
</template>

<script setup lang="ts">
import FormItemComp from './FormItemComp.vue';
import FormItemCompRender from './FormItemCompRender.vue';
import { type FormItem } from './index';

const props = withDefaults(
  defineProps<{
    /**
     * el-form model配置对象
     */
    formData: Record<string, any>;
    /**
     * 表单项的配置信息
     */
    formItems: Array<FormItem>;
  }>(),
  {}
);
</script>

<style scoped lang="less"></style>
