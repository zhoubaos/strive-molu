---
title: lazy-picture
---

# LazyPicture 懒加载图片

实现网络图片在屏幕可视区内进行懒加载。

## 基础用法

:::demo 使用 `url` 属性来指定远程图片地址。
lazy-picture/basic
:::

## API

### 属性

| 属性名     | 说明                                                                                                                                                                                                                     | 类型   | 默认值  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ | ------- |
| url        | 远程图片链接                                                                                                                                                                                                             | string | —       |
| loadingUrl | 图片加载时占位图                                                                                                                                                                                                         | string | ''      |
| objectFit  | 图片[object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit#%E5%B0%9D%E8%AF%95%E4%B8%80%E4%B8%8Bhttps://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit#%E5%B0%9D%E8%AF%95%E4%B8%80%E4%B8%8B)属性值 | string | contain |
