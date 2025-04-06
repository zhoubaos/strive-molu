<template>
  <div
    class="dd"
    @click="onClick_d">
    <SmButton />
  </div>
</template>

<script setup lang="ts">
import { SmButton } from '@strive-molu/components';
import { throttle } from '@strive-molu/utils';
import '@strive-molu/components/button/style';
const onClick_d = throttle(() => {
  console.log('click');
}, 1000);
</script>

<style scoped lang="less">
.dd {
  height: 100px;
}
</style>
