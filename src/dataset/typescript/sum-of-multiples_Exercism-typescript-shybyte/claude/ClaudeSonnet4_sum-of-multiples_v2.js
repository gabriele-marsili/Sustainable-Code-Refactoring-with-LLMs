"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (factors) => {
    const uniqueFactors = [...new Set(factors.filter(f => f > 0))];
    return {
        to: (n) => {
            let sum = 0;
            const seen = new Set();
            for (const factor of uniqueFactors) {
                for (let multiple = factor; multiple < n; multiple += factor) {
                    if (multiple >= 3 && !seen.has(multiple)) {
                        seen.add(multiple);
                        sum += multiple;
                    }
                }
            }
            return sum;
        }
    };
};
