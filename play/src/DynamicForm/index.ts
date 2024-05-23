import type { InputProps, FormItemRule } from 'element-plus';
import { isReactive, reactive } from 'vue';
type Arrayable<T> = T | T[];
// elment-plus表单组件公共属性
type ElCommonPayload = {
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
  val: string;
  /**
   * 表单规则
   */
  rules?: Arrayable<FormItemRule>;
};

// el-input 配置
type ElInputPayload = Partial<InputProps> &
  ElCommonPayload & {
    type?: 'text' | 'textarea' | 'password';
  };

// 动态表单项支持ElementPlus表单组件类型
export type FormItemType = 'input' | 'inputNumber';

// 表单项配置
export interface FormItem<T = any> {
  /**
   * @desc 类型
   */
  type: FormItemType;
  payload: T;
  /**
   * @desc 获取下一项表单项配置
   */
  next: (current: FormItem, acients: FormItem[]) => FormItem | null;
  /**
   * @desc 该表单项的上一个表单项
   */
  parent: FormItem | null;
}

export function createFormItem(
  type: 'input',
  payload: ElInputPayload,
  next?: FormItem['next'],
  parent?: FormItem['parent']
): FormItem<ElInputPayload>;

export function createFormItem(
  type: 'inputNumber',
  payload: any,
  next?: FormItem['next'],
  parent?: FormItem['parent']
): FormItem;

/**
 * @desc 生成表单项配置，可以做一些表单配置的公共
 */
export function createFormItem(type: any, payload: any, next?: any, parent: any = null): any {
  if (!next) {
    next = () => null;
  }
  payload.placeholder = payload.placeholder || `请输入${payload.label}`;

  /**
   * @desc 给获取下一个表单的配置加上parent属性
   * @param current
   * @param acients
   * @returns
   */
  const nextWithParent: FormItem['next'] = (current, acients) => {
    let nextItem = next(current, acients);
    if (!nextItem) {
      return null;
    }

    nextItem.parent = current;

    if (!isReactive(nextItem)) {
      nextItem = reactive(nextItem);
    }

    return nextItem;
  };

  return reactive({ type, payload, next: nextWithParent, parent });
}
