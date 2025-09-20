"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatten = flatten;
function flatten(arr) {
    const flattened = [];
    const stack = [arr];
    while (stack.length > 0) {
        const current = stack.pop();
        if (Array.isArray(current)) {
            for (let i = current.length - 1; i >= 0; i--) {
                const item = current[i];
                if (typeof item === 'number') {
                    flattened.push(item);
                }
                else if (Array.isArray(item)) {
                    stack.push(item);
                }
            }
        }
    }
    return flattened.reverse();
}
