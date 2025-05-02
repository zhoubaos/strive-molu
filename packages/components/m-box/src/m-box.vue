<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { mBoxEmits, mBoxProps } from './m-box'

defineOptions({
  name: 'SmMBox',
})

const props = defineProps(mBoxProps)
const emit = defineEmits(mBoxEmits)

// init here
</script>
