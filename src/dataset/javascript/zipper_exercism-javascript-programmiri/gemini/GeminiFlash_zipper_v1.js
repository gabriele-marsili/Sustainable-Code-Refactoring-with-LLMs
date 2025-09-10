const Zipper = class {
  constructor(tree, focus = null, parent = null, left = null, right = null) {
    this.tree = tree;
    this.focus = focus || tree;
    this.parent = parent;
    this.leftBranch = left;
    this.rightBranch = right;
  }

  static fromTree(tree) {
    return new Zipper(tree);
  }

  toTree() {
    return this.tree;
  }

  left() {
    if (!this.focus.left) return null;
    return new Zipper(this.tree, this.focus.left, this.focus, null, this.focus.right);
  }

  right() {
    if (!this.focus.right) return null;
    return new Zipper(this.tree, this.focus.right, this.focus, this.focus.left, null);
  }

  value() {
    return this.focus.value;
  }

  up() {
    if (!this.parent) return null;
    return new Zipper(this.tree, this.parent, this.parent.parent, this.leftBranch, this.rightBranch);
  }

  setValue(val) {
    const newFocus = { ...this.focus, value: val };
    if (this.parent) {
      if (this.parent.left === this.focus) {
        this.parent.left = newFocus;
      } else {
        this.parent.right = newFocus;
      }
    } else {
      this.tree = newFocus;
    }
    return new Zipper(this.tree, newFocus, this.parent, this.leftBranch, this.rightBranch);
  }

  setLeft(val) {
    const newFocus = { ...this.focus, left: val };
    if (this.parent) {
      if (this.parent.left === this.focus) {
        this.parent.left = newFocus;
      } else {
        this.parent.right = newFocus;
      }
    } else {
      this.tree = newFocus;
    }
    return new Zipper(this.tree, newFocus, this.parent, this.leftBranch, this.rightBranch);
  }

  setRight(val) {
    const newFocus = { ...this.focus, right: val };
    if (this.parent) {
      if (this.parent.left === this.focus) {
        this.parent.left = newFocus;
      } else {
        this.parent.right = newFocus;
      }
    } else {
      this.tree = newFocus;
    }
    return new Zipper(this.tree, newFocus, this.parent, this.leftBranch, this.rightBranch);
  }
};

export { Zipper };