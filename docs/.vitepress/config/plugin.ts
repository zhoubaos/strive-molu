// @ts-ignore
import mdContainer from 'markdown-it-container';
import { MarkdownRenderer } from 'vitepress';
import createDemoContainer from '../plugins/demo';
import tooltip from '../plugins/tooltip';
import tableWrapper from '../plugins/table-wrapper';

export const mdPlugin = (md: MarkdownRenderer) => {
  md.use(tableWrapper);
  md.use(tooltip);
  md.use(mdContainer, 'demo', createDemoContainer(md));
};
