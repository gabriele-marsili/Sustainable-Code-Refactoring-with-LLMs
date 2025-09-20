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
        const stack = [];
        let current = this;
        while (current || stack.length > 0) {
            while (current) {
                stack.push(current);
                current = current._left;
            }
            current = stack.pop();
            callback(current._data);
            current = current._right;
        }
    }
}
exports.BinarySearchTree = BinarySearchTree;
