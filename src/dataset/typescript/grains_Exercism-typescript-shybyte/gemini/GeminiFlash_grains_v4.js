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
        const maxSquares = 64;
        let total = 0n;
        let current = 1n;
        for (let i = 0; i < maxSquares; i++) {
            total += current;
            current *= 2n;
        }
        return Number(total);
    }
};
