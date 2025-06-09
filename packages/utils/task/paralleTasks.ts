import { PromiseTask } from './typing';

/**
 * 处理并发任务
 * @param {Function[]} tasks 任务集合
 * @param {Nmuber} paralleCount 最大同时运行并发数量
 */
export default function paralleTask(tasks: PromiseTask[], paralleCount = 2) {
  return new Promise((resolve) => {
    if (tasks.length === 0) {
      resolve(undefined);
      return;
    }

    let nextInd = 0; // 下一个任务索引值
    let finishCount = 0; //完成任务个数

    // 运行任务
    function _run() {
      const task = tasks[nextInd];
      nextInd++;
      task().then(() => {
        finishCount++;
        if (nextInd < tasks.length) {
          _run();
        } else if (finishCount === tasks.length) {
          resolve(undefined);
        }
      });
    }

    for (let ind = 0; ind < paralleCount && ind < tasks.length; ind++) {
      _run();
    }
  });
}
