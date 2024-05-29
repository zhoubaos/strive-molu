<template>
  <div class="custom-column-container">
    <el-dialog :model-value="visible" :width="618" title="自定义设置表格列" @closed="onClick_closeDialog">
      <div class="required-column-box">
        <el-checkbox-group :model-value="requiredColuProps">
          <el-checkbox v-for="column in requiredColuOption" :key="column.prop" :label="column.prop" disabled>{{
            column.label
          }}</el-checkbox>
        </el-checkbox-group>
      </div>

      <div class="tips">请选择需要在表格中显示的数据列</div>
      <div class="column-setting-box">
        <div class="top">
          <el-checkbox v-model="allCheckboxValue" :indeterminate="isIndeterminate" @change="handleCheckAllChange"
            >全选</el-checkbox
          >
        </div>
        <div class="content">
          <el-checkbox-group v-model="curSelectedProps" @change="handleCheckAllChange">
            <el-checkbox v-for="column in optionalColuOption" :key="column.prop" :label="column.prop">{{
              column.label
            }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="onClick_closeDialog">取消</el-button>
          <el-button type="primary" @click="onClick_confirmCheckColumns">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { customColumnEmits, customColumnProps } from './index';
import { type Column } from '../table-column';
import { getLocalColumnProps, setLocalColumnProps } from '../utils';
import { onBeforeMount, ref } from 'vue';

defineOptions({
  name: 'SmCustomColumn'
});

const props = defineProps(customColumnProps);
const emits = defineEmits(customColumnEmits);

// 所有列的prop
const allColuProps = ref<string[]>([]);

// 必须展示的列的prop
const requiredColuProps = ref<string[]>([]);
// 必选列的配置
const requiredColuOption = ref<Column[]>([]);
// 可选的列的配置
const optionalColuOption = ref<Column[]>([]);
onBeforeMount(() => {
  const { columns } = props;
  requiredColuProps.value = columns.reduce((pre, cur) => {
    cur.isRequired && pre.push(cur.prop);
    return pre;
  }, [] as string[]);

  requiredColuOption.value = columns.filter((item) => requiredColuProps.value.includes(item.prop));
  optionalColuOption.value = columns.filter((item) => !requiredColuProps.value.includes(item.prop));

  allColuProps.value = columns.map((item) => item.prop);
});

// 回显localStorage保存展示的key
const curSelectedProps = ref<string[]>([]);
onBeforeMount(() => {
  curSelectedProps.value = getLocalColumnProps(props.tableHash).filter(
    (item) => !requiredColuProps.value.includes(item)
  );
});

// region 列全选逻辑
// 全选框是否选中
const allCheckboxValue = ref(false);
// 是否现在选择框中间状态
const isIndeterminate = ref(false);

onBeforeMount(() => {
  allCheckboxValue.value = optionalColuOption.value.length === curSelectedProps.value.length;
  isIndeterminate.value =
    optionalColuOption.value.length !== curSelectedProps.value.length && curSelectedProps.value.length > 0;
});

/**
 * @desc 全选框 change 事件
 * @param val
 */
const handleCheckAllChange = (val: boolean) => {
  curSelectedProps.value = val
    ? [...allColuProps.value.filter((item: any) => !requiredColuProps.value.includes(item))]
    : [];
  isIndeterminate.value = false;
};

// endregion

/**
 * @desc 确认当前选择展示的列
 */
const onClick_confirmCheckColumns = () => {
  // if (!checkedKey.value.length) {
  //   ElMessage.warning('至少选择一列');
  //   return;
  // }
  const allShowColumnProps = [...requiredColuProps.value, ...curSelectedProps.value];
  setLocalColumnProps(props.tableHash, [...allShowColumnProps]);
  emits('checked-column-props', [...allShowColumnProps]);
  onClick_closeDialog();
};

// 关闭弹框
const onClick_closeDialog = () => {
  emits('update:visible', false);
};
</script>
