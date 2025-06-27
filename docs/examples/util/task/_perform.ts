import { idlePerformTasks, countPerformTasks, mockPromiseTasks } from '@strive-molu/utils';

// 基于 requestIdleCallback 来控制任务执行
idlePerformTasks(mockPromiseTasks(10, true));

// 控制每次执行任务的数量，以及任务执行间隔
countPerformTasks(mockPromiseTasks(10, true), 5, 1000);
