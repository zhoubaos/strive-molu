<template>
  <div
    ref="resizeBoxRef"
    :class="nsDragResize.b()"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseUpOrLeave"
    @mouseup="handleMouseUpOrLeave">
    <div
      ref="leftBoxRef"
      :style="leftBoxStyle"
      :class="nsDragResize.e('left')">
      <slot name="left"> {{ leftTargetResizeWidth }}</slot>
    </div>
    <div
      :class="nsDragResize.e('right')"
      :style="rightBoxStyle">
      <slot></slot>
    </div>
    <!-- 拖拽线 -->
    <div
      ref="lineRef"
      :class="nsDragResize.e('line-wrap')"
      :style="dragLineStyle">
      <div
        :class="nsDragResize.em('line-wrap', 'line')"
        @mousedown="handleMouseDown"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@strive-molu/hooks';
import { dragResizeEmits, dragResizeProps } from './drag-resize';
import { useDragResize } from './use-drag-resize';

defineOptions({
  name: 'SmDragResize'
});

const props = defineProps(dragResizeProps);
const emit = defineEmits(dragResizeEmits);

const nsDragResize = useNamespace('drag-resize');

const {
  resizeBoxRef,
  leftBoxRef,
  lineRef,
  leftTargetResizeWidth,
  leftBoxStyle,
  rightBoxStyle,
  dragLineStyle,
  handleMouseDown,
  handleMouseUpOrLeave,
  handleMouseMove
} = useDragResize(props);

// init here
</script>
