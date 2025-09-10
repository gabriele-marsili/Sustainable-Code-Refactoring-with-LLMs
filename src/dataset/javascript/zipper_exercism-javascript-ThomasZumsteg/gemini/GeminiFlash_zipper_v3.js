class Zipper {
  constructor(tree, crumbs) {
    this.tree = tree;
    this.crumbs = crumbs || [];
  }

  toTree() {
    let current = this;
    while (current.crumbs.length > 0) {
      current = current.up();
    }
    return current.tree;
  }

  left() {
    const { left } = this.tree;
    if (!left) {
      return null;
    }
    return new Zipper(left, [{ right: this.tree.right, value: this.tree.value }, ...this.crumbs]);
  }

  right() {
    const { right } = this.tree;
    if (!right) {
      return null;
    }
    return new Zipper(right, [{ left: this.tree.left, value: this.tree.value }, ...this.crumbs]);
  }

  value() {
    return this.tree.value;
  }

  up() {
    if (this.crumbs.length === 0) {
      return null;
    }

    const [head, ...rest] = this.crumbs;

    const newHead = { ...head };

    if (!('right' in newHead)) {
      newHead.right = this.tree;
    }

    if (!('left' in newHead)) {
      newHead.left = this.tree;
    }

    return new Zipper(newHead, rest);
  }

  setValue(val) {
    return new Zipper({
      ...this.tree,
      value: val,
    }, this.crumbs);
  }

  setLeft(leaf) {
    return new Zipper({
      ...this.tree,
      left: leaf,
    }, this.crumbs);
  }

  setRight(leaf) {
    return new Zipper({
      ...this.tree,
      right: leaf,
    }, this.crumbs);
  }
}

export default {
  fromTree(items) {
    return new Zipper(items);
  },
};