<template>
  <div>
    <sm-dynamic-form :form-data="formData" :form-items="formItems">
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </sm-dynamic-form>
  </div>
</template>

<script setup lang="ts">
import { SmDynamicForm, type FormItem, createFormItem } from '@strive-molu/components';
import { reactive } from 'vue';
const formData = reactive({
  name: '',
  age: undefined,
  email: ''
});

const formItems = reactive([
  createFormItem('input', {
    val: formData.name,
    label: '名字',
    prop: 'name',
    type: 'text',
    elFormItemAttrs: {
      rules: [{ required: true }],
      labelWidth: 120
    },
    elCompAttrs: {
      clearable: false
    }
  }),
  createFormItem(
    'inputNumber',
    {
      val: formData.age,
      label: '年龄',
      prop: 'age',
      elCompAttrs: {}
    },
    (val, current: any, acients: any) => {
      if (val > 20) {
        return null;
      }
      return createFormItem('input', {
        val: formData.email,
        label: '邮箱',
        prop: 'email'
      });
    }
  )
]);

const onSubmit = () => {
  console.log(formData);
};
</script>

<style scoped></style>
