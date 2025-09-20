"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keep = keep;
exports.discard = discard;
const negatePredicate = (predicate) => ((el) => !predicate(el));
function keep(array, predicate) {
    const result = new Array();
    const length = array.length;
    let resultIndex = 0;
    for (let i = 0; i < length; i++) {
        const el = array[i];
        if (predicate(el)) {
            result[resultIndex++] = el;
        }
    }
    result.length = resultIndex;
    return result;
}
function discard(array, predicate) {
    const result = new Array();
    const length = array.length;
    let resultIndex = 0;
    for (let i = 0; i < length; i++) {
        const el = array[i];
        if (!predicate(el)) {
            result[resultIndex++] = el;
        }
    }
    result.length = resultIndex;
    return result;
}
