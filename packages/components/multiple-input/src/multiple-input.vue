<template>
  <div
    :class="[nsMultipleInput.b()]"
    :style="{ width: props.width ? props.width + 'px' : '100%' }">
    <section :class="[nsMultipleInput.b('section')]">
      <div :class="[nsMultipleInput.be('section', 'header')]">
        <div :class="[nsMultipleInput.be('section', 'title')]">
          <slot name="title">
            {{ props.title }}（
            <span :class="[nsMultipleInput.bem('section', 'title', 'highlight')]">{{ inputList.length }}</span>
            <span v-if="props.max && props.showMax">/{{ props.max }}</span>
            ）
          </slot>
        </div>
        <div :class="[nsMultipleInput.be('section', 'operate')]">
          <el-button
            v-for="item in quickBtnConfig"
            :key="item.name"
            type="primary"
            link
            :disabled="props.disabled"
            @click="handleQuickAction(item)">
            {{ item.name }}
          </el-button>
        </div>
      </div>
      <div
        v-if="tip"
        :class="[nsMultipleInput.be('section', 'tip')]">
        {{ tip }}
      </div>
      <div :class="[nsMultipleInput.be('section', 'main')]">
        <div
          ref="rowNumberWpRef"
          :class="[nsMultipleInput.be('section', 'row')]">
          <div
            v-for="(item, ind) in inputList"
            :id="`line-${ind + 1}`"
            :key="item.id"
            :class="[nsMultipleInput.bem('section', 'row', 'number-wp')]">
            <div
              :class="[
                nsMultipleInput.bem('section', 'row', 'number'),
                nsMultipleInput.is('error', !item.validate),
                nsMultipleInput.is('disabled', props.disabled)
              ]">
              {{ ind + 1 }}
            </div>
          </div>
        </div>
        <div :class="[nsMultipleInput.be('section', 'input-list')]">
          <el-input
            v-for="(item, ind) in inputList"
            :id="`input-${ind}`"
            :key="item.id"
            v-model="item.value"
            :placeholder="props.placeholder"
            :disabled="props.disabled"
            @input="() => handleInput(ind)"
            @keyup.enter="handleEnterKeydown(item, ind, $event)"
            @keyup.down="handleDownKeyUpOrDown('down', ind, $event)"
            @keyup.up="handleDownKeyUpOrDown('up', ind, $event)"
            @paste="handlePaste(item, ind, $event)">
            <template #suffix>
              <el-icon
                :class="[nsMultipleInput.bm('section', 'close'), nsMultipleInput.is('disabled', props.disabled)]"
                size="12"
                @click="onClick_delInputItem(item)">
                <Close />
              </el-icon>
            </template>
          </el-input>
        </div>
      </div>
    </section>
    <footer
      v-if="errorValidList.length && !props.disabled"
      :class="[nsMultipleInput.b('footer')]">
      <div :class="[nsMultipleInput.be('footer', 'errors')]">
        <template
          v-for="(item, ind) in errorValidList"
          :key="ind">
          <div
            v-if="item.rowNums.length"
            :class="[nsMultipleInput.be('footer', 'error-item')]">
            <span :class="[nsMultipleInput.bem('footer', 'error-item', 'lable')]">{{ item.label }}</span>
            <div :class="[nsMultipleInput.bem('footer', 'error-item', 'row')]">
              <span
                v-for="line in item.rowNums"
                :key="line"
                @click="onClick_lineScrollToView(line)">
                第{{ line }}行
              </span>
            </div>
          </div>
        </template>
      </div>
      <el-button
        type="primary"
        link
        size="small"
        @click="onClick_clearErrorItem">
        清空错误内容
      </el-button>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@strive-molu/hooks';
import { multipleInputEmits, multipleInputProps } from './multiple-input';
import { Close } from '@element-plus/icons-vue';
import { nextTick, onBeforeMount, reactive, ref } from 'vue';
import { useGenerateInputConfig } from './utils';
import { useQuickActions } from './use-quick-action';
import { ErrorValidItem, InputItem, QuickBtnConfig } from './types';
import { isFunction } from '@strive-molu/utils';

defineOptions({
  name: 'SmMultipleInput'
});

const props = defineProps(multipleInputProps);
const emit = defineEmits(multipleInputEmits);

const nsMultipleInput = useNamespace('multiple-input');

const rowNumberWpRef = ref<HTMLElement | null>(null);
// 输入项列表
const inputList = ref<InputItem[]>([]);
onBeforeMount(() => {
  // 如果有默认文本
  if (props.defaultTexts?.length) {
    inputList.value = props.defaultTexts.map(useGenerateInputConfig);
  } else {
    inputList.value = [useGenerateInputConfig()];
  }
  validateInputItems();
});

/**
 * @desc 处理人输入框input事件
 * @param param0
 * @param ind
 * @param val
 */
const handleInput = (ind: number) => {
  validateInputItems();
};

/**
 * @desc 校验input选项
 */
const validateInputItems = () => {
  // for 循环索引
  let ind = 0;
  errorValidList.value = [];

  for (const input of inputList.value) {
    // before,after
    const before = [],
      after = [];
    for (const item of inputList.value) {
      if (!item.value.trim()) continue;
      if (item.id < input.id) {
        before.push(item.value.trim());
      } else if (item.id > input.id) {
        after.push(item.value.trim());
      }
    }

    // 验证状态
    const { isValid, errorValidArr } = validateInputItem(input.value, before, after);

    // 设置校验结果
    input.validate = isValid;

    for (const { valid, label } of errorValidArr) {
      let errorInd = errorValidList.value.findIndex((item) => item.label === label);
      // 验证失败
      if (!valid) {
        if (errorInd !== -1) {
          errorValidList.value[errorInd].rowNums = [
            ...new Set(errorValidList.value[errorInd].rowNums.concat(ind + 1).toSorted((a, b) => a - b))
          ];
        } else {
          errorValidList.value.push({
            label: label,
            rowNums: [ind + 1]
          });
        }
      } else {
        if (errorInd !== -1) {
          errorValidList.value[errorInd].rowNums = errorValidList.value[errorInd].rowNums.filter(
            (item) => item !== ind + 1
          );
        }
      }
    }

    ind++;
  }
};

