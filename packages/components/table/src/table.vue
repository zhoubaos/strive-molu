<template>
  <div class="sm-table">1</div>
</template>

<script lang="ts" setup>
import { tableProps } from './table';

defineOptions({
  name: 'SmTable'
});

const props = defineProps(tableProps);

// init here
</script>
<!-- 禁止在vue文件内些style标签 -->
