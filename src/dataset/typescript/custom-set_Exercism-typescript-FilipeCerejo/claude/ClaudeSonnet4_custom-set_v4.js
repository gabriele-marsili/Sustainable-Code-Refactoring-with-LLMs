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
        this._data = data;
    }
    search(data, current) {
        while (current && current._data !== data) {
            current = data < current._data ? current._left : current._right;
        }
        return current;
    }
    insert(data, current) {
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
    array(current, result) {
        const stack = [];
        let node = current;
        while (stack.length > 0 || node) {
            while (node) {
                stack.push(node);
                node = node._left;
            }
            node = stack.pop();
            result.push(node._data);
            node = node._right;
        }
    }
}
class CustomSet {
    constructor(initial) {
        this._size = 0;
        if (initial === null || initial === void 0 ? void 0 : initial.length) {
            this._head = new NodeTree(initial[0]);
            this._size = 1;
            for (let i = 1; i < initial.length; i++) {
                this.add(initial[i]);
            }
        }
    }
    empty() {
        return this._size === 0;
    }
    contains(element) {
        return this._head ? this._head.search(element, this._head) !== undefined : false;
    }
    add(element) {
        if (this._head) {
            const found = this._head.search(element, this._head);
            if (!found) {
                this._head.insert(element, this._head);
                this._size++;
            }
        }
        else {
            this._head = new NodeTree(element);
            this._size = 1;
        }
        return this;
    }
    subset(other) {
        var _a;
        if (this._size === 0)
            return true;
        if (this._size > other._size)
            return false;
        const result = [];
        (_a = this._head) === null || _a === void 0 ? void 0 : _a.array(this._head, result);
        return result.every(data => other.contains(data));
    }
    disjoint(other) {
        var _a;
        if (this._size === 0 || other._size === 0)
            return true;
        const result = [];
        (_a = this._head) === null || _a === void 0 ? void 0 : _a.array(this._head, result);
        return result.every(data => !other.contains(data));
    }
    eql(other) {
        var _a, _b;
        if (this._size !== other._size)
            return false;
        if (this._size === 0)
            return true;
        const thisResult = [];
        const otherResult = [];
        (_a = this._head) === null || _a === void 0 ? void 0 : _a.array(this._head, thisResult);
        (_b = other._head) === null || _b === void 0 ? void 0 : _b.array(other._head, otherResult);
        for (let i = 0; i < thisResult.length; i++) {
            if (thisResult[i] !== otherResult[i])
                return false;
        }
        return true;
    }
    union(other) {
        var _a, _b;
        const thisResult = [];
        const otherResult = [];
        (_a = this._head) === null || _a === void 0 ? void 0 : _a.array(this._head, thisResult);
        (_b = other._head) === null || _b === void 0 ? void 0 : _b.array(other._head, otherResult);
        const newCustomSet = new CustomSet(thisResult);
        for (const n of otherResult) {
            newCustomSet.add(n);
        }
        return newCustomSet;
    }
    intersection(other) {
        var _a;
        if (this._size === 0 || other._size === 0)
            return new CustomSet();
        const result = [];
        (_a = this._head) === null || _a === void 0 ? void 0 : _a.array(this._head, result);
        return new CustomSet(result.filter(n => other.contains(n)));
    }
    difference(other) {
        var _a;
        if (this._size === 0)
            return new CustomSet();
        if (other._size === 0)
            return new CustomSet(this.flatenSet());
        const result = [];
        (_a = this._head) === null || _a === void 0 ? void 0 : _a.array(this._head, result);
        return new CustomSet(result.filter(n => !other.contains(n)));
    }
    flatenSet() {
        var _a;
        const result = [];
        (_a = this._head) === null || _a === void 0 ? void 0 : _a.array(this._head, result);
        return result;
    }
}
exports.CustomSet = CustomSet;
