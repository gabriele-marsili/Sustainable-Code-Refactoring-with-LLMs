"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FlattenArray {
    static flatten(arr) {
        const result = [];
        for (const item of arr) {
            if (Array.isArray(item)) {
                result.push(...this.flatten(item));
            }
            else if (typeof item === 'number') {
                result.push(item);
            }
        }
        return result;
    }
}
exports.default = FlattenArray;
