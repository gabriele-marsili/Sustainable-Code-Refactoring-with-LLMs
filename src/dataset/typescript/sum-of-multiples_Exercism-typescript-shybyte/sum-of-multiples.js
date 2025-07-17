"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (factors) => {
    return {
        to: (n) => {
            let sum = 0;
            for (let i = 3; i < n; i++) {
                if (factors.some((factor) => i % factor === 0)) {
                    sum += i;
                }
            }
            return sum;
        }
    };
};
