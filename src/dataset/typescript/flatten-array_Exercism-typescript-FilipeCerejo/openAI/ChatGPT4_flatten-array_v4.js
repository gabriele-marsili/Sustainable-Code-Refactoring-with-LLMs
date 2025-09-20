"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatten = flatten;
function flatten(arr) {
    const stack = [...arr];
    const flattened = [];
    while (stack.length) {
        const current = stack.pop();
        if (Array.isArray(current)) {
            stack.push(...current);
        }
        else if (typeof current === 'number') {
            flattened.push(current);
        }
    }
    return flattened.reverse();
}
