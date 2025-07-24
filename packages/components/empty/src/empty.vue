<template>
  <div :class="nsEmpty.b()">
    <img
      :class="nsEmpty.e('img')"
      :style="imgStyle"
      :src="props.src || emptyImg"
      alt="#" />
    <p :class="nsEmpty.e('text')">{{ props.description || '暂无数据~' }}</p>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@strive-molu/hooks';
import { emptyEmits, emptyProps } from './empty';
import emptyImg from '@strive-molu/assets/src/images/404.png';
import { computed } from 'vue';

defineOptions({
  name: 'SmEmpty'
});

const props = defineProps(emptyProps);
const emit = defineEmits(emptyEmits);

const nsEmpty = useNamespace('empty');

const imgStyle = computed(() => {
  return {
    width: `${props.size}px`,
    height: `${props.size}px`
  };
});

// init here
</script>
