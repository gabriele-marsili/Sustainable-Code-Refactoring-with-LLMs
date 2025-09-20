"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    square(field) {
        if (field < 1 || field > 64) {
            return -1;
        }
        return 1n << BigInt(field - 1);
    },
    total: () => (1n << 64n) - 1n
};
