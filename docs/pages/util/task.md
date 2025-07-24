---
title: ParalleTask
---

# Task

用于执行任务的相关函数。

## paralleTask

用于并发执行异步任务，可以指定并发数量，返回一个`promise`对象。
:::tip
`mockPromiseTasks` 函数用于生成一组异步任务
:::

<<< @/examples/util/task/paralle.ts

## performTask

自定义执行任务时机函数。

<<< @/examples/util/task/perform.ts

以下函数基于`performTask`实现。

<<< @/examples/util/task/perform01.ts

## 形参

### paralleTask

| 名称         | 说明                 | 类型                         | 默认值 |
| ------------ | -------------------- | ---------------------------- | ------ |
| tasks        | 异步任务列表         | ^[array]`Array<PromiseTask>` | —      |
| paralleCount | 同时执行的最大任务数 | number                       | 2      |

### performTask

| 名称      | 说明                 | 类型                   | 默认值 |
| --------- | -------------------- | ---------------------- | ------ |
| tasks     | 异步任务列表         | ^[array]`Array<Task>`  | —      |
| scheduler | 同时执行的最大任务数 | ^[function]`Scheduler` | —      |

### idlePerformTasks

| 名称  | 说明         | 类型                  | 默认值 |
| ----- | ------------ | --------------------- | ------ |
| tasks | 异步任务列表 | ^[array]`Array<Task>` | —      |

### countPerformTasks

| 名称  | 说明                 | 类型                  | 默认值 |
| ----- | -------------------- | --------------------- | ------ |
| tasks | 异步任务列表         | ^[array]`Array<Task>` | —      |
| count | 同时执行的最大任务数 | number                | —      |
| delay | 每批次任务执行时时间 | number                | —      |

## TS 类型

::: details 点我查看代码

```ts
interface Task {
  (...args: any[]): void;
}

interface PromiseTask {
  (...args: any[]): Promise<any>;
}

interface Scheduler {
  (chunk: (isGoOn: () => boolean) => void): void;
}
```

:::