/**
 * @desc 处理键盘enter键
 */
const handleEnterKeydown = (item: InputItem, ind: number, event: Event) => {
  if (inputList.value.length >= (props.max ?? Infinity)) return;

  const { value } = item;
  // 换行光标索引相当于第一个字符的位置
  const selectionInd = (event.target as any)?.selectionStart ?? value.length;

  const startHalf = value.slice(0, selectionInd).trim();
  const endHalf = value.slice(selectionInd).trim();

  inputList.value[ind].value = startHalf;

  let nextInputItem = useGenerateInputConfig(endHalf);
  inputList.value.splice(ind + 1, 0, nextInputItem);
  nextTick(() => {
    document.querySelector<HTMLInputElement>(`#input-${ind + 1}`)?.focus();
  });

  // 校验
  validateInputItems();
};

/**
 * @desc 处理键盘向下（down）键
 * @param event
 * @param ind
 */
const handleDownKeyUpOrDown = (type: 'down' | 'up', ind: number, event: Event) => {
  event.preventDefault();
  if (type === 'down') {
    if (ind !== inputList.value.length - 1) {
      document.querySelector<HTMLInputElement>(`#input-${ind + 1}`)?.focus();
    }
  } else {
    if (ind !== 0) {
      document.querySelector<HTMLInputElement>(`#input-${ind - 1}`)?.focus();
    }
  }
};

/**
 * @desc 处理粘贴事件
 */
const handlePaste = ({ id }: InputItem, ind: number, event: ClipboardEvent) => {
  if (props.disabled) return;

  event.preventDefault();

  let pasteText = event.clipboardData?.getData('text') ?? '';

  const mulipleLineText = props
    .parseTextsWithClipboard(pasteText)
    .filter((text) => text.trim())
    .map((text) => text.trim());

  if (mulipleLineText.length) {
    let startInd = ind;
    for (let i = 0; i < mulipleLineText.length; i++) {
      const text = mulipleLineText[i];
      if (i == 0) {
        inputList.value[startInd].value = text;
      } else {
        let nextInputItem = useGenerateInputConfig(text);
        inputList.value.splice(startInd, 0, nextInputItem);
      }
      startInd++;
    }
    // 添加一个空的输入框
    inputList.value.push(useGenerateInputConfig());
    let lastInd = inputList.value.length - 1;
    nextTick(() => {
      document.querySelector<HTMLInputElement>(`#input-${lastInd}`)?.focus();
    });
  }

  validateInputItems();
};

/**
 * @desc 删除输入项
 * @param item
 */
const onClick_delInputItem = ({ id }: InputItem) => {
  inputList.value =
    inputList.value.length === 1
      ? [useGenerateInputConfig()]
      : inputList.value.filter((inputItem) => inputItem.id !== id);

  validateInputItems();
};

// 失败验证列表
const errorValidList = ref<ErrorValidItem[]>([]);

/**
 * @desc 验证输入的文本
 * @param text
 */
const validateInputItem = (text: string, before: string[], after: string[]) => {
  const errorValidArr: Array<{ valid: boolean; label: string }> = [];
  for (const { validate, errLabel } of props.validateList) {
    errorValidArr.push({
      valid: validate(text, [...before, ...after], before, after),
      label: errLabel
    });
  }

  return { isValid: errorValidArr.every((item) => item.valid), errorValidArr };
};

/**
 * @desc 点击滚动到可视区
 * @param line
 */
const onClick_lineScrollToView = (line: number) => {
  let lineEl = rowNumberWpRef.value?.querySelector(`#line-${line}`);
  lineEl?.scrollIntoView({ behavior: 'smooth' });
  document.querySelector<HTMLInputElement>(`#input-${line - 1}`)?.focus();
};

/**
 * @desc 清除失败验证项
 */
const onClick_clearErrorItem = () => {
  errorValidList.value = [];
  let filterInputList = inputList.value.filter((item) => item.validate);
  inputList.value = filterInputList.length ? filterInputList : [useGenerateInputConfig()];
  validateInputItems();
};

/**
 * @desc 快捷操作按钮配置
 */
const { quickBtnConfig } = useQuickActions(props);

const handleQuickAction = (item: QuickBtnConfig) => {
  if (!isFunction(item.handleCallback)) {
    console.warn(`[${item.name}][handleCallback] is not a function`);
    return;
  }
  let r = item.handleCallback(inputList.value);
  if (!Array.isArray(r)) {
    console.warn(`[${item.name}][handleCallback] return value is not an array`);
    return;
  }
  inputList.value = r;
  validateInputItems();
};

/**
 * @desc 获取输入内容
 */
const getInputTexts = () => {
  return {
    isValid: errorValidList.value.length === 0, //是否都验证成功
    textList: inputList.value.map((item) => item.value)
  };
};

/**
 * @desc 设置默认输入内容
 */
const setDefaultInputTexts = (textList: string[]) => {
  inputList.value = textList.map(useGenerateInputConfig);
  validateInputItems();
};

defineExpose({
  getInputTexts,
  setDefaultInputTexts,
  clear: () => {
    handleQuickAction(quickBtnConfig[0]);
  }
});

// init here
</script>
