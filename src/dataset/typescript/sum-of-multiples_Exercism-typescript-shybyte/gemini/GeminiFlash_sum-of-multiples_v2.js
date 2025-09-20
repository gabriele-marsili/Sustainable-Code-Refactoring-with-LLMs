"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (factors) => {
    return {
        to: (n) => {
            let sum = 0;
            for (let i = 3; i < n; i++) {
                let isMultiple = false;
                for (let j = 0; j < factors.length; j++) {
                    if (i % factors[j] === 0) {
                        isMultiple = true;
                        break;
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
