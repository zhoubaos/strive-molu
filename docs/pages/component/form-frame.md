---
title: form-frame
---

# FormFrame El表单lable框架

给`element-plus`的表单组件添加label框架。

## 基础

:::demo
form-frame/basic
:::

## Select类型

:::warning
`select`类型时，必须设置`label-width`属性。
:::

:::demo 如果需要给`select`类型的`el-select`组件添加属性，可以直接写在组件上，会进行透传。可以通过`disabled`属性表单组件。
form-frame/select
:::

## API

### 属性

| 名称        | 说明                                           | 类型                                                        | 默认值  |
| ----------- | ---------------------------------------------- | ----------------------------------------------------------- | ------- |
| label       | label名称。在`label-type`值为`default`时有效。 | string                                                      | —       |
| labelWidth  | label宽度。当`label-type`值为`select`时必传。  | number                                                      | —       |
| width       | 宽度                                           | number                                                      | —       |
| disabled    | 是否禁用                                       | boolean                                                     | false   |
| labelType   | label类型。                                    | ^[string]`'default' \| 'select'`                            | default |
| labelOption | `label-type`值为`select`时的选项配置。         | ^[array]`Array<{ label: string; value: string \| number }>` | []      |
| labelProps  | `label-type`值为`select`时`props`配置。        | object                                                      | —       |
