"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discard = void 0;
exports.keep = keep;
const negatePredicate = (predicate) => ((el) => !predicate(el));
function keep(array, predicate) {
    const result = [];
    for (const el of array) {
        if (predicate(el)) {
            result.push(el);
        }
    }
    return result;
}
const discard = (array, predicate) => keep(array, negatePredicate(predicate));
exports.discard = discard;
