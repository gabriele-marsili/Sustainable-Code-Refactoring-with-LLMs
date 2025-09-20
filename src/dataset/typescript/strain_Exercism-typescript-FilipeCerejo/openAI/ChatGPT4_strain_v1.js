"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keep = keep;
exports.discard = discard;
function keep(arr, predicate) {
    return arr.filter(predicate);
}
function discard(arr, predicate) {
    return arr.filter(el => !predicate(el));
}
