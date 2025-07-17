"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accumulate = accumulate;
function accumulate(list, accumulator) {
    let mappedArr = [];
    for (let i = 0; i < list.length; i++) {
        mappedArr.push(accumulator(list[i]));
    }
    return mappedArr;
}
