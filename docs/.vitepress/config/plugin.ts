// @ts-ignore
import mdContainer from 'markdown-it-container';
import createDemoContainer from '../plugins/demo';
import { MarkdownRenderer } from 'vitepress';
import tableWrapper from '../plugins/table-wrapper';

export const mdPlugin = (md: MarkdownRenderer) => {
  md.use(tableWrapper), md.use(mdContainer, 'demo', createDemoContainer(md));
};
