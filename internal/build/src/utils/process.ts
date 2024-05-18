import { spawn } from 'child_process'; // 用于创建子进程模块 spawn 用于启动新的进程，并与其进行交互
import chalk from 'chalk';
import consola from 'consola';
import { projRoot } from '@strive-molu/build-utils';
/**
 * 创建一个子进程执行终端shell命令
 * @param command 命令
 * @param cwd 执行目录
 * @returns
 */
export const run = async (command: string, cwd: string = projRoot) =>
  new Promise<void>((resolve, reject) => {
    const [cmd, ...args] = command.split(' ');
    // 开始进程
    consola.info(`run: ${chalk.green(`${cmd} ${args.join(' ')}`)}`);
    /**
     * cmd: 要运行的命令
     * args: 传递给 cmd 的参数列表
     */
    const app = spawn(cmd, args, {
      cwd, // 子进程的当前工作目录
      stdio: 'inherit', // 子进程会继承父进程的标准输入、输出和错误流
      shell: process.platform === 'win32' // 是否使用 shell脚本去执行命令
    });

    const onProcessExit = () => app.kill('SIGHUP');

    app.on('close', (code) => {
      process.removeListener('exit', onProcessExit);

      if (code === 0) resolve();
      else reject(new Error(`Command failed. \n Command: ${command} \n Code: ${code}`));
    });
    process.on('exit', onProcessExit);
  });
