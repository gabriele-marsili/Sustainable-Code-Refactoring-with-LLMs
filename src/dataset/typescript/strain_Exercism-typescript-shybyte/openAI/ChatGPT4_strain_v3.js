"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discard = void 0;
exports.keep = keep;
const negatePredicate = (predicate) => (el) => !predicate(el);
function keep(array, predicate) {
    return array.filter(predicate);
}
const discard = (array, predicate) => array.filter(negatePredicate(predicate));
exports.discard = discard;
