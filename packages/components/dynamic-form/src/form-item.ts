import { isReactive, reactive } from 'vue';
import type { FormItemType, FormItemPayload } from './el-form-payload';
export * from './el-form-payload';
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
  next: (val: any, current: FormItem, acients: FormItem[]) => FormItem | null;
  /**
   * @desc 该表单项的上一个表单项
   */
  parent: FormItem | null;
}

export function createFormItem<T extends FormItemType>(
  type: T,
  payload: FormItemPayload,
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

  if (!payload.elCompAttrs) {
    payload.elCompAttrs = {};
  }

  payload!.elCompAttrs.placeholder = payload.elCompAttrs.placeholder || `请输入${payload.label}`;

  /**
   * @desc 给获取下一个表单的配置加上parent属性
   * @param current
   * @param acients
   * @returns
   */
  const nextWithParent: FormItem['next'] = (val, current, acients) => {
    let nextItem = next(val, current, acients);
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
