"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MAX_FIELD = 64;
const MAX_TOTAL = BigInt(Math.pow(2, MAX_FIELD) - 1);
exports.default = {
    square(field) {
        return field >= 1 && field <= MAX_FIELD ? 1n << BigInt(field - 1) : -1;
    },
    total: () => MAX_TOTAL
};
