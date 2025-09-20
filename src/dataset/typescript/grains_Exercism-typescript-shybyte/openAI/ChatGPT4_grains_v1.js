"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    square(field) {
        return field >= 1 && field <= 64 ? 1n << BigInt(field - 1) : -1;
    },
    total: () => (1n << 64n) - 1n
};
