<template>
  <div class="demo-wp">
    <sm-drag-resize></sm-drag-resize>
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
</style>
