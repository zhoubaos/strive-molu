<template>
  <ClientOnly>
    <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
    <p
      text="sm"
      v-html="decodedDescription"></p>

    <div class="example">
      <vp-example
        :file="path"
        :demo="formatPathDemos[path]" />

      <el-divider class="m-0" />

      <div class="op-btns">
        <el-tooltip
          content="复制代码"
          :show-arrow="false"
          :trigger="['hover', 'focus']"
          :trigger-keys="[]">
          <el-icon
            :size="16"
            aria-label="复制代码"
            class="op-btn"
            tabindex="0"
            role="button"
            @click="copyCode"
            @keydown.prevent.enter="copyCode"
            @keydown.prevent.space="copyCode">
            <i-ri-file-copy-line />
          </el-icon>
        </el-tooltip>
        <el-tooltip
          content="查看源代码"
          :show-arrow="false"
          :trigger="['hover', 'focus']"
          :trigger-keys="[]">
          <button
            ref="sourceCodeRef"
            :aria-label="sourceVisible ? '隐藏源代码' : '查看源代码'"
            class="reset-btn el-icon op-btn"
            @click="toggleSourceVisible()">
            <el-icon :size="16">
              <i-ri-code-line />
            </el-icon>
          </button>
        </el-tooltip>
      </div>

      <el-collapse-transition>
        <SourceCode
          v-show="sourceVisible"
          :source="source" />
      </el-collapse-transition>

      <Transition name="el-fade-in-linear">
        <div
          v-show="sourceVisible"
          class="example-float-control"
          tabindex="0"
          role="button"
          @click="toggleSourceVisible(false)"
          @keydown="onSourceVisibleKeydown">
          <el-icon :size="16">
            <CaretTop />
          </el-icon>
          <span>隐藏源代码</span>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref, toRef } from 'vue';
import { useClipboard, useToggle } from '@vueuse/core';
import { CaretTop } from '@element-plus/icons-vue';

import VpExample from './vp-example.vue';
import SourceCode from './vp-source-code.vue';

const props = withDefaults(
  defineProps<{
    /**
     * 所有demo组件源文件
     */
    demos: object;
    /**
     * 通过代码高亮库处理过的demo组件源文件
     */
    source: string;
    /**
     * demo组件基于examples目录的文件路径
     */
    path: string;
    /**
     * 未经处理的demo组件源文件
     */
    rawSource: string;
    /**
     * demo组件描述
     */
    description?: string;
  }>(),
  {
    description: '我是组件描述'
  }
);

const vm = getCurrentInstance()!;

const sourceCodeRef = ref<HTMLButtonElement>();
const formatPathDemos = computed(() => {
  const demos = {};

  Object.keys(props.demos).forEach((key) => {
    demos[key.replace('../../examples/', '').replace('.vue', '')] = props.demos[key].default;
  });

  return demos;
});

// 描述
const decodedDescription = computed(() => decodeURIComponent(props.description));

const [sourceVisible, toggleSourceVisible] = useToggle();

/**
 * @description 切换源代码
 * @param e
 */
const onSourceVisibleKeydown = (e: KeyboardEvent) => {
  if (['Enter', 'Space'].includes(e.code)) {
    e.preventDefault();
    toggleSourceVisible(false);
    sourceCodeRef.value?.focus();
  }
};

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource)
});
/**
 * @description 复制源代码
 * warn：useClipboard 的底层是是使用 navigator.clipboard 实现的，在http协议中navigator.clipboard打印undefined，所以会失效。
 */
const copyCode = async () => {
  const { $message } = vm.appContext.config.globalProperties;

  if (!isSupported.value || !navigator.clipboard) {
    $message.error(`没有复制权限`);
    return;
  }
  try {
    await copy();
    $message.success('复制成功');
  } catch (e: any) {
    $message.error('复制失败');
    console.log(e);
  }
};
</script>

<style scoped lang="scss">
.example {
  border: 1px solid var(--border-color);
  border-radius: var(--sm-border-radius-base);

  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;

    .el-icon {
      &:hover {
        color: var(--text-color);
      }
    }

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--text-color-lighter);
      transition: 0.2s;

      &.github a {
        transition: 0.2s;
        color: var(--text-color-lighter);

        &:hover {
          color: var(--text-color);
        }
      }
    }
  }

  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--border-color);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--bg-color, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;

    span {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>
