const Zipper = class {
  constructor(tree, focus = null, parent = null) {
    this.tree = tree;
    this.parent = parent;
    this.focus = focus || tree;
  }

  static fromTree(tree) {
    const cloneNode = (node) => {
      if (!node) return null;
      return {
        value: node.value,
        left: cloneNode(node.left),
        right: cloneNode(node.right)
      };
    };
    return new Zipper(cloneNode(tree));
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
    return this.parent ? new Zipper(this.tree, this.parent, this.focus) : null;
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