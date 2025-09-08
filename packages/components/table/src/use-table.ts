import { computed, onBeforeMount, ref } from 'vue';
import { TableProps } from './table';
import { Column } from './table-column';
import { getLocalColumnProps, setLocalColumnProps, genTableHash } from './utils';
import { deepClone } from '@strive-molu/utils';

export function useTable(props: TableProps): any {
  const tableShowColumns = ref<Array<Column>>([]);
  const setTableShowColumns = () => {
    const columns: Array<Column> = deepClone(props.columns);
    // 支持自定义列
    if (props.canCustomColumn) {
      handleCustomColumns();
    } else {
      // const singleSelectRow = columns.find((item) => item.type == 'single-select');
      // if (singleSelectRow) {
      //   columns = [
      //     {
      //       ...singleSelectRow,
      //       slots: {
      //         customRender: 'single-select-column'
      //       }
      //     },
      //     ...columns.filter((item) => item.type != 'single-select')
      //   ];
      // }
      tableShowColumns.value = columns;
    }
  };
  onBeforeMount(() => {
    setTableShowColumns();
    setLastColumnAutoWidth();
  });

  // 表格hash值
  const tableHash = ref('');

  // 处理需要有自定义列功能的逻辑
  const handleCustomColumns = () => {
    const allColumnKeys = props.columns.map((item) => item.prop);
    // 生成表格的hash值
    tableHash.value = genTableHash(allColumnKeys);
    const localProps = getLocalColumnProps(tableHash.value);
    if (!localProps.length) {
      tableShowColumns.value = props.columns;
      const columnprops = tableShowColumns.value.map((item) => item.prop);
      setLocalColumnProps(tableHash.value, columnprops);
    } else {
      tableShowColumns.value = props.columns.filter((item) => localProps.includes(item.prop));
    }
  };

  // 设置展示列最后一行的宽度为自适应，防止表格未撑满
  const setLastColumnAutoWidth = () => {
    const len = tableShowColumns.value.length;
    if (len == 1 && Reflect.has(tableShowColumns.value[len - 1], 'width')) {
      tableShowColumns.value[len - 1] = {
        ...tableShowColumns.value[len - 1]
      };
      Reflect.deleteProperty(tableShowColumns.value[len - 1], 'width');
    }
  };

  // 是否启用单选列
  const isSingleSelect = computed(() => tableShowColumns.value.some((item: Column) => item.type == 'single-select'));

  return {
    tableShowColumns,
    isSingleSelect,
    tableHash,
    setLastColumnAutoWidth
  };
}
