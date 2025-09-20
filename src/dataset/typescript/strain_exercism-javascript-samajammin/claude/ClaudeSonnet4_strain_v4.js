"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keep = keep;
exports.discard = discard;
function keep(collection, predicate) {
    const result = [];
    for (let i = 0; i < collection.length; i++) {
        if (predicate(collection[i])) {
            result.push(collection[i]);
        }
    }
    return result;
}
function discard(collection, predicate) {
    const result = [];
    for (let i = 0; i < collection.length; i++) {
        if (!predicate(collection[i])) {
            result.push(collection[i]);
        }
    }
    return result;
}
