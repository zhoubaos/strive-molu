<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /**
     * demo组件文件路径
     */
    file: string;
    /**
     * demo组件
     */
    demo: string | object;
  }>(),
  {}
);
</script>

<template>
  <div class="example-showcase vp-raw">
    <ClientOnly>
      <component
        :is="demo"
        v-if="demo"
        v-bind="$attrs" />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.example-showcase {
  padding: 1.5rem;
  margin: 0.5px;
  background-color: var(--bg-color);
}
</style>
