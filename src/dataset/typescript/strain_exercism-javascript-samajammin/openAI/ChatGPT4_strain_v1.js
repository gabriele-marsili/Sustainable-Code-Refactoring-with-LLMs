"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keep = keep;
exports.discard = discard;
function keep(collection, predicate) {
    return collection.filter(predicate);
}
function discard(collection, predicate) {
    return collection.filter(item => !predicate(item));
}
