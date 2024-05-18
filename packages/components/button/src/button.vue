<template>
  <div class="wp">
    <el-button
      type="primary"
      @click="onClick_d"
      >我是EL按钮</el-button
    >
    <button
      class="sm-button"
      @click="onClick_d">
      我是SM按钮
    </button>
  </div>
</template>

<script setup lang="ts">
import { throttle } from '@strive-molu/utils';
import { buttonProps } from './button';
defineOptions({
  name: 'SmButton'
});

const props = defineProps(buttonProps);

const onClick_d = throttle(() => {
  console.log('click', props.type);
}, 1000);
</script>
