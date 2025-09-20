"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FlattenArray {
    static flatten(arr) {
        const result = [];
        function flattenHelper(arr) {
            for (let i = 0; i < arr.length; i++) {
                const item = arr[i];
                if (Array.isArray(item)) {
                    flattenHelper(item);
                }
                else if (typeof item === 'number') {
                    result.push(item);
                }
            }
        }
        flattenHelper(arr);
        return result;
    }
}
exports.default = FlattenArray;
