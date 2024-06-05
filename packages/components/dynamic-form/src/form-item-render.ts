import { type PartialKey } from '@strive-molu/utils';
import { type FormItem } from './form-item';
// 组件props类型
export type FormItemRenderProps = {
  /**
   * @desc: 表单项配置
   */
  formState: FormItem | null;
  /**
   * @desc 表单所有属性
   */
  form: Record<string, any>;
  /**
   * @desc: 表单值
   */
  modelValue: any;
};
// 组件props默认值
export const defaultFormItemRenderProps: Record<PartialKey<FormItemRenderProps>, any> = {};

export const formItemRenderEmits = {
  'update:modelValue': (value: any) => true
};
