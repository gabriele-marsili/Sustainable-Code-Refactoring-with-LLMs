"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FlattenArray {
    static flatten(inputArray) {
        const result = [];
        function pushFlat(input) {
            if (Array.isArray(input)) {
                input.forEach(pushFlat);
            }
            else if (input !== undefined && input !== null) {
                result.push(input);
            }
        }
        pushFlat(inputArray);
        return result;
    }
}
exports.default = FlattenArray;
