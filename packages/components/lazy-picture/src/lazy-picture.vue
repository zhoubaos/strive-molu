<template>
  <div ref="lazyPictureRef" class="sm-lazy-picture">
    <img v-if="isLoading" class="sm-lazy-picture__load" :src="mergerLoadUrl" alt="加载中。。。" />
    <img
      v-else
      class="sm-lazy-picture-img"
      :style="{
        objectFit: objectFit
      }"
      :src="loadUrl"
      alt="" />
  </div>
</template>

<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core';
import { computed, onBeforeMount, ref } from 'vue';
import { type LazyPictureProps, defaultLazyPictureProps } from './lazy-picture';

defineOptions({
  name: 'SmLazyPicture'
});

const networkPictureProps = withDefaults(defineProps<LazyPictureProps>(), defaultLazyPictureProps);
// 默认load站位图
const mergerLoadUrl = computed(() => {
  let defaultUrl = new URL('@strive-molu/assets/src/images/lazy-picture-load.png', import.meta.url).href;
  return networkPictureProps.loadUrl || defaultUrl;
});

const lazyPictureRef = ref(null);
const loadUrl = ref('');
const isLoading = ref(true);
/**
 * @desc 处理图片懒加载
 * @param target 监听的目标元素
 * @param callback 获取加载完成的图片的回调函数
 */
const handleLazyLoadPicture = () => {
  const { stop } = useIntersectionObserver(lazyPictureRef as any, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      stop();
      let img = new Image();
      img.src = networkPictureProps.lazyUrl;
      img.onload = () => {
        loadUrl.value = img.src;
        isLoading.value = false;
      };
      img.onerror = (e) => {
        console.error(e);
      };
    }
  });
};

onBeforeMount(() => {
  handleLazyLoadPicture();
});

// init here
</script>
<!-- 禁止在vue文件内添加style标签 -->
