"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSet = void 0;
class NodeTree {
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
    set right(data) {
        this._right = data;
    }
    get left() {
        return this._left;
    }
    set left(data) {
        this._left = data;
    }
    search(data) {
        let current = this;
        while (current) {
            if (data === current._data) {
                return true;
            }
            if (data < current._data) {
                current = current._left;
            }
            else {
                current = current._right;
            }
        }
        return false;
    }
    insert(data) {
        let current = this;
        while (true) {
            if (data < current._data) {
                if (current._left) {
                    current = current._left;
                }
                else {
                    current._left = new NodeTree(data);
                    break;
                }
            }
            else if (data > current._data) {
                if (current._right) {
                    current = current._right;
                }
                else {
                    current._right = new NodeTree(data);
                    break;
                }
            }
            else {
                break;
            }
        }
    }
    array() {
        const result = [];
        const traverse = (node) => {
            if (node) {
                traverse(node._left);
                result.push(node._data);
                traverse(node._right);
            }
        };
        traverse(this);
        return result;
    }
}
class CustomSet {
    constructor(initial) {
        this._head = undefined;
        this._size = 0;
        if (initial && initial.length > 0) {
            initial.forEach(n => this.add(n));
        }
    }
    empty() {
        return this._size === 0;
    }
    contains(element) {
        if (this._head) {
            return this._head.search(element);
        }
        return false;
    }
    add(element) {
        if (!this.contains(element)) {
            if (this._head) {
                this._head.insert(element);
            }
            else {
                this._head = new NodeTree(element);
            }
            this._size++;
        }
        return this;
    }
    subset(other) {
        if (this._size > other._size)
            return false;
        if (this._head === undefined)
            return true;
        const flatThis = this._head.array();
        for (let i = 0; i < flatThis.length; i++) {
            if (!other.contains(flatThis[i])) {
                return false;
            }
        }
        return true;
    }
    disjoint(other) {
        if (this._head === undefined)
            return true;
        const flatThis = this._head.array();
        for (let i = 0; i < flatThis.length; i++) {
            if (other.contains(flatThis[i])) {
                return false;
            }
        }
        return true;
    }
    eql(other) {
        if (this._size !== other._size)
            return false;
        if (this._head === undefined && other._head === undefined)
            return true;
        if (this._head === undefined || other._head === undefined)
            return false;
        const flatThis = this._head.array();
        const flatOther = other._head.array();
        for (let i = 0; i < flatThis.length; i++) {
            if (flatThis[i] !== flatOther[i])
                return false;
        }
        return true;
    }
    union(other) {
        const newCustomSet = new CustomSet();
        if (this._head) {
            const flatThis = this._head.array();
            flatThis.forEach(n => newCustomSet.add(n));
        }
        if (other._head) {
            const flatOther = other._head.array();
            flatOther.forEach(n => newCustomSet.add(n));
        }
        return newCustomSet;
    }
    intersection(other) {
        const newCustomSet = new CustomSet();
        if (this._head) {
            const flatThis = this._head.array();
            flatThis.forEach(n => {
                if (other.contains(n)) {
                    newCustomSet.add(n);
                }
            });
        }
        return newCustomSet;
    }
    difference(other) {
        const newCustomSet = new CustomSet();
        if (this._head) {
            const flatThis = this._head.array();
            flatThis.forEach(n => {
                if (!other.contains(n)) {
                    newCustomSet.add(n);
                }
            });
        }
        return newCustomSet;
    }
    flatenSet() {
        if (this._head) {
            return this._head.array();
        }
        return [];
    }
}
exports.CustomSet = CustomSet;
