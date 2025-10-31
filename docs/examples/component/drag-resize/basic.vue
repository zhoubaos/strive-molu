<template>
  <div class="box-wp">
    <sm-drag-resize>
      <template #left>
        <div>1</div>
      </template>
    </sm-drag-resize>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.box-wp {
  height: 200px;
  border: 1px solid #ccc;
}
</style>
