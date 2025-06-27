import { performTasks, idlePerformTasks, countPerformTasks, mockPromiseTasks } from '@strive-molu/utils';

// 指定任务在1s后执行
performTasks(mockPromiseTasks(10, true), (chunk) => {
  setTimeout(() => {
    chunk(() => true);
  }, 1000);
});

// 基于 requestIdleCallback 来控制任务执行
idlePerformTasks(mockPromiseTasks(10, true));

// 基于 performTasks 的实现，控制每次执行任务的数量，以及任务执行间隔
countPerformTasks(mockPromiseTasks(10, true), 5, 1000);
