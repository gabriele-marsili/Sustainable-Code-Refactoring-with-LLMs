"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateAliquotSum(x) {
    let sum = 1; // Start with 1 since 1 is a divisor for all natural numbers
    const sqrtX = Math.sqrt(x);
    for (let d = 2; d <= sqrtX; d++) {
        if (x % d === 0) {
            sum += d;
            const pair = x / d;
            if (pair !== d) {
                sum += pair;
            }
        }
    }
    return x > 1 ? sum : 0; // Return 0 for x = 1 since it has no proper divisors
}
class PerfectNumbers {
    static classify(x) {
        if (x < 1) {
            throw 'Classification is only possible for natural numbers.';
        }
        const aliquotSum = calculateAliquotSum(x);
        if (aliquotSum === x) {
            return 'perfect';
        }
        else if (aliquotSum > x) {
            return 'abundant';
        }
        else {
            return 'deficient';
        }
    }
}
exports.default = PerfectNumbers;
