"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSet = void 0;
class NodeTree {
    constructor(data) {
        this._data = data;
        this._left = undefined;
        this._right = undefined;
    }
    get data() {
        return this._data;
    }
    search(data) {
        let current = this;
        while (current) {
            if (data === current._data) {
                return current;
            }
            if (data < current._data) {
                current = current._left;
            }
            else {
                current = current._right;
            }
        }
        return undefined;
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
                break; // Data already exists, no insertion needed
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
            initial.forEach((n) => this.add(n));
        }
    }
    empty() {
        return this._size === 0;
    }
    contains(element) {
        return this._head ? this._head.search(element) !== undefined : false;
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
        if (this._size === 0)
            return true;
        let current = this._head;
        const checkSubset = (node) => {
            if (!node)
                return true;
            if (!other.contains(node.data))
                return false;
            return checkSubset(node._left) && checkSubset(node._right);
        };
        return checkSubset(current);
    }
    disjoint(other) {
        if (this._size === 0 || other._size === 0)
            return true;
        let current = this._head;
        const checkDisjoint = (node) => {
            if (!node)
                return true;
            if (other.contains(node.data))
                return false;
            return checkDisjoint(node._left) && checkDisjoint(node._right);
        };
        return checkDisjoint(current);
    }
    eql(other) {
        if (this._size !== other._size)
            return false;
        if (this._size === 0 && other._size === 0)
            return true;
        let flatThis = this.flatenSet();
        let flatOther = other.flatenSet();
        for (let i = 0; i < flatThis.length; i++) {
            if (flatThis[i] !== flatOther[i])
                return false;
        }
        return true;
    }
    union(other) {
        let newCustomSet = new CustomSet();
        this.flatenSet().forEach((n) => newCustomSet.add(n));
        other.flatenSet().forEach((n) => newCustomSet.add(n));
        return newCustomSet;
    }
    intersection(other) {
        let newCustomSet = new CustomSet();
        this.flatenSet().forEach((n) => {
            if (other.contains(n)) {
                newCustomSet.add(n);
            }
        });
        return newCustomSet;
    }
    difference(other) {
        let newCustomSet = new CustomSet();
        this.flatenSet().forEach((n) => {
            if (!other.contains(n)) {
                newCustomSet.add(n);
            }
        });
        return newCustomSet;
    }
    flatenSet() {
        return this._head ? this._head.array() : [];
    }
}
exports.CustomSet = CustomSet;
