<template>
  <div class="flex flex-wrap h-[400px] gap-6 overflow-y-auto">
    <div
      v-for="url in pirUrls"
      :key="url"
      class="w-[31.333%] h-[200px]">
      <sm-lazy-picture :url="url"></sm-lazy-picture>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const pirUrls = ref([
  'https://img1.baidu.com/it/u=2259444725,4182202579&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=1066',
  'https://img0.baidu.com/it/u=8013311,3592244460&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=617',
  'https://img0.baidu.com/it/u=600722015,3838115472&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750',
  'https://img0.baidu.com/it/u=3677381888,3027116986&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=758',
  'https://img2.baidu.com/it/u=2394705506,3847816067&fm=253&fmt=auto&app=138&f=JPEG?w=427&h=569',
  'https://img0.baidu.com/it/u=3221931964,1977043041&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750',
  'https://img2.baidu.com/it/u=1451072963,3355621335&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667',
  'https://img2.baidu.com/it/u=3107839948,3570219976&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
]);
</script>
