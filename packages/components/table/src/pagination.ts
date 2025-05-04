import { ReplaceObjKeyType } from '@strive-molu/utils';
import type { PaginationProps, TableColumnCtx } from 'element-plus';

type LayoutKey =
  | 'prev'
  | 'pager'
  | 'next'
  | 'jumper'
  | '->'
  | 'total'
  | 'sizes'
  | 'slot';
export type PaginationConfig = Omit<
  ReplaceObjKeyType<Partial<PaginationProps>, 'layout', LayoutKey[]>,
  'pageSize' | 'currentPage'
>;

// 分页默认配置
export const DEFAULT_PAGINATION_CONFIG: PaginationConfig = {
  total: 0,
  defaultCurrentPage: 1,
  defaultPageSize: 10,
  pageSizes: [10, 20, 50, 100],
  layout: ['total', 'sizes', 'prev', 'pager', 'next', 'jumper']
};
