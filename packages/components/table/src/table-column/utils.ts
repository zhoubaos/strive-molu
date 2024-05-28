import type { Column } from './index';
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

export const getColumnTitleAndRendes = (
  columns: Column | Array<Column>
): {
  titles: any[];
  renders: any[];
} => {
  return {
    titles: getColumnTitles(columns),
    renders: getColumnRenders(columns)
  };
};
