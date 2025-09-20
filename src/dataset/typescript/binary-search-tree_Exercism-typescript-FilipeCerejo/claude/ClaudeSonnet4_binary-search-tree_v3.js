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
    eachNode(callback, current) {
        if (current === null || current === void 0 ? void 0 : current._left) {
            this.eachNode(callback, current._left);
        }
        if (current) {
            callback(current._data);
        }
        if (current === null || current === void 0 ? void 0 : current._right) {
            this.eachNode(callback, current._right);
        }
    }
}
exports.BinarySearchTree = BinarySearchTree;
