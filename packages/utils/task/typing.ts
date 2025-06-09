/**
 * 普通任务函数
 */
export interface Task {
  (...args: any[]): void;
}

/**
 * promise任务函数
 */
export interface PromiseTask {
  (...args: any[]): Promise<any>;
}

// 调度器
export interface Scheduler {
  (chunk: (isGoOn: () => boolean) => void): void;
}
