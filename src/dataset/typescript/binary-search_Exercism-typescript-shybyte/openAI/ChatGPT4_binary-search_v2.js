"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isSorted = (array) => {
    for (let i = 1; i < array.length; i++) {
        if (array[i - 1] > array[i])
            return false;
    }
    return true;
};
const indexOf = (array, value) => {
    let begin = 0, end = array.length;
    while (begin < end) {
        const middleIndex = begin + Math.floor((end - begin) / 2);
        if (array[middleIndex] === value)
            return middleIndex;
        if (value < array[middleIndex]) {
            end = middleIndex;
        }
        else {
            begin = middleIndex + 1;
        }
    }
    return -1;
};
class BinarySearch {
    constructor(array) {
        this.array = isSorted(array) ? array : undefined;
    }
    indexOf(value) {
        if (!this.array)
            return -1;
        return indexOf(this.array, value);
    }
}
exports.default = BinarySearch;
