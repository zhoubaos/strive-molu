import path from 'path';
import fs from 'fs';
// @ts-ignore
import MarkdownIt from 'markdown-it';
// @ts-ignore
import mdContainer from 'markdown-it-container';
import { highlight } from '../utils/highlight';
import { docRoot } from '@strive-molu/build-utils';
// @ts-ignore
import type Token from 'markdown-it/lib/token';
// @ts-ignore
import type Renderer from 'markdown-it/lib/renderer';
import consola from 'consola';

const localMd = MarkdownIt();
const scriptSetupRE = /<\s*script[^>]*\bsetup\b[^>]*/;

interface ContainerOpts {
  marker?: string | undefined;

  validate?(params: string): boolean;

  render?(
    tokens: Token[],
    index: number,
    options: any,
    env: any,
    self: Renderer
  ): string;
}

export const mdPlugin = (md: MarkdownIt) => {
  md.use(mdContainer, 'demo', {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s+(.*)$/);
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : '';
        const sourceFileToken = tokens[idx + 2];
        let source = '';

        // demo文件基于examples目录的路径
        const sourceFile = sourceFileToken.children?.[0].content ?? '';
        if (sourceFileToken.type === 'inline') {
          // 读取示列代码文件
          source = fs.readFileSync(
            path.resolve(docRoot, 'examples', `${sourceFile}.vue`),
            'utf-8'
          );
        }

        if (!source) throw new Error(`源文件不正确: ${sourceFile}`);

        // opening tag
        return `<Demo
                  :demos="demos" 
                  source="${encodeURIComponent(highlight(source, 'vue'))}"
                  path="${sourceFile}"
                  rawSource="${encodeURIComponent(source)}"
                  description="${encodeURIComponent(localMd.render(description))}">`;
      } else {
        // closing tag
        return '</Demo>\n';
      }
    }
  } as ContainerOpts);
};
