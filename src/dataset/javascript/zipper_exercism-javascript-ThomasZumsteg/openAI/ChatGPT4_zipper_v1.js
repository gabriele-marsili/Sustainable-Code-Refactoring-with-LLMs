class Zipper {
  constructor(tree, crumbs = []) {
    this.tree = tree;
    this.crumbs = crumbs;
  }

  toTree() {
    let current = this;
    while (current.crumbs.length > 0) {
      current = current.up();
    }
    return current.tree;
  }

  left() {
    const leftTree = this.tree.left;
    return leftTree
      ? new Zipper(leftTree, [{ right: this.tree.right, value: this.tree.value }, ...this.crumbs])
      : null;
  }

  right() {
    const rightTree = this.tree.right;
    return rightTree
      ? new Zipper(rightTree, [{ left: this.tree.left, value: this.tree.value }, ...this.crumbs])
      : null;
  }

  value() {
    return this.tree.value;
  }

  up() {
    if (this.crumbs.length === 0) return null;
    const [head, ...rest] = this.crumbs;
    return new Zipper(
      {
        value: head.value,
        left: head.left || this.tree,
        right: head.right || this.tree,
      },
      rest
    );
  }

  setValue(val) {
    return new Zipper(
      { ...this.tree, value: val },
      this.crumbs
    );
  }

  setLeft(leaf) {
    return new Zipper(
      { ...this.tree, left: leaf },
      this.crumbs
    );
  }

  setRight(leaf) {
    return new Zipper(
      { ...this.tree, right: leaf },
      this.crumbs
    );
  }
}

export default {
  fromTree(tree) {
    return new Zipper(tree);
  },
};