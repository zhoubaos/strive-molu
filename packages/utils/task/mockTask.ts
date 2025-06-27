import { set } from 'lodash-es';

/**
 * 创建虚拟任务
 * @param {Number} count 任务个数
 * @param {Boolean} sync 是否生成同步任务
 */
export function mockPromiseTasks(count: number, sync = false) {
  // 单个任务
  function _task(ind: number) {
    return new Promise((resolve) => {
      const time = Math.floor(Math.random() * 1000);
      const i = ind + 1;
      sync ? run() : setTimeout(run, time);

      function run() {
        console.log(`任务${i}：开始......结束。耗时${time}ms`);
        resolve(i);
      }
    });
  }

  const tasks = [];
  for (let i = 0; i < count; i++) {
    tasks.push(_task.bind(null, i));
  }
  return tasks;
}
