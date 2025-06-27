<template>
  <div></div>
</template>

<script setup lang="ts">
import { performTasks, idlePerformTasks, countPerformTasks, mockPromiseTasks } from '@strive-molu/utils';

countPerformTasks(mockPromiseTasks(10, true), 3, 1000);
</script>

<style scoped></style>
