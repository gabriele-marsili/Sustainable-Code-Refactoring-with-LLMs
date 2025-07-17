"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Really slow, but just wrapping around Set is boring.
class CustomSet {
    constructor(array = []) {
        this.data = [];
        for (const el of array) {
            if (!this.data.includes(el)) {
                this.data.push(el);
            }
        }
    }
    add(el) {
        return new CustomSet(this.data.concat(el));
    }
    difference(otherSet) {
        return new CustomSet(this.data.filter((el) => !otherSet.contains(el)));
    }
    disjoint(otherSet) {
        return this.data.every((el) => !otherSet.contains(el));
    }
    intersection(otherSet) {
        return new CustomSet(this.data.filter((el) => otherSet.contains(el)));
    }
    subset(otherSet) {
        return this.data.every((el) => otherSet.contains(el));
    }
    union(otherSet) {
        return new CustomSet(this.data.concat(otherSet.data));
    }
    contains(needle) {
        return this.data.includes(needle);
    }
    empty() {
        return this.data.length === 0;
    }
    eql(otherSet) {
        const unionLength = this.union(otherSet).data.length;
        return unionLength === this.data.length && unionLength === otherSet.data.length;
    }
}
exports.default = CustomSet;
