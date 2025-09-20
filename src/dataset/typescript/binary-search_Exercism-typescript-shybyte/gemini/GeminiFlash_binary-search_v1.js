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
const binarySearch = (array, value) => {
    let low = 0;
    let high = array.length - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
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
        this.indexOf = (value) => {
            if (!this.sortedArray) {
                return -1;
            }
            return binarySearch(this.sortedArray, value);
        };
        this.sortedArray = isSorted(array) ? array : undefined;
    }
}
exports.default = BinarySearch;
