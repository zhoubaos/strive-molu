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

## 扩展快捷按钮

通过`extend-quick-actions`属性扩展快捷操作按钮。
:::demo
multiple-input/extend-actions
:::

## API

### 属性

| 名称                    | 说明                 | 类型                       | 默认值                                                                                      |
| ----------------------- | -------------------- | -------------------------- | ------------------------------------------------------------------------------------------- |
| title                   | 标题                 | `string`                   | —                                                                                           |
| defaultTexts            | 默认文本             | ^[array]`string[]`         | []                                                                                          |
| width                   | 宽度                 | `string`                   | —                                                                                           |
| max                     | 最大输入行数         | `number`                   | Infinity                                                                                    |
| showMax                 | 是否显示最大行数     | `boolean`                  | true                                                                                        |
| tip                     | 提示信息             | `string`                   | —                                                                                           |
| placeholder             | 占位符               | `string`                   | 请粘贴或输入，回车可换行                                                                    |
| supporOutSort           | 是否支持乱序         | `boolean`                  | false                                                                                       |
| disabled                | 是否禁用             | `boolean`                  | false                                                                                       |
| validateList            | 输入内容验证规则列表 | ^[array]`ValidateItem[]`   | ^[array]`[{validate: (val: string) => {return val.length >= 1;},errLabel: '内容不能为空'}]` |
| parseTextsWithClipboard | 解析粘贴板内容       | `function`                 | ^[function]`(val: string) => val.split('\n')`                                               |
| extendQuickActions      | 扩展快捷操作按钮     | ^[array]`QuickBtnConfig[]` | []                                                                                          |

### 方法

| 名称                 | 说明                   | 类型                                                     |
| -------------------- | ---------------------- | -------------------------------------------------------- |
| getInputTexts        | 获取当然输入的文本内容 | ^[function]`() => {isValid: boolen; textList: string[]}` |
| setDefaultInputTexts | 设置默认文本           | ^[function]`(textList: string[]) => void`                |
| clear                | 清空输入内容           | ^[function]`() => void`                                  |

### 插槽

| 名称  | 说明 |
| ----- | ---- |
| title | 标题 |

## TS 类型

::: details 点我查看代码

```ts
// 输入项配置
interface InputItem {
  id: number; // 唯一表示
  value: string;
  validate: boolean; // 验证状态
  el: any; // el实例
}

// 输入项验证配置
interface ValidateItem {
  /**
   * @desc 自定义验证的方法
   * @param text 当前输入框的值
   * @param otherTexts 其他输入框非空值
   * @param before 当前输入框之前的文本
   * @param after 当前输入框之后的文本
   * @example
   *
   * // 验证输入文本的长度是否在5 ~ 55 之间
   * validate(text, otherTexts) {
   *    return text.trim().length >=5 && text.trim().length <=55
   * }
   */
  validate: (text: string, otherTexts: string[], before: string[], after: string[]) => boolean;
  /**
   * @desc 用于在输入文本不能通过校验函数时，给出的提示
   * @example 以下标题内容只能在5~55字符之间
   */
  errLabel: string; //校验失败文本
  /**
   * @desc 排除源文本
   * @default false
   */
  excludeSource?: boolean;
}

// 快速按钮配置
interface QuickBtnConfig {
  /**
   * @desc 快速按钮名称
   */
  name: string;
  /**
   * 处理当前输入框列表
   * @param inputList 当前输入框列表
   */
  handleCallback: (inputList: InputItem[]) => InputItem[];
}
```

:::
