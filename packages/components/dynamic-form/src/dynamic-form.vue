<template>
  <el-form :model="formData" v-bind="$attrs">
    <template v-for="(item, index) in formItems" :key="index">
      <form-item-render :form-state="item" :form="formData" v-model="formData[item.payload.prop]"></form-item-render>
    </template>
    <!-- 按钮操作 -->
    <el-form-item>
      <slot />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { type DynamicFormProps, defaultDynamicFormProps } from './dynamic-form';
import FormItemRender from './form-item-render.vue';

defineOptions({
  name: 'SmDynamicForm'
});

const props = withDefaults(defineProps<DynamicFormProps>(), defaultDynamicFormProps);

// init here
</script>
<!-- 禁止在vue文件内添加style标签 -->
