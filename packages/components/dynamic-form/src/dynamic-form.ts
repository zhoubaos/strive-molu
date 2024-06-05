import { type PartialKey } from '@strive-molu/utils';
import { type FormItem } from './form-item';
// 组件props类型
export type DynamicFormProps = {
  /**
   * el-form model配置对象
   */
  formData: Record<string, any>;
  /**
   * 表单项的配置信息
   */
  formItems: Array<FormItem>;
};
// 组件props默认值
export const defaultDynamicFormProps: Record<PartialKey<DynamicFormProps>, any> = {};
