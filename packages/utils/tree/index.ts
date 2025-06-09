import { debugWarn } from '../error';

interface TreeProps {
  id?: string;
  name?: string;
  children?: string;
}

type SourceTree = Array<{ [key: string]: any }>;

interface TreeNode {
  [key: string]: any;
  /**
   * 节点的层级
   */
  level: number;
  /**
   * 节点的叶子节点id
   */
  leafIds: string[] | number[];
  /**
   * 节点的父节点
   */
  parent: TreeNode | null;
}

type CallbackFn<U> = (value: TreeNode, index: number, array: TreeNode[]) => U;

/**
 * @desc Tree工具类
 */
export class TreeTools {
  private _tree: TreeNode[] = [];

  private _props: Required<TreeProps> = {
    id: 'id',
    name: 'name',
    children: 'children'
  };

  public sourceTree: SourceTree = [];

  /**
   * 迭代生成器
   * 用于进行Array数据结构遍历使用
   * @example
   * let tree = new TreeTools(treeData);
   * for (let item of tree) {}
   */
  private *[Symbol.iterator]() {
    yield* this._tree;
  }

  public map<U>(...args: [CallbackFn<U>, any?]) {
    return Array.prototype.map.apply(this._tree, args);
  }
  public filter<U>(...args: [CallbackFn<U>, any?]) {
    return Array.prototype.filter.apply(this._tree, args);
  }

  constructor(tree: SourceTree, props?: TreeProps) {
    props && (this._props = Object.assign(this._props, props));
    if (!this._validateTree(tree)) return;
    this.sourceTree = tree;
    this._init(tree);
  }

  /**
   * 验证tree结构是否正确
   */
  private _validateTree(tree: SourceTree) {
    const { id, name } = this._props;
    let flag = true;
    flag = tree.every((item) => item[id] && item[name]);

    !flag && debugWarn('TreeTools', 'tree结构不正确');
    return flag;
  }
  /**
   * 初始化Tree结构
   */
  private _init(tree: SourceTree = []) {
    const t = structuredClone(tree);

    // 节点设置leafIds和parent属性
    this._setLeafIdsAndParent(t);

    this._tree = t as TreeNode[];
  }
  /**
   * 节点添加leafIds、parent、level属性
   */
  private _setLeafIdsAndParent(tree: SourceTree, parent: SourceTree[number] | null = null, level = 1) {
    const { children } = this._props;

    return tree.map((node) => {
      const c = node[children] || [];

      Reflect.set(node, 'leafIds', c.length ? this._getAllLeafNodeIds(c) : []);
      Reflect.set(node, 'parentNode', parent);
      Reflect.set(node, 'level', level);
      if (c.length) {
        node[children] = this._setLeafIdsAndParent(c, node, level + 1);
      }

      return node;
    }) as Array<SourceTree[number] & { leafIds: string[]; parentNode: SourceTree[number] | null }>;
  }

  /**
   * 获取所有叶子节点的id
   * @param tree
   */
  private _getAllLeafNodeIds(tree: SourceTree | SourceTree[number]) {
    const { id, children } = this._props;
    const leafIds: any[] = [];

    if (Array.isArray(tree)) {
      tree.forEach((node) => {
        const c = node[children] ?? [];

        if (c.length === 0) {
          leafIds.push(node[id]);
        } else {
          leafIds.push(...this._getAllLeafNodeIds(c));
        }
      });
    } else {
      // 没有子节点
      const c = tree[children] ?? [];
      if (c.length === 0) {
        leafIds.push(tree[id]);
      } else {
        leafIds.push(...this._getAllLeafNodeIds(c));
      }
    }
    return leafIds;
  }

  /**
   * 给节点添加自定义属性
   * @param attr
   * @param value
   */
  addCustomAttr(attr: string, value: any, tree: TreeNode[] = this._tree) {
    const { children } = this._props;
    return tree.map((item) => {
      const c = item[children] ?? [];
      if (c.length) {
        item[children] = this.addCustomAttr(attr, value, c);
      }
      Reflect.set(item, attr, value);
      return item;
    });
  }

  /**
   * 获取所有节点id
   */
  getAllIds(tree = this._tree) {
    const { id, children } = this._props;
    const ids: any[] = [];
    tree.forEach((item) => {
      ids.push(item[id]);
      const c = item[children] ?? [];
      if (c.length) {
        ids.push(...this.getAllIds(c));
      }
    });
    return ids;
  }

  /**
   * 获取所有叶子节点id
   */
  getAllLeafIds() {
    return this._tree.reduce((pre, cur) => pre.concat(cur.leafIds), [] as any[]);
  }
}
