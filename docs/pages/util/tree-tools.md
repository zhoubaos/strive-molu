---
title: TreeTools
---

# TreeTools

给树型结构扩展属性，方法，便于对其进行操作。

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

### 实例属性

| 名称        | 说明             | 类型                           |
| ----------- | ---------------- | ------------------------------ |
| allIds      | 所有节点id集合   | ^[array]`string[] \| number[]` |
| allLeafIds  | 所有叶子节点集合 | ^[array]`string[] \| number[]` |
| deepLevel   | 最深层级         | number                         |
| sourceTree  | 源数据           | ^[array]`any[]`                |
| idKey       | id属性值         | string                         |
| nameKey     | name属性值       | string                         |
| childrenKey | children属性值   | string                         |

### 实例方法

| 名称              | 说明                                | 类型                                                                      |
| ----------------- | ----------------------------------- | ------------------------------------------------------------------------- |
| addCustomAttr     | 为每个节点设置自定义属性            | ^[function]`(attr: string, value: any) => void`                           |
| getLeafIds        | 获取指定ids的叶子节点id集合         | ^[function]`(ids: Array<string \| number>, tree?: TreeNode[]) => void`    |
| getNodesByLeafIds | 获取叶子节点是指定ids的子集的父节点 | ^[function]`(leafIds: Array<string \|number>, tree?: TreeNode[]) => void` |
| getNodes          | 获取指定ids的节点集合               | ^[function]`(ids: Array<string \| number>, tree?: TreeNode[]) => void`    |
