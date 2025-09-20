"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FlattenArray {
    static flatten(arr) {
        const result = [];
        const stack = [...arr];
        while (stack.length > 0) {
            const item = stack.pop();
            if (Array.isArray(item)) {
                stack.push(...item);
            }
            else if (typeof item === 'number') {
                result.push(item);
            }
        }
        return result.reverse();
    }
}
exports.default = FlattenArray;
