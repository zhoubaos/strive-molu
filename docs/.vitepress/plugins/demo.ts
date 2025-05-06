import { MarkdownRenderer } from 'vitepress';
import path from 'path';
import fs from 'fs';
import { docRoot } from '@strive-molu/build-utils';

interface ContainerOpts {
  marker?: string | undefined;
  validate?(params: string): boolean;
  render?: MarkdownRenderer['renderer']['rules']['container'];
}

function createDemoContainer(md: MarkdownRenderer): ContainerOpts {
  return {
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
                      source="${encodeURIComponent(md.render(`\`\`\` vue\n${source}\`\`\``))}"
                      path="${sourceFile}"
                      rawSource="${encodeURIComponent(source)}"
                      description="${encodeURIComponent(md.render(description))}">`;
      } else {
        // closing tag
        return '</Demo>\n';
      }
    }
  };
}

export default createDemoContainer;
