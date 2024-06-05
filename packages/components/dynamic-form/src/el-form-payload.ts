import type { InputProps, InputNumberProps, FormItemRule, FormItemProps } from 'element-plus';
type Arrayable<T> = T | T[];

// elment-plus表单组件公共属性
type ElCommonPayload<T> = {
  /**
   * 表单label
   */
  label: string;
  /**
   * 表单属性值
   */
  prop: string;
  /**
   * 表单属性值
   */
  val: any;
  /**
   * el-form-item属性
   */
  elFormItemAttrs?: Partial<FormItemProps>;
  /**
   * el 表单组件属性
   */
  elCompAttrs?: Partial<T>;
};

type WithCommonPayload<T, K extends Record<string, any> = {}> = ElCommonPayload<T> & K;

// el-input
type ElInputPayload = WithCommonPayload<
  InputProps,
  {
    type?: 'text' | 'textarea' | 'password';
  }
>;

// el-input-number
type ElInputNumberPayload = WithCommonPayload<InputNumberProps>;

// 动态表单项支持ElementPlus表单组件类型
export type FormItemType = 'input' | 'inputNumber';
export type FormItemPayload = ElInputPayload | ElInputNumberPayload;
