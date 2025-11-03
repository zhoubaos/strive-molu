<template>
  <div class="box-wp">
    <sm-drag-resize :min-width="0">
      <template #left>
        <div class="left-wp">1</div>
      </template>
      <div class="right-wp">2</div>
    </sm-drag-resize>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.box-wp {
  height: 200px;
  border: 1px solid #ccc;
}
.left-wp {
  min-width: 120px;
  background-color: red;
  height: 100%;
}
.right-wp {
  background-color: yellow;
  height: 100%;
}
</style>
