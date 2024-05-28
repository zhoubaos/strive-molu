import { withInstall } from '@strive-molu/utils';
import Table from './src/table.vue';

export const SmTable = withInstall(Table);
export default SmTable;

export type { Column } from './src/table-column';
export type { TableInstance } from './src/instance';
