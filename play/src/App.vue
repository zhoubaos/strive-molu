<template>
  <div class="play-container">
    <h1>每个组件的路由地址为：域名+src目录下的文件名称，例如</h1>
    <h2>http://192.168.2.58:5173/App</h2>
    <h2>http://192.168.2.58:5173/Button</h2>
    <div>
      所有组件名称：
      <ul class="name-list">
        <li
          v-for="name in globNames"
          :key="name">
          {{ name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const globNames = Object.keys(import.meta.glob('./*.vue')).map((name) =>
  name.replace(/^.*\/([^/]+)\.vue$/, '$1')
);
import { countdown } from '@strive-molu/utils';

countdown(4000, (td) => {
  console.log(td);
});

// code here
</script>

<style scoped lang="less">
.play-container {
  height: 100%;
  width: 100%;
}
</style>
