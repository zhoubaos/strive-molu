<script setup lang="ts">
import { computed } from 'vue';
import { Warning } from '@element-plus/icons-vue';

defineProps({
  type: String,
  details: String
});
</script>

<template>
  <span class="inline-flex items-center">
    <code class="api-typing mr-4">
      {{ type }}
    </code>
    <ClientOnly>
      <ElTooltip
        effect="light"
        trigger="click">
        <ElButton
          text
          :icon="Warning"
          class="p-8 text-16" />
        <template #content>
          <slot>
            <div
              class="m-4"
              style="max-width: 600px">
              <code class="text-primary-light">
                {{ details }}
              </code>
            </div>
          </slot>
        </template>
      </ElTooltip>
    </ClientOnly>
  </span>
</template>
