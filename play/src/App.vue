<template>
  <div class="play-container">
    <h1>每个组件的路由地址为：域名+src目录下的文件名称，例如</h1>
    <h2>{{ curIp }}/App</h2>
    <h2>{{ curIp }}/Button</h2>
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
// 获取当前ip+端口
const curIp = window.location.origin;
const globNames = Object.keys(import.meta.glob('./*.vue')).map((name) =>
  name.replace(/^.*\/([^/]+)\.vue$/, '$1')
);

// code here
</script>

<style scoped lang="less">
.play-container {
  height: 100%;
  width: 100%;
}
</style>
