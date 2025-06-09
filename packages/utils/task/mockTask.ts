/**
 * 创建虚拟任务
 * @param {Number} count 任务个数
 */
export function mockPromiseTasks(count: number) {
  // 单个任务
  function _task(ind: number) {
    return new Promise((resolve) => {
      console.log(`任务${ind + 1}：开始......结束。耗时${Math.floor(Math.random() * 1000)}ms`);
      resolve(ind + 1);
    });
  }

  const tasks = [];
  for (let i = 0; i < count; i++) {
    tasks.push(_task.bind(null, i));
  }
  return tasks;
}
