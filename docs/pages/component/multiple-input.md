---
title: multiple-input
---

# MultipleInput 多行输入

支持从剪切板粘贴的多行文本输入组件。

## 基础用法

:::demo 通过`Enter`键向下插入一行。
multiple-input/basic
:::

## 验证

通过`validate-list`属性设置验证规则。

:::demo
multiple-input/validate
:::

## API

### 属性

| 名称                      | 说明           | 类型                       | 默认值                                                                                   |
| ----------------------- | ------------ | ------------------------ | ------------------------------------------------------------------------------------- |
| title                   | 标题           | `string`                 | —                                                                                     |
| defaultTexts            | 默认文本         | ^[array]`string[]`       | []                                                                                    |
| width                   | 宽度           | `string`                 | —                                                                                     |
| max                     | 最大输入行数       | `number`                 | Infinity                                                                              |
| showMax                 | 是否显示最大行数     | `boolean`                | true                                                                                  |
| tips                    | 提示信息         | `string`                 | —                                                                                     |
| placeholder             | 占位符          | `string`                 | 请输入内容                                                                                 |
| supporOutSort           | 是否支持乱序       | `boolean`                | false                                                                                 |
| validateList            | 输入内容验证规则列表   | ^[array]`ValidateItem[]` | ^[array]`[{validate: (val: string) => {return val.length >= 1;},errLabel: '内容不能为空'}]` |
| parseTextsWithClipboard | 解析千机变内容为多行文本 | `function`               | ^[function]`(val: string) => val.split('\n')`                                         |

### 方法

| 名称            | 说明          | 类型                                                       |
| ------------- | ----------- | -------------------------------------------------------- |
| getInputTexts | 获取当然输入的文本内容 | ^[function]`() => {isValid: boolen; textList: string[]}` |
| clear         | 清空输入内容      | ^[function]`() => void`                                  |

### 插槽

| 名称    | 说明  |
| ----- | --- |
| title | 标题  |
