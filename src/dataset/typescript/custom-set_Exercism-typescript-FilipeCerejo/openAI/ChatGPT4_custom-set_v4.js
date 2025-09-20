"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSet = void 0;
class NodeTree {
    constructor(data) {
        this._data = data;
    }
    get data() {
        return this._data;
    }
    get right() {
        return this._right;
    }
    set right(node) {
        this._right = node;
    }
    get left() {
        return this._left;
    }
    set left(node) {
        this._left = node;
    }
    search(data) {
        var _a, _b;
        if (this._data === data)
            return this;
        if (data < this._data)
            return (_a = this._left) === null || _a === void 0 ? void 0 : _a.search(data);
        return (_b = this._right) === null || _b === void 0 ? void 0 : _b.search(data);
    }
    insert(data) {
        if (data < this._data) {
            if (this._left) {
                this._left.insert(data);
            }
            else {
                this._left = new NodeTree(data);
            }
        }
        else if (data > this._data) {
            if (this._right) {
                this._right.insert(data);
            }
            else {
                this._right = new NodeTree(data);
            }
        }
    }
    inOrderTraversal(result) {
        var _a, _b;
        (_a = this._left) === null || _a === void 0 ? void 0 : _a.inOrderTraversal(result);
        result.push(this._data);
        (_b = this._right) === null || _b === void 0 ? void 0 : _b.inOrderTraversal(result);
    }
}
class CustomSet {
    constructor(initial) {
        if (initial === null || initial === void 0 ? void 0 : initial.length) {
            this._head = new NodeTree(initial[0]);
            for (let i = 1; i < initial.length; i++) {
                this.add(initial[i]);
            }
        }
    }
    empty() {
        return !this._head;
    }
    contains(element) {
        var _a;
        return !!((_a = this._head) === null || _a === void 0 ? void 0 : _a.search(element));
    }
    add(element) {
        if (this._head) {
            this._head.insert(element);
        }
        else {
            this._head = new NodeTree(element);
        }
        return this;
    }
    subset(other) {
        return this.flatten().every((data) => other.contains(data));
    }
    disjoint(other) {
        return this.flatten().every((data) => !other.contains(data));
    }
    eql(other) {
        const flatThis = this.flatten();
        const flatOther = other.flatten();
        return flatThis.length === flatOther.length && flatThis.every((n, idx) => n === flatOther[idx]);
    }
    union(other) {
        const result = new CustomSet(this.flatten());
        for (const n of other.flatten()) {
            result.add(n);
        }
        return result;
    }
    intersection(other) {
        return new CustomSet(this.flatten().filter((n) => other.contains(n)));
    }
    difference(other) {
        return new CustomSet(this.flatten().filter((n) => !other.contains(n)));
    }
    flatten() {
        var _a;
        const result = [];
        (_a = this._head) === null || _a === void 0 ? void 0 : _a.inOrderTraversal(result);
        return result;
    }
}
exports.CustomSet = CustomSet;
