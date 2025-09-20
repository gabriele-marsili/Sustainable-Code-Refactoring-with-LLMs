"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keep = keep;
exports.discard = discard;
function keep(arr, predicate) {
    const result = [];
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        const element = arr[i];
        if (predicate(element)) {
            result.push(element);
        }
    }
    return result;
}
function discard(arr, predicate) {
    const result = [];
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        const element = arr[i];
        if (!predicate(element)) {
            result.push(element);
        }
    }
    return result;
}
