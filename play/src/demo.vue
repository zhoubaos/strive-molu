<template>
  <div>
    <hs-input
      name="名称"
      placeholder="111">
      <template #append> 22 </template>
    </hs-input>
    <div v-number-lazy:8000:4="666.566"></div>
  </div>
</template>

<script setup lang="ts">
import HsInput from './hs-input.vue';
import { NumberLazy as vNumberLazy } from '@strive-molu/directives';
</script>

<style scoped></style>
