"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class List {
    constructor(...values) {
        this.values = values;
    }
    contains(sublist) {
        return sublist.values.length === 0 ||
            this.values.some((_v, startIndex) => sublist.values.every((sublistElement, subListIndex) => sublistElement === this.values[startIndex + subListIndex]));
    }
    compare(other) {
        if (this.values.length === other.values.length && this.contains(other)) {
            return 'equal';
        }
        else if (other.contains(this)) {
            return 'sublist';
        }
        else if (this.contains(other)) {
            return 'superlist';
        }
        return 'unequal';
    }
}
exports.default = List;
