"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accumulate = accumulate;
function accumulate(list, accumulator) {
    const length = list.length;
    const mappedArr = new Array(length);
    for (let i = 0; i < length; i++) {
        mappedArr[i] = accumulator(list[i]);
    }
    return mappedArr;
}
