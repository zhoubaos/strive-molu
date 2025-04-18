<template>
  <div v-if="formState">
    <el-form-item
      v-bind="formState.payload.elFormItemAttrs"
      :label="formState.payload.label"
      :prop="formState.payload.prop">
      <component :is="render" />
    </el-form-item>
    <!-- Next Item -->
    <form-item-render
      v-model="form[nextItem?.payload.prop]"
      :form-state="nextItem"
      :form="form"></form-item-render>
  </div>
</template>

<script setup lang="ts">
import { ElInput, ElInputNumber } from 'element-plus';
import { computed, type VNode, h, type Component } from 'vue';
import FormItemRender from './form-item-render.vue';
import type { FormItem, FormItemType } from './form-item';
import { formItemRenderProps, formItemRenderEmits } from './form-item-render';

const props = defineProps(formItemRenderProps);

const emits = defineEmits(formItemRenderEmits);

/**
 * @desc 获取表单的下一项
 */
const nextItem = computed(() => {
  let current = props.formState;
  if (!current) return null;

  const acients: FormItem[] = [];
  while ((current = current.parent)) {
    acients.unshift(current);
  }
  return props.formState!.next(
    props.formState?.payload.val,
    props.formState as FormItem,
    acients
  );
});
/**
 * @desc Element组件render函数
 */
const render = () => {
  // ... 扩展其他ElementPlus组件类型
  const elRenderStrategy: Record<FormItemType, VNode> = {
    input: createElFormItem(ElInput),
    inputNumber: createElFormItem(ElInputNumber)
  };
  return elRenderStrategy[props.formState!.type];
};
/**
 * 生成elementPlus组件虚拟DOM对象
 * @param comp elementPlus 组件对象
 */
const createElFormItem = (comp: Component) => {
  return h(comp, {
    modelValue: props.modelValue,
    'onUpdate:modelValue': (val: string) => {
      props.formState!.payload.val = val;
      emits('update:modelValue', val);
    },
    ...(props.formState!.payload?.elCompAttrs || {})
  });
};
</script>
<!-- 禁止在vue文件内添加style标签 -->
