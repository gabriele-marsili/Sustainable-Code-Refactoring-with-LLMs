const Zipper = class {
  constructor(tree, focusPath = []) {
    this.tree = tree;
    this.focusPath = focusPath;
  }

  static fromTree(tree) {
    return new Zipper(structuredClone(tree));
  }

  toTree() {
    return this.tree;
  }

  _getFocus() {
    return this.focusPath.reduce((node, dir) => node?.[dir], this.tree);
  }

  _updateTree(path, updater) {
    const newTree = structuredClone(this.tree);
    let node = newTree;
    for (let i = 0; i < path.length - 1; i++) {
      node = node[path[i]];
    }
    updater(node, path[path.length - 1]);
    return newTree;
  }

  left() {
    const focus = this._getFocus();
    if (!focus?.left) return null;
    return new Zipper(this.tree, [...this.focusPath, 'left']);
  }

  right() {
    const focus = this._getFocus();
    if (!focus?.right) return null;
    return new Zipper(this.tree, [...this.focusPath, 'right']);
  }

  value() {
    return this._getFocus()?.value;
  }

  up() {
    if (this.focusPath.length === 0) return null;
    return new Zipper(this.tree, this.focusPath.slice(0, -1));
  }

  setValue(val) {
    const newTree = this._updateTree(this.focusPath, (node, key) => {
      node[key].value = val;
    });
    return new Zipper(newTree, this.focusPath);
  }

  setLeft(val) {
    const newTree = this._updateTree(this.focusPath, (node, key) => {
      node[key].left = val;
    });
    return new Zipper(newTree, this.focusPath);
  }

  setRight(val) {
    const newTree = this._updateTree(this.focusPath, (node, key) => {
      node[key].right = val;
    });
    return new Zipper(newTree, this.focusPath);
  }
};

export { Zipper };