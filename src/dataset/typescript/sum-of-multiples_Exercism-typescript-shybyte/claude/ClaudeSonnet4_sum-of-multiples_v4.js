"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (factors) => {
    const uniqueFactors = [...new Set(factors.filter(f => f > 0))];
    return {
        to: (n) => {
            if (n <= 3 || uniqueFactors.length === 0)
                return 0;
            const seen = new Set();
            let sum = 0;
            for (const factor of uniqueFactors) {
                for (let multiple = Math.max(3, Math.ceil(3 / factor) * factor); multiple < n; multiple += factor) {
                    if (!seen.has(multiple)) {
                        seen.add(multiple);
                        sum += multiple;
                    }
                }
            }
            return sum;
        }
    };
};
