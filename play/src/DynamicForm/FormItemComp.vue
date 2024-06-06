<template>
  <template v-if="formState">
    <el-form-item :label="formState.payload.label" :rules="formState.payload.rules" :prop="formState.payload.prop">
      <!-- el-input -->
      <el-input
        v-if="formState.type == 'input'"
        :model-value="modelValue"
        v-bind="formState.payload"
        @update:model-value="updateModelValue"></el-input>
      <!-- el-input-number -->
      <el-input-number
        v-if="formState.type == 'inputNumber'"
        :model-value="modelValue"
        v-bind="formState.payload"
        @update:model-value="updateModelValue"></el-input-number>
    </el-form-item>
    <!-- next -->
    <form-item-comp v-model="form[nextItem?.payload.prop]" :form-state="nextItem" :form="form"></form-item-comp>
  </template>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { type FormItem } from './index';
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
 * @desc 监听表单值的变化，更新表单配置对象中的val值
 */
watch(
  () => props.modelValue,
  (newV) => {
    props.formState!.payload.val = newV;
  }
  // { immediate: true }
);
/**
 * @desc 更新表单值，和表单配置对象中的val值
 * @param val
 */
const updateModelValue = (val: any) => {
  props.formState!.payload.val = val;
  emits('update:modelValue', val);
};
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

// const createElInputNumber = () =>
//   h(ElInputNumber, {
//     modelValue: props.modelValue,
//     'onUpdate:modelValue': (val: string) => {
//       console.log(val);
//       emits('update:modelValue', val);
//     },
//     ...payload.value
//   });

// const createElInput = () =>
//   h(ElInput, {
//     modelValue: props.modelValue,
//     'onUpdate:modelValue': (val: string) => {
//       console.log(val);
//       emits('update:modelValue', val);
//     },
//     ...payload.value
//   });

// const render = () => {
//   const strategy: any = {
//     input: createElInput,
//     inputNumber: createElInputNumber
//   };
//   return strategy[type.value]();
// };
</script>

<style scoped></style>
