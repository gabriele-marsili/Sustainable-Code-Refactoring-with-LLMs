"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomSet {
    constructor(elements = []) {
        this.values = elements;
    }
    // calculates if set is empty
    empty() {
        return this.values.length === 0;
    }
    // calculates if set contains a value
    contains(num) {
        for (const element of this.values) {
            if (element === num) {
                return true;
            }
        }
        return false;
    }
    // adds an element to the set
    add(num) {
        if (!this.contains(num)) {
            this.values.push(num);
        }
        return this;
    }
    // calculates if all elements of this set are contained in that set
    subset(that) {
        return this.values.every((value) => that.contains(value));
    }
    // calculates if all elements of this set are not contained in that set
    disjoint(that) {
        return this.values.every((value) => !that.contains(value));
    }
    // calculates if sets have all the same elements
    eql(that) {
        if (this.values.length !== that.values.length) {
            return false;
        }
        return this.subset(that);
    }
    // return a set of all shared elements
    intersection(that) {
        const values = this.values.filter((value) => that.contains(value));
        return new CustomSet(values);
    }
    // return a set of elements only in this set
    difference(that) {
        const values = this.values.filter((value) => !that.contains(value));
        return new CustomSet(values);
    }
    // return a set of all elements in either set
    union(that) {
        const newSet = new CustomSet();
        for (const element of this.values) {
            newSet.add(element);
        }
        for (const element of that.values) {
            newSet.add(element);
        }
        return newSet;
    }
}
exports.default = CustomSet;
