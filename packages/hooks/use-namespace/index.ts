import { computed, getCurrentInstance, inject, ref, unref } from 'vue';

import type { InjectionKey, Ref } from 'vue';

// 组件类名前缀
export const defaultNamespace = 'sm';
// 状态前缀
const statePrefix = 'is-';
/**
 * 生成组件类名
 * @param namespace 命名空间 eg：sm
 * @param block 组件类名 eg: button
 * @param blockSuffix 组件类名后缀 eg: button-icon
 * @param element 子元素类名 eg: button__icon
 * @param modifier 修饰符类名 eg: button--primary
 */
const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element?: string,
  modifier?: string
) => {
  let cls = `${namespace}-${block}`;
  if (blockSuffix) {
    cls += `-${blockSuffix}`;
  }
  if (element) {
    cls += `__${element}`;
  }
  if (modifier) {
    cls += `--${modifier}`;
  }
  return cls;
};

export const namespaceContextKey: InjectionKey<Ref<string | undefined>> =
  Symbol('namespaceContextKey');

/**
 * 获取参数传入|注入|默认的命名空间
 * @param namespaceOverrides
 * @returns
 */
export const useGetDerivedNamespace = (
  namespaceOverrides?: Ref<string | undefined>
) => {
  const derivedNamespace =
    namespaceOverrides ||
    (getCurrentInstance()
      ? inject(namespaceContextKey, ref(defaultNamespace))
      : ref(defaultNamespace));
  const namespace = computed(() => {
    return unref(derivedNamespace) || defaultNamespace;
  });
  return namespace;
};
/**
 * 生成组件类名
 * @param block 组件类名
 * @param namespaceOverrides 重写命名空间
 * @returns
 */
export const useNamespace = (
  block: string,
  namespaceOverrides?: Ref<string | undefined>
) => {
  const namespace = useGetDerivedNamespace(namespaceOverrides);
  // 获取组件后缀名
  const b = (blockSuffix = '') =>
    _bem(namespace.value, block, blockSuffix, '', '');
  // 获取组件子元素名
  const e = (element?: string) =>
    element ? _bem(namespace.value, block, '', element, '') : '';
  // 获取组件修饰符名
  const m = (modifier?: string) =>
    modifier ? _bem(namespace.value, block, '', '', modifier) : '';
  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element
      ? _bem(namespace.value, block, blockSuffix, element, '')
      : '';
  const em = (element?: string, modifier?: string) =>
    element && modifier
      ? _bem(namespace.value, block, '', element, modifier)
      : '';
  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier
      ? _bem(namespace.value, block, blockSuffix, '', modifier)
      : '';
  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier
      ? _bem(namespace.value, block, blockSuffix, element, modifier)
      : '';
  // 获取状态类名
  const is: {
    (name: string, state: boolean | undefined): string;
    (name: string): string;
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0]! : true;
    return name && state ? `${statePrefix}${name}` : '';
  };

  // 获取css变量
  // --sm-xxx: value;
  const cssVar = (object: Record<string, string>) => {
    const styles: Record<string, string> = {};
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${key}`] = object[key];
      }
    }
    return styles;
  };
  // with block
  const cssVarBlock = (object: Record<string, string>) => {
    const styles: Record<string, string> = {};
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${block}-${key}`] = object[key];
      }
    }
    return styles;
  };

  const cssVarName = (name: string) => `--${namespace.value}-${name}`;
  const cssVarBlockName = (name: string) =>
    `--${namespace.value}-${block}-${name}`;

  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
    // css
    cssVar,
    cssVarName,
    cssVarBlock,
    cssVarBlockName
  };
};

export type UseNamespaceReturn = ReturnType<typeof useNamespace>;
