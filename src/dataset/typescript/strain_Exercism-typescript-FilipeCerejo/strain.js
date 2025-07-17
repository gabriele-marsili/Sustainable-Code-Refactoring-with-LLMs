"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keep = keep;
exports.discard = discard;
function keep(arr, predicate) {
    let keepArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (predicate(arr[i])) {
            keepArr.push(arr[i]);
        }
    }
    return keepArr;
}
function discard(arr, predicate) {
    let discardArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (!predicate(arr[i])) {
            discardArr.push(arr[i]);
        }
    }
    return discardArr;
}
