<template>
  <div>{{ props.name }}</div>
  <component :is="h(ElInput, { ...props }, { ...$slots })"></component>
</template>

<script setup lang="ts">
import { useAttrs, h } from 'vue';
import { ElInput, InputProps } from 'element-plus';

const attrs = useAttrs();
const props = withDefaults(
  defineProps<
    Partial<InputProps> & {
      name: string;
    }
  >(),
  {}
);
</script>

<style scoped></style>
