class Zipper {
  constructor(tree, crumbs) {
    this.tree = tree;
    this.crumbs = crumbs || [];
  }
  toTree() {
    let current = this;
    while (current.crumbs.length > 0) {
      current = new Zipper(current.crumbs[0], current.crumbs.slice(1)).up(current.tree);
    }
    return current.tree;
  }
  left() {
    const { left, value, right } = this.tree;
    if (!left) {
      return null;
    }
    return new Zipper(left, [{ right, value }, ...this.crumbs]);
  }
  right() {
    const { right, value, left } = this.tree;
    if (!right) {
      return null;
    }
    return new Zipper(right, [{ left, value }, ...this.crumbs]);
  }
  value() {
    return this.tree.value;
  }
  up(subtree) {
    const tree = subtree || this.tree;
    if (this.crumbs.length === 0) {
      return null;
    }

    const head = this.crumbs[0];
    if (!('right' in head)) {
      head.right = tree;
    }
    if (!('left' in head)) {
      head.left = tree;
    }

    return new Zipper(head, this.crumbs.slice(1));
  }
  setValue(val) {
    const { left, right } = this.tree;
    return new Zipper({ value: val, left, right }, this.crumbs);
  }
  setLeft(leaf) {
    const { value, right } = this.tree;
    return new Zipper({ value: value, left: leaf, right: right }, this.crumbs);
  }
  setRight(leaf) {
    const { value, left } = this.tree;
    return new Zipper({ value: value, left: left, right: leaf }, this.crumbs);
  }
}

export default {
  fromTree(tree) {
    return new Zipper(tree);
  },
};