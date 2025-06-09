import { TreeTools } from 'strive-molu';
import sourceTree from './sourceTree';

const treeTools = new TreeTools(sourceTree);

for (const node of treeTools) {
  console.log('==Node==', node);
}

// 添加自定义属性
treeTools.addCustomAttr('selected', false);
