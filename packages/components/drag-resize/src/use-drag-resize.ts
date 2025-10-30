import { ref } from 'vue';
import { DragResizeProps } from './drag-resize';

export function useDragResize(props: DragResizeProps) {
  // 拖拽元素
  const dragSourceRef = ref(null);

  //   拖拽初始位置
  const dragStartX = ref(0);

  const handleDragsStart = (e: DragEvent) => {
    console.log('=drags start=', e);
    e.preventDefault();
    dragStartX.value = e.offsetX;
  };
  const handleDrag = (e: DragEvent) => {
    console.log('=drag=', e);
  };
  const handleDragEnd = (e: DragEvent) => {
    console.log('=drag end=', e);
  };

  // 拖拽目标元素
  const dragTargetRef = ref(null);

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    console.log('==drag enter==', e);
  };
  const handleDragOver = (e: DragEvent) => {
    // 阻止默认行为以允许放置
    e.preventDefault();
    if (e.dataTransfer) {
      // 隐藏copy图表
      e.dataTransfer.dropEffect = 'none';
    }
    console.log('==drag over==', e);
  };
  const handleDragLeave = (e: DragEvent) => {
    console.log('==drag leave==', e);
  };
  const handleDrop = (e: DragEvent) => {
    // 阻止默认行为（会作为某些元素的链接打开）
    e.preventDefault();

    console.log('==drop==', e);
  };

  return {
    dragSourceRef,
    handleDrag,
    handleDragsStart,
    handleDragEnd,
    dragTargetRef,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop
  };
}
