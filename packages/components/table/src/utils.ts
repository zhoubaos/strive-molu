import type { Column } from './table-column';
import { Md5 } from 'ts-md5';
/**
 * @desc 返回一个一维数组，获取表格配置的自定义title的属性名（主要运用于有多级表头配置）
 * @param columns 表格配置
 * @returns
 */
export const getColumnTitles = (columns: Column | Array<Column>) => {
  const result: any = [];
  if (Array.isArray(columns)) {
    columns.forEach((col) => {
      if (col.children) {
        // result.push(col);
        result.push(...getColumnTitles(col.children));
      } else if (col.slots?.title) {
        result.push(col.slots?.title);
      }
    });
  } else {
    if (columns.children) {
      // result.push(col);
      result.push(...getColumnTitles(columns.children));
    } else if (columns.slots?.title) {
      result.push(columns.slots?.title);
    }
  }
  return result;
};
/**
 * @desc 返回一个一维数组，获取表格配置的自定义每列单元格的属性名（主要运用于有多级表头配置）
 * @param columns 表格配置
 * @returns {string[]}
 */
export const getColumnRenders = (columns: Column | Array<Column>) => {
  const result: any = [];
  if (Array.isArray(columns)) {
    columns.forEach((col) => {
      if (col.children) {
        result.push(...getColumnRenders(col.children));
      } else if (col.slots?.customRender) {
        result.push(col.slots?.customRender);
      }
    });
  } else {
    if (columns.children) {
      result.push(...getColumnRenders(columns.children));
    } else if (columns.slots?.customRender) {
      result.push(columns.slots?.customRender);
    }
  }
  return result;
};
// 获取 localStorage 存储的列的prop值
export const getLocalColumnProps = (key: string): string[] => {
  const saveKeyData: string = localStorage.getItem(key) || '';
  return saveKeyData.split('&');
};
// localStorage 存入列的prop值
export const setLocalColumnProps = (key: string, props: string[]) => {
  localStorage.setItem(key, props.join('&'));
};

// 获取当前表格所有的列的key的hash值
export const genTableHash = (props: string[], extra?: string) => 'columnsProps-' + Md5.hashStr(props.join(''));
/**
 * @desc 把数据结构中的空值替换为占位符
 * @param tree
 * @param emptyV
 * @param placeholder
 */
export const replaceTreeEmptyToPlaceholder = (
  tree: Record<string | 'children', any>[],
  emptyV = ['', null, undefined],
  placeholder = '--'
) => {
  if (Array.isArray(tree)) {
    for (const item of tree) {
      for (const key in item) {
        if (key == 'children') {
          replaceTreeEmptyToPlaceholder(item['children'], emptyV, placeholder);
        } else {
          emptyV.includes(item[key]) && (item[key] = placeholder);
        }
      }
    }
  }

  return tree;
};
