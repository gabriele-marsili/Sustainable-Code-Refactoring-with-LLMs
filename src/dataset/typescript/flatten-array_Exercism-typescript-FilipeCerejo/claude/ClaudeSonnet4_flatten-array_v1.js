"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatten = flatten;
function flatten(arr) {
    const flattened = [];
    const stack = [...arr];
    while (stack.length > 0) {
        const current = stack.pop();
        if (typeof current === 'number') {
            flattened.push(current);
        }
        else if (Array.isArray(current)) {
            stack.push(...current);
        }
    }
    return flattened.reverse();
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
