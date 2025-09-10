---
title: Table
---

# Table 表格

基于ElementPlus二次封装的表格组件，采用js对象配置的方式生成表格。详情配置请参考[El TableColumn](https://element-plus.org/zh-CN/component/table.html#table-column-api)。

:::warning
该组件只对 `el-table-column` 组件常用属性进行了适配，使用其他属性可能会有问题。
:::

## 基础用法

:::demo 使用 `data` 属用于接收渲染数据，`columns` 来配置表格每一列的属性。
table/basic
:::

## 表格分页

表格分页功能是通过Element Plus的Pination组件实现。

::: demo 通过 `paginationConfig` 属性可以去配置分页组件，具体配置请查看[El Pagination组件](https://element-plus.org/zh-CN/component/pagination.html#%E5%B1%9E%E6%80%A7)。可以通过触发组件实例的 `resetPageAndSize` 方法，让 `page` 和 `page-size` 回到初始状态。
table/paging
:::

:::tip
如果初始的`page-size`不在`paginationConfig.pages` 数组中时，会默认在前面插入`page-size`的值。
:::

:::warning
`paginationConfig` 传入的 `layout` 属性为一个数组，数组可选值为 `Pagination` 组件的 `layout` 的值。
:::

## 占位符

:::demo 当单元格属性值为 `""` 、 `null` 或 `undefined` 时会默认显示 `--` 占位符。可以使用 `placeholder` 来指定占位内容，`empty-values` 指定那些属性值会被占位符替代。
table/empty
:::

:::tip
该功能是通过每一列配置加上table-column的 `formatter` 属性实现。
:::

## 自定义单元格或表头

:::demo 在表格配置属性 `columns` 中设置 `slots` 属性，其值包括 `title` 和 `customRender`，分别用来自定义表头和单元格内容。
table/slot
:::

## 自定义列

:::warning
自定义列不能控制多级表头。
:::

:::demo 通过设置 `canCustomColumn` 属性来展示控制自定义列的按钮。
table/custom-column
:::

## 单选

:::demo 表格配置项的`type`属性设置为`single-select`来启用单选功能。通过监听`current-change`事件获取当前选中行数据。
table/single-select
:::

## API

### 属性

:::tip
除了以下属性，同时支持[ElTable](https://element-plus.org/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7)的属性。
:::

| 名称                        | 说明                                                                                                                       | 类型                        | 默认值              |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ------------------- |
| data                        | 表格数据                                                                                                                   | ^[array]`any[]`             | []                  |
| columns                     | 表格的列配置，详情情况下面                                                                                                 | ^[array]`Column[]`          | []                  |
| total                       | 表格数据总数                                                                                                               | `number`                    | 0                   |
| page / v-model:page         | 当前页                                                                                                                     | `number`                    | —                   |
| page-size v-model:page-size | 分页条数                                                                                                                   | `number`                    | —                   |
| hideOnSinglePage            | 是否在只有一页隐藏分页组件                                                                                                 | `boolen`                    | false               |
| placeholder                 | 当属性值满足 emptyValues 时的占位符                                                                                        | `string`                    | --                  |
| emptyValues                 | 需要被占位的属性值                                                                                                         | ^[array]`any[]`             | ['',null,undefined] |
| canCustomColumn             | 是否自定义展示的列，为true会显示一个控制自定义类的按钮                                                                     | `boolean`                   | false               |
| paginationConfig            | 表格分页属性配置，详情查看[El Pagination组件](https://element-plus.org/zh-CN/component/pagination.html#%E5%B1%9E%E6%80%A7) | ^[object]`PaginationConfig` | —                   |
| round                       | 是否为圆角                                                                                                                 | `boolean`                   | false               |

#### Column属性

:::tip
除了以下属性，其余属性请参考[ElTableColumn](https://element-plus.org/zh-CN/component/table.html#table-column-api)。
:::

| 属性名     | 说明                                                                          | 类型               | 默认值 |
| ---------- | ----------------------------------------------------------------------------- | ------------------ | ------ |
| prop       | 和列内容对应的字段名对应                                                      | `string`           | —      |
| label      | 显示的标题                                                                    | `string`           | —      |
| isRequired | 在使用自定义列的功能时，该属性用于约束该列能一直可以显示                      | `boolean`          | false  |
| slots      | 定义表头或单元格插槽名称。title配置表头插槽名称，customRender配置单元格名称。 | ^[object]`Slots`   | —      |
| children   | 配置多级表头时会使用。                                                        | ^[array]`Column[]` | —      |

### 事件

:::tip
除了以下事件，还支持[ElTable](https://element-plus.org/zh-CN/component/table.html#table-%E4%BA%8B%E4%BB%B6)的事件，但不保证所有事件都能正常使用。
:::

| 名称                 | 说明                                                                                         | 类型                                                                   |
| -------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| page-and-size-change | 当切换页数和切换每页条数时会触发该事件。当调用 `resetPageAndSize`方法时，第3个参数返回true。 | ^[Function]`(page: number, pageSize: number, isReset: boolen) => void` |

### 方法

:::tip
除了以下方法，还支持[ElTable](https://element-plus.org/zh-CN/component/table.html#table-exposes)的方法，但不保证所有方法都能正常使用。
:::

| 名称             | 说明                                                                              | 类型     |
| ---------------- | --------------------------------------------------------------------------------- | -------- |
| resetPageAndSize | 让分页器重置页数和每页条数，且`page-and-size-change` 方法返回的第3个参数为 `true` | Function |
