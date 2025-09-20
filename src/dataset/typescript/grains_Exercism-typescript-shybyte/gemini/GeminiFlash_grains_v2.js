"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    square(field) {
        if (field < 1 || field > 64) {
            return -1;
        }
        return 1 << (field - 1);
    },
    total: () => {
        const result = Math.pow(BigInt(2), BigInt(64)) - BigInt(1);
        return Number(result);
    }
};
