"use strict";
// This code fails for the current test case "test many lines"
// but I guess this test case is "wrong".
// See https://github.com/exercism/typescript/issues/199
Object.defineProperty(exports, "__esModule", { value: true });
function trimTrailingUndefined(array) {
    const trailingUndefinedCount = [...array].reverse().findIndex((x) => x !== undefined);
    return array.slice(0, array.length - trailingUndefinedCount);
}
exports.default = {
    transpose(input) {
        const maxCol = Math.max(0, ...(input.map((row) => row.length)));
        return [...Array(maxCol).keys()].map((col) => trimTrailingUndefined(input.map((_v, row) => input[row][col]))
            .map((charOrUndefined) => charOrUndefined || ' ')
            .join(''));
    }
};
