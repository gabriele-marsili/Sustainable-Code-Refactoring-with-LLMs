"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keep = keep;
exports.discard = discard;
function keep(array, predicate) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        const el = array[i];
        if (predicate(el)) {
            result.push(el);
        }
    }
    return result;
}
function discard(array, predicate) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        const el = array[i];
        if (!predicate(el)) {
            result.push(el);
        }
    }
    return result;
}
