<template>
  <div>
    <sm-auto-transition>
      <div class="box">11</div>
    </sm-auto-transition>
  </div>
</template>

<script setup lang="ts">
import { SmAutoTransition } from 'strive-molu';
import { onMounted } from 'vue';

onMounted(() => {
  setTimeout(() => {
    document.querySelector<HTMLElement>('.box')!.style.height = '100px';
  }, 1000);
});
</script>

<style scoped>
.box {
  height: 100%;
  width: 40px;
  background-color: red;
}
</style>
