import { computed, onMounted, ref } from 'vue';
import { DragResizeProps } from './drag-resize';

export function useDragResize(props: DragResizeProps) {
  // 容器元素
  const resizeBoxRef = ref<HTMLElement | null>(null);
  const resizeBoxWidth = ref(0);
  onMounted(() => {
    resizeBoxWidth.value = resizeBoxRef.value?.clientWidth || 0;
  });

  // 拖拽元素
  const lineRef = ref<HTMLElement | null>(null);
  //   拖拽开始初始位置&相对初始位置移动距离
  const resizeStartX = ref(0);
  const resizeMoveX = ref(0);

  // 容器左边区域元素
  const leftBoxRef = ref<HTMLElement | null>(null);
  const leftBoxWidth = ref(0);
  const minWidth = ref(props.minWidth);
  onMounted(() => {
    leftBoxWidth.value = leftBoxRef.value?.clientWidth || 0;
    if (minWidth.value <= 0) {
      minWidth.value = leftBoxWidth.value;
    }
  });
  // 容器左边区域元素reszie的宽度
  const leftTargetResizeWidth = computed(() => {
    // 左边元素最小&最多宽度

    const maxW = Math.max(resizeBoxWidth.value - minWidth.value, 0);

    const nWidth = leftBoxWidth.value + resizeMoveX.value;
    if (nWidth <= minWidth.value) {
      return minWidth.value;
    } else if (nWidth > maxW) {
      return maxW;
    } else {
      return nWidth;
    }
  });

  // left box style
  const leftBoxStyle = computed(() => {
    return {
      minWidth: leftTargetResizeWidth.value + 'px',
      marginRight: props.dragLineWidth / 2 + 'px'
    };
  });
  // right box style
  const rightBoxStyle = computed(() => {
    return {
      marginLeft: props.dragLineWidth / 2 + 'px'
    };
  });

  const dragLineStyle = computed(() => {
    return {
      width: props.dragLineWidth + 'px',
      left: `${leftTargetResizeWidth.value}px`,
      padding: `4px ${props.dragLineWidth / 4}px`
    };
  });

  // resize 状态
  const resizeFlag = ref(false);
  const handleMouseDown = (e: MouseEvent) => {
    leftBoxWidth.value = leftBoxRef.value?.clientWidth || 0;
    resizeStartX.value = e.clientX;
    resizeMoveX.value = 0;
    resizeFlag.value = true;
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!resizeFlag.value) return;
    resizeMoveX.value = e.clientX - resizeStartX.value;
  };
  const handleMouseUpOrLeave = () => {
    resizeFlag.value = false;
  };

  return {
    resizeBoxRef,
    lineRef,
    leftBoxRef,
    leftTargetResizeWidth,
    leftBoxStyle,
    rightBoxStyle,
    dragLineStyle,
    handleMouseDown,
    handleMouseMove,
    handleMouseUpOrLeave
  };
}
