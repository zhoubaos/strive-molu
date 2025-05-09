---
title: Table
---

# Table 表格

基于ElementPlus二次封装的表格组件，采用js对象配置的方式生成表格。详情配置请参考[El TableColumn](https://element-plus.org/zh-CN/component/table.html#table-column-api)。

:::tip
该组件只对 `el-table-column` 组件常用属性进行了适配，其余属性可能会有bug。
:::

## 基础用法

:::demo 使用 `data` 属用于接收渲染数据，`columns` 来配置表格每一列的属性。当单元格属性值为 `""` 、 `null` 和 `undefined` 时会默认显示 `--` 占位符。
table/basic
:::

## 表格分页

表格分页功能是通过Element Plus的Pination组件实现。

::: demo 通过 `paginationConfig` 属性可以去配置分页组件，具体配置请查看[El Pagination组件](https://element-plus.org/zh-CN/component/pagination.html#%E5%B1%9E%E6%80%A7)，然后通过监听 `pageAndSizeChange` 事件获取当前 `page` 的当前 `size` 。除此之外，可以通过触发组件实例的 `resetPageAndSize` 方法，让 `page` 和 `size` 回到初始状态。
table/paging
:::

:::warning
`paginationConfig` 传入的 `layout` 属性为一个数组，数组可选值为 `Pagination` 组件的 `layout` 的值。
:::

## 自定义占位符

:::demo 可以使用 `placeholder` 来指定占位内容，`empty-values` 指定那些属性值会被占位符替代。
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

:::demo 通过设置 `canCustomColumn` 属性来展示控制自定义列的按钮。
table/custom-column
:::

:::warning
自定义列不能适用于控制有多级表头的表格。
:::

## 属性

| 属性名           | 说明                                                                                                                         | 类型       | 默认值              |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------- |
| data             | 表格数据                                                                                                                     | `any[]`    | []                  |
| columns          | 表格的列配置，详情情况下面                                                                                                   | `Column[]` | []                  |
| total            | 表格数据总数                                                                                                                 | `number`   | 0                   |
| placeholder      | 当属性值满足 emptyValues 时的占位符                                                                                          | `string`   | --                  |
| emptyValues      | 需要被占位的属性值                                                                                                           | `any[]`    | ['',null,undefined] |
| canCustomColumn  | 是否自定义展示的列，为true会显示一个控制自定义类的按钮                                                                       | `boolean`  | false               |
| paginationConfig | 表格分页属性配置，详情请查看[El Pagination组件](https://element-plus.org/zh-CN/component/pagination.html#%E5%B1%9E%E6%80%A7) |            |                     |

### Column属性

以下只列出部分属性，其余属性请参 [El TableColumn](https://element-plus.org/zh-CN/component/table.html#table-column-api)。

| 属性名     | 说明                                                                          | 类型                                 | 默认值 |
| ---------- | ----------------------------------------------------------------------------- | ------------------------------------ | ------ |
| prop       | 和列内容对应的字段名对应                                                      | `string`                             | —      |
| label      | 显示的标题                                                                    | `string`                             | —      |
| isRequired | 在使用自定义列的功能时，该属性用于约束该列能一直可以显示                      | `boolean`                            | false  |
| slots      | 定义表头或单元格插槽名称。title配置表头插槽名称，customRender配置单元格名称。 | `{title:string,customRender:string}` |        |
| children   | 配置多级表头时会使用。                                                        | `Column[]`                           |        |

## 事件

| 事件名               | 说明                                                                                         | 类型     |
| -------------------- | -------------------------------------------------------------------------------------------- | -------- |
| page-and-size-change | 当切换页数和切换每页条数时会触发该事件。当调用 `resetPageAndSize`方法时，第3个参数返回true。 | Function |

:::tip
除了以上事件，还支持[El Table组件](https://element-plus.org/zh-CN/component/table.html#table-%E4%BA%8B%E4%BB%B6)的事件，但不保证所有事件都能正常使用。
:::

## 方法

| 方法名           | 说明                                                                              | 类型     |
| ---------------- | --------------------------------------------------------------------------------- | -------- |
| resetPageAndSize | 让分页器重置页数和每页条数，且`page-and-size-change` 方法返回的第3个参数为 `true` | Function |

:::tip
除了以上方法，还支持[El Table组件](https://element-plus.org/zh-CN/component/table.html#table-exposes)的方法，但不保证所有方法都能正常使用。
:::
