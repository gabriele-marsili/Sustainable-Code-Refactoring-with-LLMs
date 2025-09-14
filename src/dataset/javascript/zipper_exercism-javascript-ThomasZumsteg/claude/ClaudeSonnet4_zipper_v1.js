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
    const leftTree = this.tree.left;
    if (!leftTree) return null;
    
    const newCrumb = { right: this.tree.right, value: this.tree.value };
    const newCrumbs = [newCrumb, ...this.crumbs];
    return new Zipper(leftTree, newCrumbs);
  }
  
  right() {
    const rightTree = this.tree.right;
    if (!rightTree) return null;
    
    const newCrumb = { left: this.tree.left, value: this.tree.value };
    const newCrumbs = [newCrumb, ...this.crumbs];
    return new Zipper(rightTree, newCrumbs);
  }
  
  value() {
    return this.tree.value;
  }
  
  up() {
    if (this.crumbs.length === 0) return null;
    
    const [head, ...tail] = this.crumbs;
    const newTree = {
      value: head.value,
      left: head.left || this.tree,
      right: head.right || this.tree
    };
    
    return new Zipper(newTree, tail);
  }
  
  setValue(val) {
    const newTree = {
      value: val,
      left: this.tree.left,
      right: this.tree.right
    };
    return new Zipper(newTree, this.crumbs);
  }
  
  setLeft(leaf) {
    const newTree = {
      value: this.tree.value,
      left: leaf,
      right: this.tree.right
    };
    return new Zipper(newTree, this.crumbs);
  }
  
  setRight(leaf) {
    const newTree = {
      value: this.tree.value,
      left: this.tree.left,
      right: leaf
    };
    return new Zipper(newTree, this.crumbs);
  }
}

export default {
  fromTree(items) {
    return new Zipper(items);
  }
};