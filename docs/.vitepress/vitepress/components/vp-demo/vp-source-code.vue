<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  /**
   * 源码
   */
  source: {
    type: String,
    required: true
  }
});

const decoded = computed(() => {
  return decodeURIComponent(props.source);
});
</script>

<template>
  <div class="example-source-wrapper">
    <div
      class="example-source language-vue"
      v-html="decoded"></div>
  </div>
</template>

<style scoped lang="scss">
.language-vue {
  margin: 0 !important;
  border-radius: 0 !important;
}
</style>
