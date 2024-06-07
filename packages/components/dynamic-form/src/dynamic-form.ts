import { type FormItem } from './form-item';
import type { PropType, ExtractPropTypes } from 'vue';
// 组件props类型
export const dynamicFormProps = {
  /**
   * el-form model配置对象
   */
  formData: {
    type: Object as PropType<Record<string, any>>,
    required: true,
    default: () => {
      return {};
    }
  },
  /**
   * 表单项的配置信息
   */
  formItems: {
    trpe: Array as PropType<Array<FormItem>>,
    required: true,
    default: () => [] as Array<FormItem>
  }
};

export type DynamicFormProps = ExtractPropTypes<typeof dynamicFormProps>;
