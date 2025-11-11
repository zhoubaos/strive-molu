<template>
  <div
    ref="smAutoTransitionRef"
    :class="nsAutoTransition.b()"
    :style="styles"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@strive-molu/hooks';
import { autoTransitionEmits, autoTransitionProps } from './auto-transition';
import { ref, computed, onMounted } from 'vue';

defineOptions({
  name: 'SmAutoTransition'
});

const props = defineProps(autoTransitionProps);
const emit = defineEmits(autoTransitionEmits);

const smAutoTransitionRef = ref<HTMLElement | null>(null);

const nsAutoTransition = useNamespace('auto-transition');

const styles = computed(() => {
  if (!initSize.value) {
    return {};
  }

  let sty = {
    transition: `all 0.5s ${props.timingFunction}`
  };

  if (props.direction == 'vertical') {
    Reflect.set(sty, 'height', initSize.value + 'px');
    Reflect.set(sty, 'width', '100%');
  } else {
    Reflect.set(sty, 'width', initSize.value + 'px');
  }

  return sty;
});

const initSize = ref(0);
onMounted(() => {
  initSize.value = smAutoTransitionRef.value![props.direction == 'vertical' ? 'offsetHeight' : 'offsetWidth'];
});
const handleMouseenter = () => {
  let propertyName = props.direction == 'vertical' ? 'height' : 'width';

  // 触发重汇，获取渲染高度
  smAutoTransitionRef.value!.style.setProperty(propertyName, propertyName == 'height' ? 'auto' : 'fit-content');
  let size = smAutoTransitionRef.value![propertyName == 'height' ? 'offsetHeight' : 'offsetWidth'];
  smAutoTransitionRef.value!.style.setProperty(propertyName, initSize.value + 'px');

  // 触发回流，强制渲染
  smAutoTransitionRef.value![propertyName == 'height' ? 'offsetHeight' : 'offsetWidth'];
  smAutoTransitionRef.value!.style.setProperty(propertyName, size + 'px');
};

const handleMouseleave = () => {
  let propertyName = props.direction == 'vertical' ? 'height' : 'width';
  smAutoTransitionRef.value!.style.setProperty(propertyName, initSize.value + 'px');
};

// init here
</script>
