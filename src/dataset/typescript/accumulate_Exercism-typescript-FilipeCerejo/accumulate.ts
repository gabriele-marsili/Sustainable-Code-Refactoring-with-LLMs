"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accumulate = accumulate;
function accumulate(list, accumulator) {
    const mappedArr = new Array(list.length);
    for (let i = 0; i < list.length; i++) {
        mappedArr[i] = accumulator(list[i]);
    }
    return mappedArr;
}
