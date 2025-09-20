"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (factors) => {
    const sortedFactors = [...factors].sort((a, b) => a - b); // Sort factors for potential early exit
    return {
        to: (n) => {
            let sum = 0;
            for (let i = 3; i < n; i++) {
                let isMultiple = false;
                for (let j = 0; j < sortedFactors.length; j++) {
                    const factor = sortedFactors[j];
                    if (i % factor === 0) {
                        isMultiple = true;
                        break; // Exit inner loop as soon as a factor is found
                    }
                    if (factor > i) {
                        break; // Optimization: If factor is greater than i, no need to continue checking
                    }
                }
                if (isMultiple) {
                    sum += i;
                }
            }
            return sum;
        }
    };
};
