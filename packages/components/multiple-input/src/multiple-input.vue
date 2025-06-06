<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@strive-molu/hooks';
import { multipleInputEmits, multipleInputProps } from './multiple-input'

defineOptions({
  name: 'SmMultipleInput',
})

const props = defineProps(multipleInputProps)
const emit = defineEmits(multipleInputEmits)

const nsMultipleInput = useNamespace('multiple-input');

// init here
</script>
