<template>
  <template v-if="formState">
    <el-form-item :label="formState.payload.label" :rules="formState.payload.rules" :prop="formState.payload.prop">
      <component :is="render" />
    </el-form-item>
    <!-- Next Item -->
    <form-item-comp-two :form-state="nextItem" :form="form" v-model="form[nextItem?.payload.prop]"></form-item-comp-two>
  </template>
</template>

<script setup lang="ts">
import { ElInput, ElInputNumber } from 'element-plus';
import { computed, type VNode, h, type Component } from 'vue';
import { type FormItem, type FormItemType } from './index';
const props = withDefaults(
  defineProps<{
    formState: FormItem | null;
    /**
     * @desc 表单所有属性
     */
    form: Record<string, any>;
    /**
     * @desc: 表单值
     */
    modelValue: any;
  }>(),
  {}
);

const emits = defineEmits(['update:modelValue']);

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
  return props.formState!.next(props.formState as FormItem, acients);
});
/**
 * @desc Element组件render函数
 */
const render = () => {
  const elRenderStrategy: Record<FormItemType, VNode> = {
    input: createElFormItem(ElInput),
    inputNumber: createElFormItem(ElInputNumber)
    // ... 扩展ElPlus组件类型
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
    ...props.formState!.payload
  });
};
</script>

<style scoped></style>
