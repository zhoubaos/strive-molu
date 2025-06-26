<template>
  <div
    :class="[nsFrame.b(), nsFrame.is('disabled', props.disabled)]"
    :style="{
      width: props.width ? props.width + 'px' : 'max-content'
    }">
    <div
      :class="[nsFrame.e('left')]"
      :style="{
        width: props.labelWidth + 'px'
      }">
      <slot name="label">
        <!-- default -->
        <div
          v-if="props.labelType === 'default'"
          :class="[nsFrame.em('left', 'label')]">
          {{ props.label }}
        </div>
        <!-- select -->
        <div
          v-else-if="props.labelType === 'select'"
          :class="[nsFrame.em('left', 'select-label')]">
          <el-select v-bind="{ ...selectLabel, ...props.labelProps }">
            <el-option
              v-for="item in props.labelOption"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </div>
      </slot>
    </div>
    <div :class="[nsFrame.e('main')]">
      <slot></slot>
    </div>
    <div :class="[nsFrame.e('right')]">
      <slot name="append"> </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@strive-molu/hooks';
import { formFrameProps } from './form-frame';
import { provide, reactive, toRef, useAttrs, computed } from 'vue';
import { FormContext, formContextKey } from 'element-plus';

defineOptions({
  name: 'SmFormFrame'
});

const props = defineProps(formFrameProps);
const nsFrame = useNamespace('form-frame');

// 透传disabled给表单组件
provide(
  formContextKey,
  reactive({
    disabled: toRef(props, 'disabled')
  }) as FormContext
);

const attrs = useAttrs();

// 透传给label为select的props
const selectLabel = computed(() => {
  return Object.fromEntries(Object.entries(attrs).filter(([key, value]) => !Object.keys(props).includes(key)));
});

// init here
</script>
