"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (factors) => {
    const factorSet = new Set(factors);
    return {
        to: (n) => {
            let sum = 0;
            for (let i = 3; i < n; i++) {
                for (const factor of factorSet) {
                    if (i % factor === 0) {
                        sum += i;
                        break;
                    }
                }
            }
            return sum;
        }
    };
};
