"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSet = void 0;
class NodeTree {
    constructor(data) {
        this.left = undefined;
        this.right = undefined;
        this.data = data;
    }
    search(data, current) {
        while (current) {
            if (current.data === data)
                return current;
            current = data < current.data ? current.left : current.right;
        }
        return undefined;
    }
    insert(data, current) {
        while (true) {
            if (data < current.data) {
                if (current.left) {
                    current = current.left;
                }
                else {
                    current.left = new NodeTree(data);
                    break;
                }
            }
            else if (data > current.data) {
                if (current.right) {
                    current = current.right;
                }
                else {
                    current.right = new NodeTree(data);
                    break;
                }
            }
            else {
                break; // duplicate value
            }
        }
    }
    array(current, result) {
        const stack = [];
        let node = current;
        while (stack.length > 0 || node) {
            while (node) {
                stack.push(node);
                node = node.left;
            }
            node = stack.pop();
            result.push(node.data);
            node = node.right;
        }
    }
}
class CustomSet {
    constructor(initial) {
        this._head = undefined;
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
            const oldSize = this._size;
            this._head.insert(element, this._head);
            if (oldSize === this._size)
                this._size++; // only increment if new element
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
        const flatThis = this.flatenSet();
        for (const data of flatThis) {
            if (!other.contains(data))
                return false;
        }
        return true;
    }
    disjoint(other) {
        const flatThis = this.flatenSet();
        for (const data of flatThis) {
            if (other.contains(data))
                return false;
        }
        return true;
    }
    eql(other) {
        if (this._size !== other._size)
            return false;
        const flatThis = this.flatenSet();
        const flatOther = other.flatenSet();
        for (let i = 0; i < flatThis.length; i++) {
            if (flatThis[i] !== flatOther[i])
                return false;
        }
        return true;
    }
    union(other) {
        const newCustomSet = new CustomSet(this.flatenSet());
        const flatOther = other.flatenSet();
        for (const n of flatOther) {
            newCustomSet.add(n);
        }
        return newCustomSet;
    }
    intersection(other) {
        const flatThis = this.flatenSet();
        const intersection = [];
        for (const n of flatThis) {
            if (other.contains(n)) {
                intersection.push(n);
            }
        }
        return new CustomSet(intersection);
    }
    difference(other) {
        const flatThis = this.flatenSet();
        const difference = [];
        for (const n of flatThis) {
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
