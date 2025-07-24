import { paralleTask, mockPromiseTasks } from '@strive-molu/utils';

// 默认并发数为2
paralleTask(mockPromiseTasks(4)).then(() => {
  console.log('所有任务执行完毕');
});

// 指定并发数
paralleTask(mockPromiseTasks(10), 4).then(() => {
  console.log('所有任务执行完毕');
});
