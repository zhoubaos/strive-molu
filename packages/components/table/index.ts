import { type SFCWithInstall, withInstall } from '@strive-molu/utils';
import Table from './src/table.vue';

export const SmTable: SFCWithInstall<typeof Table> = withInstall(Table);
export default SmTable;

export type { Column } from './src/table-column';
export * from './src/table';
export type { TableInstance } from './src/instance';
