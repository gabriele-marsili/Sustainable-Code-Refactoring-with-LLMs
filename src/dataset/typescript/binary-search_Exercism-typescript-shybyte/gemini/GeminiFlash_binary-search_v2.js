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
const binarySearch = (array, value, begin, end) => {
    while (begin < end) {
        const middleIndex = begin + Math.floor((end - begin) / 2);
        const middleValue = array[middleIndex];
        if (value === middleValue) {
            return middleIndex;
        }
        else if (value < middleValue) {
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
        this.indexOf = (value) => {
            if (!this.sortedArray) {
                return -1;
            }
            return binarySearch(this.sortedArray, value, 0, this.sortedArray.length);
        };
        this.sortedArray = isSorted(array) ? array : undefined;
    }
}
exports.default = BinarySearch;
