<template>
  <el-form ref="elFormRef" :model="formData" v-bind="$attrs">
    <template v-for="(item, index) in formItems" :key="index">
      <form-item-render v-model="formData[item.payload.prop]" :form-state="item" :form="formData"></form-item-render>
    </template>
    <!-- 按钮操作 -->
    <el-form-item>
      <slot />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { type DynamicFormProps, defaultDynamicFormProps } from './dynamic-form';
import FormItemRender from './form-item-render.vue';
import type { FormValidateCallback, FormItemProp } from 'element-plus';
import { type Arrayable } from '@strive-molu/utils';

defineOptions({
  name: 'SmDynamicForm'
});

const props = withDefaults(defineProps<DynamicFormProps>(), defaultDynamicFormProps);

const elFormRef = ref();

// #region 导出 el-form exposes方法
const validate = (callback?: FormValidateCallback) => {
  return elFormRef.value?.validate(callback);
};

const validateField = (props?: Arrayable<FormItemProp> | undefined, callback?: FormValidateCallback) => {
  return elFormRef.value?.validateField(props, callback);
};

const resetFields = (props?: Arrayable<FormItemProp> | undefined) => {
  elFormRef.value?.resetFields(props);
};

const scrollToField = (prop: FormItemProp) => {
  elFormRef.value?.scrollToField(prop);
};

const clearValidate = (props?: Arrayable<FormItemProp> | undefined) => {
  elFormRef.value?.clearValidate(props);
};

defineExpose({
  validate,
  validateField,
  resetFields,
  scrollToField,
  clearValidate
});

// #endregion

// init here
</script>
<!-- 禁止在vue文件内添加style标签 -->
