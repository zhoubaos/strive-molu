<template>
  <div
    ref="lazyPictureRef"
    :class="[nsLazyPicture.b()]">
    <img
      v-if="isLoading"
      :class="[nsLazyPicture.e('load')]"
      :src="loadingUrl"
      alt="加载中。。。" />
    <img
      v-else
      :class="[nsLazyPicture.e('img')]"
      :style="{
        objectFit: objectFit
      }"
      :src="loadedUrl"
      alt="" />
  </div>
</template>

<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core';
import { computed, onBeforeMount, ref } from 'vue';
import { lazyPictureProps } from './lazy-picturee';
import { useNamespace } from '@strive-molu/hooks';

defineOptions({
  name: 'SmLazyPicture'
});

const props = defineProps(lazyPictureProps);

const nsLazyPicture = useNamespace('lazy-picture');

// 默认load占位图
const loadingUrl = computed(() => {
  let defaultUrl = new URL(
    '@strive-molu/assets/src/images/lazy-picture-load.png',
    import.meta.url
  ).href;
  return props.loadingUrl || defaultUrl;
});

const lazyPictureRef = ref(null);
const loadedUrl = ref('');
const isLoading = ref(true);
/**
 * @desc 处理图片懒加载
 * @param target 监听的目标元素
 * @param callback 获取加载完成的图片的回调函数
 */
const handleLazyLoadPicture = () => {
  const { stop } = useIntersectionObserver(
    lazyPictureRef as any,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        stop();
        let img = new Image();
        img.src = props.url || '';
        img.onload = () => {
          loadedUrl.value = img.src;
          isLoading.value = false;
        };
        img.onerror = (e) => {
          console.error(e);
        };
      }
    }
  );
};

onBeforeMount(() => {
  handleLazyLoadPicture();
});

// init here
</script>
