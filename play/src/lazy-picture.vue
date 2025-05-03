<template>
  <div class="container">
    <sm-lazy-picture
      lazy-url="https://img0.baidu.com/it/u=256816879,771155532&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1717693200&t=ed7939d6d4260cc27dc8444ad91276c3" />
  </div>
</template>

<script setup lang="ts">
import { SmLazyPicture } from '@strive-molu/components';
import '@strive-molu/components/lazy-picture/style/index';
</script>

<style scoped>
.container {
  width: 200px;
  height: 300px;
}
</style>
