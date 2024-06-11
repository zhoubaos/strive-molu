# Table 表格

基于ElementPlus二次封装的表格组件，采用js对象配置的方式生成表格。详情配置请参考[el-table-tolumn组件属性](https://element-plus.org/zh-CN/component/table.html#table-column-api)。

:::warning
该组件只对`el-table-column`组件常用属性进行了适配。
:::

## 基础用法

:::demo 使用`data`属用于接收渲染数据，`columns`来配置表格每一列的属性。
table/basic
:::

## 自定义单元格或表头

:::demo 在表格配置属性`columns`中设置`slots`属性，其值包括`title`和`customRender`，分别用来自定义表头和单元格内容。
table/slot
:::
