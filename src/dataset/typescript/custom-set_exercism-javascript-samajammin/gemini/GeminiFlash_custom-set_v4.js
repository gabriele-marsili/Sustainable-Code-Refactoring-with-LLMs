"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomSet {
    constructor(elements = []) {
        this.values = new Set(elements);
    }
    empty() {
        return this.values.size === 0;
    }
    contains(num) {
        return this.values.has(num);
    }
    add(num) {
        this.values.add(num);
        return this;
    }
    subset(that) {
        if (this.values.size > that.values.size) {
            return false;
        }
        for (const value of this.values) {
            if (!that.contains(value)) {
                return false;
            }
        }
        return true;
    }
    disjoint(that) {
        for (const value of this.values) {
            if (that.contains(value)) {
                return false;
            }
        }
        return true;
    }
    eql(that) {
        if (this.values.size !== that.values.size) {
            return false;
        }
        return this.subset(that);
    }
    intersection(that) {
        const intersectionSet = new CustomSet();
        for (const value of this.values) {
            if (that.contains(value)) {
                intersectionSet.add(value);
            }
        }
        return intersectionSet;
    }
    difference(that) {
        const differenceSet = new CustomSet();
        for (const value of this.values) {
            if (!that.contains(value)) {
                differenceSet.add(value);
            }
        }
        return differenceSet;
    }
    union(that) {
        const unionSet = new CustomSet();
        for (const value of this.values) {
            unionSet.add(value);
        }
        for (const value of that.values) {
            unionSet.add(value);
        }
        return unionSet;
    }
}
exports.default = CustomSet;
