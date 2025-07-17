"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isSorted = (array) => array.every((el, i) => (i + 1 === array.length) || (el <= array[i + 1]));
const indexOf = (array, value, begin = 0, end = array.length) => {
    switch (true) {
        case begin >= end:
            return -1;
        case begin === end - 1:
            return array[begin] === value ? begin : -1;
        default:
            const middleIndex = begin + Math.floor((end - begin) / 2);
            if (value < array[middleIndex]) {
                return indexOf(array, value, begin, middleIndex);
            }
            else {
                return indexOf(array, value, middleIndex, end);
            }
    }
};
class BinarySearch {
    constructor(array) {
        this.indexOf = (value) => indexOf(this.array, value);
        this.array = isSorted(array) ? array : undefined;
    }
}
exports.default = BinarySearch;
