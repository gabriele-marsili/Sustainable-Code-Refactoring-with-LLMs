"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (factors) => {
    const uniqueFactors = Array.from(new Set(factors)).filter(factor => factor > 0);
    return {
        to: (n) => {
            let sum = 0;
            for (let i = 3; i < n; i++) {
                for (const factor of uniqueFactors) {
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
