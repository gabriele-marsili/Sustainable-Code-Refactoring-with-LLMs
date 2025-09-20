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
        let current = this;
        while (true) {
            if (item <= current._data) {
                if (current._left) {
                    current = current._left;
                }
                else {
                    current._left = new BinarySearchTree(item);
                    break;
                }
            }
            else {
                if (current._right) {
                    current = current._right;
                }
                else {
                    current._right = new BinarySearchTree(item);
                    break;
                }
            }
        }
    }
    each(callback) {
        this.eachNode(callback, this);
    }
    eachNode(callback, current) {
        if (current) {
            if (current._left) {
                this.eachNode(callback, current._left);
            }
            callback(current._data);
            if (current._right) {
                this.eachNode(callback, current._right);
            }
        }
    }
}
exports.BinarySearchTree = BinarySearchTree;
