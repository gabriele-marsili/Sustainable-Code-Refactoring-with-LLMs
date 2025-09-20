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
        while (current) {
            if (current._data === data) {
                return current;
            }
            current = data < current._data ? current._left : current._right;
        }
        return undefined;
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
        this._head = undefined;
        this._size = 0;
        if (initial && initial.length > 0) {
            this._head = new NodeTree(initial[0]);
            this._size = 1;
            for (let i = 1; i < initial.length; i++) {
                this.add(initial[i]);
            }
        }
    }
    empty() {
        return this._head === undefined;
    }
    contains(element) {
        return this._head ? this._head.search(element, this._head) !== undefined : false;
    }
    add(element) {
        if (this._head) {
            const existing = this._head.search(element, this._head);
            if (!existing) {
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
        if (this._size > other._size)
            return false;
        if (this.empty())
            return true;
        const result = [];
        this._head.array(this._head, result);
        return result.every((data) => other.contains(data));
    }
    disjoint(other) {
        if (this.empty() || other.empty())
            return true;
        const result = [];
        this._head.array(this._head, result);
        return result.every((data) => !other.contains(data));
    }
    eql(other) {
        if (this._size !== other._size)
            return false;
        if (this.empty() && other.empty())
            return true;
        const thisArray = [];
        const otherArray = [];
        this._head.array(this._head, thisArray);
        other._head.array(other._head, otherArray);
        for (let i = 0; i < thisArray.length; i++) {
            if (thisArray[i] !== otherArray[i])
                return false;
        }
        return true;
    }
    union(other) {
        if (this.empty())
            return new CustomSet(other.flatenSet());
        if (other.empty())
            return new CustomSet(this.flatenSet());
        const thisArray = this.flatenSet();
        const newSet = new CustomSet(thisArray);
        const otherArray = other.flatenSet();
        for (const n of otherArray) {
            newSet.add(n);
        }
        return newSet;
    }
    intersection(other) {
        if (this.empty() || other.empty())
            return new CustomSet();
        const thisArray = this.flatenSet();
        const intersection = [];
        for (const n of thisArray) {
            if (other.contains(n)) {
                intersection.push(n);
            }
        }
        return new CustomSet(intersection);
    }
    difference(other) {
        if (this.empty())
            return new CustomSet();
        if (other.empty())
            return new CustomSet(this.flatenSet());
        const thisArray = this.flatenSet();
        const difference = [];
        for (const n of thisArray) {
            if (!other.contains(n)) {
                difference.push(n);
            }
        }
        return new CustomSet(difference);
    }
    flatenSet() {
        if (!this._head)
            return [];
        const result = [];
        this._head.array(this._head, result);
        return result;
    }
}
exports.CustomSet = CustomSet;
