"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FlattenArray {
    static flatten(arr) {
        const result = [];
        function flattenRecursive(subArr) {
            for (let i = 0; i < subArr.length; i++) {
                const item = subArr[i];
                if (Array.isArray(item)) {
                    flattenRecursive(item);
                }
                else if (typeof item === 'number') {
                    result.push(item);
                }
            }
        }
        flattenRecursive(arr);
        return result;
    }
}
exports.default = FlattenArray;
