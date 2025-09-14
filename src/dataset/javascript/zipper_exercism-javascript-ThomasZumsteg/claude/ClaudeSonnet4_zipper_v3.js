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
    if (!this.tree.left) return null;
    const newCrumbs = [{ right: this.tree.right, value: this.tree.value }];
    if (this.crumbs.length > 0) {
      newCrumbs.push(...this.crumbs);
    }
    return new Zipper(this.tree.left, newCrumbs);
  }
  
  right() {
    if (!this.tree.right) return null;
    const newCrumbs = [{ left: this.tree.left, value: this.tree.value }];
    if (this.crumbs.length > 0) {
      newCrumbs.push(...this.crumbs);
    }
    return new Zipper(this.tree.right, newCrumbs);
  }
  
  value() {
    return this.tree.value;
  }
  
  up() {
    if (this.crumbs.length === 0) return null;
    
    const head = this.crumbs[0];
    const reconstructed = {
      value: head.value,
      left: head.left || this.tree,
      right: head.right || this.tree
    };
    
    return new Zipper(reconstructed, this.crumbs.slice(1));
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