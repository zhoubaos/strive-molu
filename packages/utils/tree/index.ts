import { debugWarn } from '../error';

export interface TreeNodeProps {
  id?: string;
  name?: string;
  children?: string;
}

type SourceTree = Array<{ [key: string]: any }>;

export interface TreeNode {
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
  /**
   * 所有节点的id
   */
  public allIds: string[] | number[] = [];
  /**
   * 所有叶子节点id
   */
  public allLeafIds: string[] | number[] = [];
  /**
   * 最深level
   */
  public deepLevel = 0;

  /**
   * 源数据
   */
  public sourceTree: SourceTree = [];

  get idKey() {
    return this._props.id;
  }

  get nameKey() {
    return this._props.name;
  }

  get childrenKey() {
    return this._props.children;
  }

  get tree() {
    return this._tree;
  }

  private _tree: TreeNode[] = [];

  private _props: Required<TreeNodeProps> = {
    id: 'id',
    name: 'name',
    children: 'children'
  };

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

  constructor(tree: SourceTree, props?: TreeNodeProps) {
    props && (this._props = Object.assign(this._props, props));
    if (!this._validateTree(tree)) return;
    this.sourceTree = tree;
    this._init(tree);
  }

  /**
   * 验证tree结构是否正确
   */
  private _validateTree(tree: SourceTree) {
    let flag = true;
    flag = tree.every((item) => item[this.idKey] && item[this.nameKey]);

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

    // 设置属性
    this.allIds = this._getAllIds();
    this.allLeafIds = this._getAllLeafIds();
    this.deepLevel = this._getDeepLevel();
  }
  /**
   * 节点添加leafIds、parent、level属性
   */
  private _setLeafIdsAndParent(tree: SourceTree, parent: SourceTree[number] | null = null, level = 1) {
    return tree.map((node) => {
      const c = node[this.childrenKey] || [];

      Reflect.set(node, 'leafIds', c.length ? this._getAllLeafNodeIds(c) : []);
      Reflect.set(node, 'parentNode', parent);
      Reflect.set(node, 'level', level);
      if (c.length) {
        node[this.childrenKey] = this._setLeafIdsAndParent(c, node, level + 1);
      }

      return node;
    }) as Array<SourceTree[number] & { leafIds: string[]; parentNode: SourceTree[number] | null }>;
  }

  /**
   * 获取所有叶子节点的id
   * @param tree
   */
  private _getAllLeafNodeIds(tree: SourceTree | SourceTree[number]) {
    const leafIds: any[] = [];

    if (Array.isArray(tree)) {
      tree.forEach((node) => {
        const c = node[this.childrenKey] ?? [];

        if (c.length === 0) {
          leafIds.push(node[this.idKey]);
        } else {
          leafIds.push(...this._getAllLeafNodeIds(c));
        }
      });
    } else {
      // 没有子节点
      const c = tree[this.childrenKey] ?? [];
      if (c.length === 0) {
        leafIds.push(tree[this.idKey]);
      } else {
        leafIds.push(...this._getAllLeafNodeIds(c));
      }
    }
    return leafIds;
  }

  /**
   * 获取所有节点id
   */
  private _getAllIds(tree: TreeNode[] = this._tree) {
    const ids: any[] = [];
    tree.forEach((item) => {
      ids.push(item[this.idKey]);
      const c = item[this.childrenKey] ?? [];
      if (c.length) {
        ids.push(...this._getAllIds(c));
      }
    });
    return ids;
  }

  /**
   * 获取所有叶子节点id
   */
  private _getAllLeafIds() {
    return this._tree.reduce((pre, cur) => pre.concat(cur.leafIds), [] as any[]);
  }
  /**
   * 获取最深 level
   */
  private _getDeepLevel() {
    let maxLevel = 0;
    const getLevel = (node: TreeNode, level: number) => {
      if (!node[this.childrenKey] || !node[this.childrenKey].length) {
        maxLevel = Math.max(maxLevel, level);
        return;
      }
      node[this.childrenKey].forEach((child: TreeNode) => {
        getLevel(child, level + 1);
      });
    };
    for (const item of this._tree) {
      getLevel(item, 1);
    }
    return maxLevel;
  }

  /**
   * 给节点添加自定义属性
   * @param attr
   * @param value
   */
  addCustomAttr(attr: string, value: any, tree: TreeNode[] = this._tree) {
    return tree.map((item) => {
      const c = item[this.childrenKey] ?? [];
      if (c.length) {
        item[this.childrenKey] = this.addCustomAttr(attr, value, c);
      }
      Reflect.set(item, attr, value);
      return item;
    });
  }
  /**
   * 获取指定ids的叶子节点
   * @param tree
   * @param ids
   */
  getLeafIds(ids: Array<string | number>, tree: TreeNode[] = this._tree) {
    const leafIds: any[] = [];
    tree.forEach((node) => {
      if (ids.includes(node[this.idKey])) {
        if (node.leafIds && node.leafIds.length) {
          leafIds.push(...node.leafIds);
        } else {
          leafIds.push(node[this.idKey]);
        }
      } else if (node[this.childrenKey]) {
        leafIds.push(...this.getLeafIds(ids, node[this.childrenKey]));
      }
    });
    return leafIds;
  }

  /**
   * 获取叶子节点为leafIds的子集的节点
   * @param leafIds
   * @param tree
   */
  getNodesByLeafIds(leafIds: Array<string | number>, tree: TreeNode[] = this._tree) {
    const nodes: TreeNode[] = [];
    tree.forEach((node) => {
      if (node.leafIds?.length) {
        if (node.leafIds.every((id) => leafIds.includes(id))) {
          nodes.push(node);
        } else if (node[this.childrenKey]) {
          nodes.push(...this.getNodesByLeafIds(leafIds, node[this.childrenKey]));
        }
      } else {
        // 叶子节点
        leafIds.includes(node[this.idKey]) && nodes.push(node);
      }
    });
    return nodes;
  }

  /**
   * 根据id获取节点
   * @param ids
   * @param tree
   */
  getNodes(ids: Array<string | number>, tree: any[] = this.tree) {
    const nodes: any[] = [];

    tree.forEach((node) => {
      if (ids.includes(node[this.idKey])) {
        nodes.push(node);
      }

      nodes.push(...this.getNodes(ids, node[this.childrenKey] ?? []));
    });
    return nodes;
  }
}
