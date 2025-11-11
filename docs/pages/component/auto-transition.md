---
title: auto-transition
---

# AutoTransition 自动过渡

可以过渡容器内元素的最大宽度或高度

## 基础

:::demo 通过传入`timingFunction`来指定过渡效果函数
auto-transition/basic
:::

## 水平过渡

:::demo 通过`direction`属性来设置水平或垂直方向过渡
auto-transition/horizontal
:::

## API

### 属性

| 属性           | 说明                                                                                                             | 类型                            | 默认值        |
| -------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------- | ------------- |
| timingFunction | [过渡效果函数](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/transition-timing-function) | `string`                        | 'ease-in-out' |
| direction      | 设置过渡方向                                                                                                     | ^[enum]`vertical \| horizontal` | 'vertical'    |
