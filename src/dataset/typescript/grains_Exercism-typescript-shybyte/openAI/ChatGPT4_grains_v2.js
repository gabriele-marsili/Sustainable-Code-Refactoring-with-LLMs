"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const precomputedSquares = Array.from({ length: 64 }, (_, i) => Math.pow(2, i));
const totalGrains = (Math.pow(2n, 64n)) - 1n;
exports.default = {
    square(field) {
        return field >= 1 && field <= 64 ? precomputedSquares[field - 1] : -1;
    },
    total: () => totalGrains
};
