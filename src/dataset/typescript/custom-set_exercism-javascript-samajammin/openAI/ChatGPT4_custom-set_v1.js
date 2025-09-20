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
        return this.values.size === that.values.size && this.subset(that);
    }
    intersection(that) {
        const values = Array.from(this.values).filter((value) => that.contains(value));
        return new CustomSet(values);
    }
    difference(that) {
        const values = Array.from(this.values).filter((value) => !that.contains(value));
        return new CustomSet(values);
    }
    union(that) {
        return new CustomSet([...this.values, ...that.values]);
    }
}
exports.default = CustomSet;
