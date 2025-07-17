"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSet = void 0;
class NodeTree {
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
    constructor(data) {
        this._left = undefined;
        this._right = undefined;
        this._data = data;
    }
    search(data, current) {
        if (!current || current._data == data) {
            return current;
        }
        if (data < current._data) {
            return this.search(data, current._left);
        }
        else {
            return this.search(data, current._right);
        }
    }
    insert(data, current) {
        if (data < current._data) {
            if (current._left) {
                this.insert(data, current._left);
            }
            else {
                current._left = new NodeTree(data);
            }
        }
        else if (data > current._data) {
            if (current._right) {
                this.insert(data, current._right);
            }
            else {
                current._right = new NodeTree(data);
            }
        }
    }
    array(current, result) {
        if (current._left) {
            this.array(current._left, result);
        }
        result.push(current._data);
        if (current._right) {
            this.array(current._right, result);
        }
    }
}
class CustomSet {
    constructor(initial) {
        this._head = undefined;
        if (initial && initial[0]) {
            this._head = new NodeTree(initial[0]);
            initial.slice(1).forEach((n) => this.add(n));
        }
    }
    empty() {
        return this._head === undefined;
    }
    contains(element) {
        if (this._head) {
            return this._head.search(element, this._head) !== undefined;
        }
        return false;
    }
    add(element) {
        if (this._head) {
            this._head.insert(element, this._head);
        }
        else {
            this._head = new NodeTree(element);
        }
        return this;
    }
    subset(other) {
        let flatThis = this.flatenSet();
        return flatThis.every((data) => other.contains(data));
    }
    disjoint(other) {
        let flatThis = this.flatenSet();
        return flatThis.every((data) => !other.contains(data));
    }
    eql(other) {
        let flatThis = this.flatenSet();
        let flatOther = other.flatenSet();
        if (flatThis.length !== flatOther.length)
            return false;
        return flatThis.every((n, idx) => flatOther[idx] === n);
    }
    union(other) {
        let flatThis = this.flatenSet();
        let flatOther = other.flatenSet();
        let newCustomSet = new CustomSet(flatThis);
        flatOther.forEach((n) => newCustomSet.add(n));
        return newCustomSet;
    }
    intersection(other) {
        let flatThis = this.flatenSet();
        return new CustomSet(flatThis.filter((n) => other.contains(n)));
    }
    difference(other) {
        let flatThis = this.flatenSet();
        return new CustomSet(flatThis.filter((n) => !other.contains(n)));
    }
    flatenSet() {
        var _a;
        let result = [];
        (_a = this._head) === null || _a === void 0 ? void 0 : _a.array(this._head, result);
        return result;
    }
}
exports.CustomSet = CustomSet;
