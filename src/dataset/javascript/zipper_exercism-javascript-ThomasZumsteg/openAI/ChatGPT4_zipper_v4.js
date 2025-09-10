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
    const leftNode = this.tree.left;
    return leftNode
      ? new Zipper(leftNode, [{ right: this.tree.right, value: this.tree.value }, ...this.crumbs])
      : null;
  }

  right() {
    const rightNode = this.tree.right;
    return rightNode
      ? new Zipper(rightNode, [{ left: this.tree.left, value: this.tree.value }, ...this.crumbs])
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
      { value: val, left: this.tree.left, right: this.tree.right },
      this.crumbs
    );
  }

  setLeft(leaf) {
    return new Zipper(
      { value: this.tree.value, left: leaf, right: this.tree.right },
      this.crumbs
    );
  }

  setRight(leaf) {
    return new Zipper(
      { value: this.tree.value, left: this.tree.left, right: leaf },
      this.crumbs
    );
  }
}

export default {
  fromTree(tree) {
    return new Zipper(tree);
  },
};