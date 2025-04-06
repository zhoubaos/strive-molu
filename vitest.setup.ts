import { config } from '@vue/test-utils';
import { vi } from 'vitest';
// 不支持原生ResizeObserver API 的浏览器中提供对元素尺寸变化观察的功能
// import ResizeObserver from 'resize-observer-polyfill'

// vi.stubGlobal('ResizeObserver', ResizeObserver)

config.global.stubs = {};
