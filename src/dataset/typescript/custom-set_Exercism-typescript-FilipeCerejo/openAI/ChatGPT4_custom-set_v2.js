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
    search(data) {
        let current = this;
        while (current) {
            if (current._data === data)
                return current;
            current = data < current._data ? current._left : current._right;
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
                break; // Avoid duplicates
            }
        }
    }
    array(result) {
        if (this._left)
            this._left.array(result);
        result.push(this._data);
        if (this._right)
            this._right.array(result);
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
        var _a;
        return ((_a = this._head) === null || _a === void 0 ? void 0 : _a.search(element)) !== undefined;
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
        return this.flatenSet().every((data) => other.contains(data));
    }
    disjoint(other) {
        return this.flatenSet().every((data) => !other.contains(data));
    }
    eql(other) {
        const flatThis = this.flatenSet();
        const flatOther = other.flatenSet();
        if (flatThis.length !== flatOther.length)
            return false;
        for (let i = 0; i < flatThis.length; i++) {
            if (flatThis[i] !== flatOther[i])
                return false;
        }
        return true;
    }
    union(other) {
        const result = new CustomSet(this.flatenSet());
        for (const n of other.flatenSet()) {
            result.add(n);
        }
        return result;
    }
    intersection(other) {
        return new CustomSet(this.flatenSet().filter((n) => other.contains(n)));
    }
    difference(other) {
        return new CustomSet(this.flatenSet().filter((n) => !other.contains(n)));
    }
    flatenSet() {
        var _a;
        const result = [];
        (_a = this._head) === null || _a === void 0 ? void 0 : _a.array(result);
        return result;
    }
}
exports.CustomSet = CustomSet;
