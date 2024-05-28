<template>
  <button class="sm-button" @click="onClick_d">我是SM按钮</button>
</template>

<script setup lang="ts">
import { throttle } from '@strive-molu/utils';
import { buttonProps, buttonEmits } from './button';
defineOptions({
  name: 'SmButton'
});

const props = defineProps(buttonProps);
const emmits = defineEmits(buttonEmits);

const onClick_d = throttle(() => {
  console.log('click', props.type);
}, 1000);
</script>
