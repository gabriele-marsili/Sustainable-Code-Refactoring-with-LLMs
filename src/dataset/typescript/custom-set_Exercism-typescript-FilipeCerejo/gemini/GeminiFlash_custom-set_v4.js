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
            if (current._data === data) {
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
                    return;
                }
            }
            else if (data > current._data) {
                if (current._right) {
                    current = current._right;
                }
                else {
                    current._right = new NodeTree(data);
                    return;
                }
            }
            else {
                return;
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
        if (initial && initial.length > 0) {
            this._head = new NodeTree(initial[0]);
            for (let i = 1; i < initial.length; i++) {
                this.add(initial[i]);
            }
        }
    }
    empty() {
        return this._head === undefined;
    }
    contains(element) {
        return this._head ? this._head.search(element) !== undefined : false;
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
        if (!this._head)
            return true;
        let flatThis = this.flatenSet();
        for (let i = 0; i < flatThis.length; i++) {
            if (!other.contains(flatThis[i])) {
                return false;
            }
        }
        return true;
    }
    disjoint(other) {
        if (!this._head)
            return true;
        let flatThis = this.flatenSet();
        for (let i = 0; i < flatThis.length; i++) {
            if (other.contains(flatThis[i])) {
                return false;
            }
        }
        return true;
    }
    eql(other) {
        if (!this._head && !other._head)
            return true;
        if (!this._head || !other._head)
            return false;
        let flatThis = this.flatenSet();
        let flatOther = other.flatenSet();
        if (flatThis.length !== flatOther.length)
            return false;
        for (let i = 0; i < flatThis.length; i++) {
            if (flatThis[i] !== flatOther[i])
                return false;
        }
        return true;
    }
    union(other) {
        let newCustomSet = new CustomSet(this.flatenSet());
        if (other._head) {
            let flatOther = other.flatenSet();
            for (let i = 0; i < flatOther.length; i++) {
                newCustomSet.add(flatOther[i]);
            }
        }
        return newCustomSet;
    }
    intersection(other) {
        let flatThis = this.flatenSet();
        const intersectionArray = [];
        for (let i = 0; i < flatThis.length; i++) {
            if (other.contains(flatThis[i])) {
                intersectionArray.push(flatThis[i]);
            }
        }
        return new CustomSet(intersectionArray);
    }
    difference(other) {
        let flatThis = this.flatenSet();
        const differenceArray = [];
        for (let i = 0; i < flatThis.length; i++) {
            if (!other.contains(flatThis[i])) {
                differenceArray.push(flatThis[i]);
            }
        }
        return new CustomSet(differenceArray);
    }
    flatenSet() {
        return this._head ? this._head.array() : [];
    }
}
exports.CustomSet = CustomSet;
