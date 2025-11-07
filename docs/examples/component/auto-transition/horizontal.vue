<template>
  <sm-auto-transition direction="horizontal">
    <div
      ref="boxRef"
      class="box">
      auto transition
    </div>
  </sm-auto-transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
const boxRef = ref<HTMLElement>();
onMounted(() => {
  setTimeout(() => {
    boxRef.value!.style.width = '400px';
  }, 1000);
});
</script>

<style scoped>
.box {
  background-color: yellow;
  height: 100px;
  width: 100px;
}
</style>
