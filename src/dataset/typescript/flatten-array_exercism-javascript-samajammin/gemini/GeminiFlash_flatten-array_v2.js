"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FlattenArray {
    static flatten(arr) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
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
