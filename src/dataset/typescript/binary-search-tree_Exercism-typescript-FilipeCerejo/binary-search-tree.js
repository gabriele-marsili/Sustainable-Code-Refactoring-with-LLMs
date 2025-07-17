"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinarySearchTree = void 0;
class BinarySearchTree {
    constructor(data) {
        this._left = undefined;
        this._right = undefined;
        this._data = data;
    }
    get data() {
        return this._data;
    }
    get right() {
        return this._right;
    }
    get left() {
        return this._left;
    }
    insert(item) {
        this.insertNode(this, item);
    }
    insertNode(current, item) {
        if (item <= current._data) {
            if (current._left) {
                this.insertNode(current._left, item);
            }
            else {
                current._left = new BinarySearchTree(item);
            }
        }
        else {
            if (current._right) {
                this.insertNode(current._right, item);
            }
            else {
                current._right = new BinarySearchTree(item);
            }
        }
    }
    each(callback) {
        this.eachNode(callback, this);
    }
    eachNode(callback, curret) {
        if (curret._left) {
            this.eachNode(callback, curret._left);
        }
        callback(curret._data);
        if (curret._right) {
            this.eachNode(callback, curret._right);
        }
    }
}
exports.BinarySearchTree = BinarySearchTree;
