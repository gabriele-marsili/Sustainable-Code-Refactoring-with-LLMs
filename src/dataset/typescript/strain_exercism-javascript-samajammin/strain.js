"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keep = keep;
exports.discard = discard;
function keep(collection, predicate) {
    return filterFunc(collection, predicate, true);
}
function discard(collection, predicate) {
    return filterFunc(collection, predicate, false);
}
function filterFunc(collection, predicate, condition) {
    const res = [];
    collection.forEach(item => {
        if (predicate(item) === condition) {
            res.push(item);
        }
    });
    return res;
}
