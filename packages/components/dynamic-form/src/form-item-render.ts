import { type FormItem } from './form-item';
import type { PropType, ExtractPropTypes } from 'vue';
// 组件props类型
export const formItemRenderProps = {
  /**
   * @desc: 表单项配置
   */
  formState: {
    type: Object as PropType<FormItem | null>
  },
  /**
   * @desc 表单所有属性
   */
  form: {
    type: Object as PropType<Record<string, any>>,
    required: true,
    default: () => {
      return {};
    }
  },
  /**
   * @desc: 表单值
   */
  modelValue: null
};
// 组件props默认值
export type FormItemRenderProps = ExtractPropTypes<typeof formItemRenderProps>;

export const formItemRenderEmits = {
  'update:modelValue': (value: any) => true
};
