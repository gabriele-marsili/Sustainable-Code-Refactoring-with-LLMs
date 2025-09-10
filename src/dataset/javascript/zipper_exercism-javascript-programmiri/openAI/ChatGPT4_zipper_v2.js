const Zipper = class {
  constructor(tree, focus = null, parent = null) {
    this.tree = tree;
    this.parent = parent;
    this.focus = focus || tree;
  }

  static fromTree(tree) {
    return new Zipper(tree);
  }

  toTree() {
    return this.tree;
  }

  left() {
    return this.focus.left ? new Zipper(this.tree, this.focus.left, this.focus) : null;
  }

  right() {
    return this.focus.right ? new Zipper(this.tree, this.focus.right, this.focus) : null;
  }

  value() {
    return this.focus.value;
  }

  up() {
    return this.parent ? new Zipper(this.tree, this.parent, null) : null;
  }

  setValue(val) {
    this.focus.value = val;
    return this;
  }

  setLeft(val) {
    this.focus.left = val;
    return this;
  }

  setRight(val) {
    this.focus.right = val;
    return this;
  }
};

export { Zipper };