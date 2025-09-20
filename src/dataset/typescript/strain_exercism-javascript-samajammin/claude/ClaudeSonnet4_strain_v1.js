"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keep = keep;
exports.discard = discard;
function keep(collection, predicate) {
    const res = [];
    for (let i = 0; i < collection.length; i++) {
        if (predicate(collection[i])) {
            res.push(collection[i]);
        }
    }
    return res;
}
function discard(collection, predicate) {
    const res = [];
    for (let i = 0; i < collection.length; i++) {
        if (!predicate(collection[i])) {
            res.push(collection[i]);
        }
    }
    return res;
}
