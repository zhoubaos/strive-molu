import { performTasks, idlePerformTasks, countPerformTasks, mockPromiseTasks } from '@strive-molu/utils';

// 指定任务在1s后执行
performTasks(mockPromiseTasks(10, true), (chunk) => {
  setTimeout(() => {
    chunk(() => true);
  }, 1000);
});
