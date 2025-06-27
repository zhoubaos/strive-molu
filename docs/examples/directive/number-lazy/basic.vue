<template>
  <div class="inline-flex gap-10">
    <div class="wrap">
      <div class="label p-10">基础</div>
      <div
        v-number-lazy="666"
        class="content p-10"></div>
    </div>
    <div class="wrap">
      <div class="label p-10">设置延时和精度</div>
      <div
        v-number-lazy:800:2="666.566"
        class="content p-10"></div>
    </div>
    <div class="wrap">
      <div class="label p-10">显示千分位</div>
      <div
        v-number-lazy.isThousands="66666"
        class="content p-10"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NumberLazy as vNumberLazy } from 'strive-molu';
</script>

<style scoped lang="scss">
.wrap {
  border: 1px solid #ccc;
  .label {
    font-size: 12px;
    text-align: center;
    color: #999;
    border-bottom: 1px solid #ccc;
  }
  .content {
    color: var(--sm-color-primary);
  }
}
</style>
