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
    while (begin < end) {
        if (begin === end - 1) {
            return array[begin] === value ? begin : -1;
        }
        const middleIndex = begin + ((end - begin) >>> 1);
        if (value < array[middleIndex]) {
            end = middleIndex;
        }
        else {
            begin = middleIndex;
        }
    }
    return -1;
};
class BinarySearch {
    constructor(array) {
        this.indexOf = (value) => indexOf(this.array, value);
        this.array = isSorted(array) ? array : undefined;
    }
}
exports.default = BinarySearch;
