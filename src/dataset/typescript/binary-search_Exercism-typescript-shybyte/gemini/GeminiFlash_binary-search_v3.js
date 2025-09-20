"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isSorted = (array) => {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            return false;
        }
    }
    return true;
};
const indexOf = (array, value, begin = 0, end = array.length) => {
    let low = begin;
    let high = end - 1;
    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);
        const midValue = array[mid];
        if (midValue === value) {
            return mid;
        }
        else if (midValue < value) {
            low = mid + 1;
        }
        else {
            high = mid - 1;
        }
    }
    return -1;
};
class BinarySearch {
    constructor(array) {
        this.indexOf = (value) => this.array ? indexOf(this.array, value) : -1;
        this.array = isSorted(array) ? array : undefined;
    }
}
exports.default = BinarySearch;
