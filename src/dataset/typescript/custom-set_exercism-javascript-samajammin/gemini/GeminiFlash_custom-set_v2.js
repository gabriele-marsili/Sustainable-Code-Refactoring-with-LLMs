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
        const intersectionSet = new Set();
        for (const value of this.values) {
            if (that.contains(value)) {
                intersectionSet.add(value);
            }
        }
        return new CustomSet(Array.from(intersectionSet));
    }
    difference(that) {
        const differenceSet = new Set();
        for (const value of this.values) {
            if (!that.contains(value)) {
                differenceSet.add(value);
            }
        }
        return new CustomSet(Array.from(differenceSet));
    }
    union(that) {
        const unionSet = new Set(this.values);
        for (const element of that.values) {
            unionSet.add(element);
        }
        return new CustomSet(Array.from(unionSet));
    }
}
exports.default = CustomSet;
