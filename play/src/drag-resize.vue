<template>
  <div class="demo-wp">
    <sm-drag-resize>
      <template #left>
        <div class="left-box">菜单</div>
      </template>
      <div class="right-box">box</div>
    </sm-drag-resize>
  </div>
</template>

<script setup lang="ts">
import { SmDragResize } from 'strive-molu';
</script>

<style scoped>
.demo-wp {
  width: 600px;
  height: 400px;
  margin-left: 100px;
  border: 1px solid red;
}
.left-box {
  background-color: red;
  border-radius: 6px;
  height: 100%;
}
.right-box {
  background-color: yellow;
  border-radius: 6px;
  height: 100%;
}
</style>
