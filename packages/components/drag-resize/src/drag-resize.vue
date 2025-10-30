<template>
  <div
    :class="nsDragResize.b()"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @dragover="handleDragOver"
    @drop="handleDrop">
    <div :class="nsDragResize.e('left')">
      <slot name="left">left</slot>
    </div>
    <div :class="nsDragResize.e('right')">
      <slot name="rigth">right</slot>
    </div>
    <!-- 拖拽线 -->
    <div
      draggable
      :class="nsDragResize.e('drag-line')"
      @drag="handleDrag"
      @dragstart="handleDragsStart"
      @dragend="handleDragEnd"></div>
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

const { handleDrag, handleDragsStart, handleDragEnd, handleDragEnter, handleDragOver, handleDragLeave, handleDrop } =
  useDragResize(dragResizeProps);

// init here
</script>
