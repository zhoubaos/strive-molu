import fs from 'fs';
import path from 'path';
import fsGlob from 'fast-glob';
import type { Plugin } from 'vite';
import { docRoot, docsDirName, projRoot } from '@strive-molu/build-utils';
import { REPO_BRANCH, REPO_PATH } from '@strive-molu/build-constants';

type Append = Record<'headers' | 'footers' | 'scriptSetups', string[]>;

let compPaths: string[];
export function MarkdownTransform(): Plugin {
  return {
    name: 'md-transform',
    enforce: 'pre',
    async buildStart() {
      const pattern = `pages/component`;

      compPaths = await fsGlob(pattern, {
        cwd: docRoot,
        absolute: true,
        onlyDirectories: true
      });
    },
    async transform(code, id) {
      if (!id.endsWith('.md') || id.includes('docs/index.md')) return;
      const componentId = path.basename(id, '.md');
      const append: Append = {
        headers: [],
        footers: [],
        scriptSetups: [`const demos = import.meta.glob('../../examples/${componentId}/*.vue',{eager:true})`]
      };

      code = transformVpScriptSetup(code, append);

      if (compPaths.some((compPath) => id.startsWith(compPath))) {
        // code = transformComponentMarkdown(id, componentId, code, append);
      }

      return combineMarkdown(code, [combineScriptSetup(append.scriptSetups), ...append.headers], append.footers);
    }
  };
}
// 匹配包含 setup 属性的 <vp-script> 标签及其内容
const vpScriptSetupRE = /<vp-script\s(.*\s)?setup(\s.*)?>([\s\S]*)<\/vp-script>/;
const transformVpScriptSetup = (code: string, append: Append) => {
  const matches = code.match(vpScriptSetupRE);
  if (matches) code = code.replace(matches[0], '');
  const scriptSetup = matches?.[3] ?? '';
  if (scriptSetup) append.scriptSetups.push(scriptSetup);
  return code;
};

const combineScriptSetup = (codes: string[]) =>
  `\n<script setup>
${codes.join('\n')}
</script>
`;

const combineMarkdown = (code: string, headers: string[], footers: string[]) => {
  const frontmatterEnds = code.indexOf('---\n\n');
  const firstHeader = code.search(/\n#{1,6}\s.+/);
  const sliceIndex = firstHeader < 0 ? (frontmatterEnds < 0 ? 0 : frontmatterEnds + 4) : firstHeader;

  if (headers.length > 0) code = code.slice(0, sliceIndex) + headers.join('\n') + code.slice(sliceIndex);
  code += footers.join('\n');

  return `${code}\n`;
};

const GITHUB_BLOB_URL = `https://github.com/${REPO_PATH}/blob/${REPO_BRANCH}`;
const GITHUB_TREE_URL = `https://github.com/${REPO_PATH}/tree/${REPO_BRANCH}`;
const transformComponentMarkdown = (id: string, componentId: string, code: string, append: Append) => {
  // const lang = getLang(id);
  const docUrl = `${GITHUB_BLOB_URL}/${docsDirName}/en-US/component/${componentId}.md`;
  const componentUrl = `${GITHUB_TREE_URL}/packages/components/${componentId}`;
  const componentPath = path.resolve(projRoot, `packages/components/${componentId}`);
  const isComponent = fs.existsSync(componentPath);

  // const links = [[footerLocale[lang].docs, docUrl]];
  // if (isComponent) links.unshift([footerLocale[lang].component, componentUrl]);
  //   const linksText = links
  //     .filter((i) => i)
  //     .map(([text, link]) => `[${text}](${link})`)
  //     .join(' • ');

  // const sourceSection = `
  // ## ${footerLocale[lang].source}

  // ${linksText}`;

  // const contributorsSection = `
  // ## ${footerLocale[lang].contributors}

  // <Contributors id="${componentId}" />`;

  // append.footers.push(sourceSection, isComponent ? contributorsSection : '');

  return code;
};
