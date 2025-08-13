import process from 'process';
import { consola } from 'consola';
// 发生错误时打印错误信息并退出进程
export function errorAndExit(err: Error): never {
  consola.error(err);
  process.exit(1);
}
