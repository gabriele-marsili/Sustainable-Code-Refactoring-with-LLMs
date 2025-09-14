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
    return new Zipper(leftTree, [newCrumb, ...this.crumbs]);
  }
  
  right() {
    const rightTree = this.tree.right;
    if (!rightTree) return null;
    
    const newCrumb = { left: this.tree.left, value: this.tree.value };
    return new Zipper(rightTree, [newCrumb, ...this.crumbs]);
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
    return new Zipper({
      value: val,
      left: this.tree.left,
      right: this.tree.right
    }, this.crumbs);
  }
  
  setLeft(leaf) {
    return new Zipper({
      value: this.tree.value,
      left: leaf,
      right: this.tree.right
    }, this.crumbs);
  }
  
  setRight(leaf) {
    return new Zipper({
      value: this.tree.value,
      left: this.tree.left,
      right: leaf
    }, this.crumbs);
  }
}

export default {
  fromTree(items) {
    return new Zipper(items);
  }
};