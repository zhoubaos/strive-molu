import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
// 指定的文件路径写入json文件
export const writeJson = (path: string, data: any, spaces = 0) =>
  writeFile(path, JSON.stringify(data, undefined, spaces), 'utf-8');

// 确定路径是否存在,不存在则创建
export const ensureDir = async (path: string) => {
  if (!existsSync(path)) await mkdir(path, { recursive: true });
};
