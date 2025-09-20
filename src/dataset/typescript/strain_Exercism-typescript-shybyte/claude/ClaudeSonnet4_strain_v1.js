"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keep = keep;
exports.discard = discard;
const negatePredicate = (predicate) => ((el) => !predicate(el));
function keep(array, predicate) {
    const result = [];
    const length = array.length;
    for (let i = 0; i < length; i++) {
        if (predicate(array[i])) {
            result.push(array[i]);
        }
    }
    return result;
}
function discard(array, predicate) {
    const result = [];
    const length = array.length;
    for (let i = 0; i < length; i++) {
        if (!predicate(array[i])) {
            result.push(array[i]);
        }
    }
    return result;
}
