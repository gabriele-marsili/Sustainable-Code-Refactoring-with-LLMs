"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FlattenArray {
    static flatten(arr) {
        let result = [];
        arr.forEach(item => {
            if (Array.isArray(item)) {
                result = result.concat(this.flatten(item));
            }
            else if (typeof item === 'number') {
                result = result.concat(item);
            }
        });
        return result;
    }
}
exports.default = FlattenArray;
