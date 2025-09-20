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
            if (!that.values.has(value)) {
                return false;
            }
        }
        return true;
    }
    disjoint(that) {
        for (const value of this.values) {
            if (that.values.has(value)) {
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
        const result = new Set();
        for (const value of this.values) {
            if (that.values.has(value)) {
                result.add(value);
            }
        }
        return new CustomSet([...result]);
    }
    difference(that) {
        const result = new Set();
        for (const value of this.values) {
            if (!that.values.has(value)) {
                result.add(value);
            }
        }
        return new CustomSet([...result]);
    }
    union(that) {
        const result = new Set([...this.values, ...that.values]);
        return new CustomSet([...result]);
    }
}
exports.default = CustomSet;
