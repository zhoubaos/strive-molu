import { Scheduler, Task } from './typing';

/**
 * 用于自定义执行任务时机，以及每次任务执行数量
 * @param tasks
 * @param scheduler 调度器，用于决定任务什么时候执行，
 */
export function performTasks(tasks: Task[], scheduler: Scheduler) {
  if (tasks.length === 0) return;

  let index = 0;
  function _run() {
    scheduler((isGoOn: () => boolean) => {
      // 如果当前帧还有时间再执行
      while (index < tasks.length && isGoOn()) {
        tasks[index++]();
      }

      if (index < tasks.length) {
        _run();
      }
    });
  }

  _run();
}

/**
 * 通过 requestIdleCallback 来控制任务执行
 * @param tasks
 */
export function idlePerformTasks(tasks: Task[]) {
  performTasks(tasks, (chunk) => {
    requestIdleCallback((idle) => {
      chunk(() => idle.timeRemaining() > 0);
    });
  });
}

/**
 * 控制每次执行任务的数量，以及执行的时间
 * @param tasks
 * @param count 并发数量
 * @param delay 每批次任务执行时时间
 */
export function countPerformTasks(tasks: Task[], count: number, delay: number) {
  const scheduler: Scheduler = (chunk) => {
    let index = 0;
    setTimeout(() => {
      chunk(() => index++ < count);
    }, delay);
  };

  performTasks(tasks, scheduler);
}
