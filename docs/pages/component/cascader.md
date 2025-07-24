---
title: cascader
---

# Cascader 级联选择器

支持展示标题的级联选择器。

## 基础

:::demo 通过`nodeProps.titles`属性设置每一列标题。
cascader/basic
:::

## 返回ID策略

:::demo 通过`nodeProps.checkStrategy`属性设置返回ID策略。
cascader/id-strategy
:::

## API

### 属性

| 名称         | 说明                                        | 类型                   | 默认值  |
| ------------ | ------------------------------------------- | ---------------------- | ------- |
| tree         | 配置项                                      | ^[array]`any[]`        | —       |
| width        | 宽度                                        | string                 | 100%    |
| maxLevel     | 最大展示层级                                | number                 | 3       |
| showCheckbox | 是否显示全选框                              | boolean                | true    |
| nodeProps    | 节点属性配置，可以查看下面的`NodeProps`配置 | ^[object]`'NodeProps'` | default |

### NodeProps

| 名称          | 说明                                                                                                                                         | 类型                                  | 默认值   |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | -------- |
| id            | 配置项的id属性名                                                                                                                             | string                                | id       |
| name          | 配置项的name属性名                                                                                                                           | string                                | name     |
| children      | 配置项的children属性名                                                                                                                       | string                                | children |
| titles        | 列的标题                                                                                                                                     | ^[array]`string[]`                    | []       |
| checkStrategy | 选择的id策略。all：返回选择节点的id；parent：返回选择节点中是父节点的id，如果叶子节点没有父节点选中，就返回叶子节点；child：只返回叶子节点id | ^[enum]`'all' \| 'parent' \| 'child'` | all      |
