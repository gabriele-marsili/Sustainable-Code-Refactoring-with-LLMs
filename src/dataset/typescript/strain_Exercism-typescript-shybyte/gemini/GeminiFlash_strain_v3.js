"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discard = void 0;
exports.keep = keep;
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
const discard = (array, predicate) => {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        const el = array[i];
        if (!predicate(el)) {
            result.push(el);
        }
    }
    return result;
};
exports.discard = discard;
