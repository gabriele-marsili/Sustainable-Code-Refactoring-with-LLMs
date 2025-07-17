"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatten = flatten;
function flatten(arr) {
    let flattened = [];
    recFlatten(arr, flattened);
    return flattened;
}
function recFlatten(n, flattened) {
    for (let i = 0; i < n.length; i++) {
        if (typeof n[i] === 'number') {
            flattened.push(n[i]);
        }
        else if (n[i]) {
            recFlatten(n[i], flattened);
        }
    }
}
