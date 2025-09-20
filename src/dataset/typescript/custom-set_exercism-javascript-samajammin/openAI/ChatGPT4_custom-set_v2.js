"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomSet {
    constructor(elements = []) {
        this.values = new Set(elements);
    }
    // calculates if set is empty
    empty() {
        return this.values.size === 0;
    }
    // calculates if set contains a value
    contains(num) {
        return this.values.has(num);
    }
    // adds an element to the set
    add(num) {
        this.values.add(num);
        return this;
    }
    // calculates if all elements of this set are contained in that set
    subset(that) {
        for (const value of this.values) {
            if (!that.contains(value)) {
                return false;
            }
        }
        return true;
    }
    // calculates if all elements of this set are not contained in that set
    disjoint(that) {
        for (const value of this.values) {
            if (that.contains(value)) {
                return false;
            }
        }
        return true;
    }
    // calculates if sets have all the same elements
    eql(that) {
        return this.values.size === that.values.size && this.subset(that);
    }
    // return a set of all shared elements
    intersection(that) {
        const values = [...this.values].filter((value) => that.contains(value));
        return new CustomSet(values);
    }
    // return a set of elements only in this set
    difference(that) {
        const values = [...this.values].filter((value) => !that.contains(value));
        return new CustomSet(values);
    }
    // return a set of all elements in either set
    union(that) {
        return new CustomSet([...this.values, ...that.values]);
    }
}
exports.default = CustomSet;
