<template>
  <ClientOnly>
    <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
    <p
      text="sm"
      v-html="decodedDescription"></p>

    <div class="example">
      <Example
        :file="path"
        :demo="formatPathDemos[path]" />

      <ElDivider class="m-0" />

      <div class="op-btns">
        <ElTooltip
          content="复制代码"
          :show-arrow="false"
          :trigger="['hover', 'focus']"
          :trigger-keys="[]">
          <ElIcon
            :size="16"
            aria-label="复制代码"
            class="op-btn"
            tabindex="0"
            role="button"
            @click="copyCode"
            @keydown.prevent.enter="copyCode"
            @keydown.prevent.space="copyCode">
            <i-ri-file-copy-line />
          </ElIcon>
        </ElTooltip>
        <ElTooltip
          content="查看源代码"
          :show-arrow="false"
          :trigger="['hover', 'focus']"
          :trigger-keys="[]">
          <button
            ref="sourceCodeRef"
            :aria-label="sourceVisible ? '隐藏源代码' : '查看源代码'"
            class="reset-btn el-icon op-btn"
            @click="toggleSourceVisible()">
            <ElIcon :size="16">
              <i-ri-code-line />
            </ElIcon>
          </button>
        </ElTooltip>
      </div>

      <ElCollapseTransition>
        <SourceCode
          v-show="sourceVisible"
          :source="source" />
      </ElCollapseTransition>

      <Transition name="el-fade-in-linear">
        <div
          v-show="sourceVisible"
          class="example-float-control"
          tabindex="0"
          role="button"
          @click="toggleSourceVisible(false)"
          @keydown="onSourceVisibleKeydown">
          <ElIcon :size="16">
            <CaretTop />
          </ElIcon>
          <span>隐藏源代码</span>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref, toRef } from 'vue';
import { isClient, useClipboard, useToggle } from '@vueuse/core';

// @ts-ignore
import { CaretTop } from '@element-plus/icons-vue';

import Example from './vp-example.vue';
import SourceCode from './vp-source-code.vue';

const props = withDefaults(
  defineProps<{
    /**
     * 所有demo组件源文件
     * 暂时没用
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
  console.log(props.demos);

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
  source: decodeURIComponent(props.rawSource),
  read: false
});
/**
 * @description 复制源代码
 */
const copyCode = async () => {
  const { $message } = vm.appContext.config.globalProperties;
  if (!isSupported) {
    $message.error('复制失败');
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

<style scoped lang="less">
.example {
  border: 1px solid var(--border-color);
  border-radius: var(--el-border-radius-base);

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
