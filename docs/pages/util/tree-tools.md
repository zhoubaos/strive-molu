---
title: TreeTools
---

# TreeTools相关

给`Tree`结构扩展属性，方法，便于对其进行操作。

## 基础用法

可以使用`for...of`、`for`等方式直接对实例对象进行遍历操作。

<<< @/examples/util/tree/basic.ts

## Attrs

### 节点属性

| 名称    | 说明                         | 类型                           |
| ------- | ---------------------------- | ------------------------------ |
| level   | 当前节点层级                 | number                         |
| leafIds | 当前节点的所有叶子节点ID列表 | ^[array]`string[] \| number[]` |
| parent  | 当前节点的父节点             | object                         |

### 实例方法

| 名称          | 说明                     | 类型                                            |
| ------------- | ------------------------ | ----------------------------------------------- |
| addCustomAttr | 为每个节点设置自定义属性 | ^[function]`(attr: string, value: any) => void` |
| getAllIds     | 获取所有节点ID列表       | ^[function]`() => any[]`                        |
| getAllLeafIds | 获取所有叶子节点ID列表   | ^[function]`() => any[]`                        |
