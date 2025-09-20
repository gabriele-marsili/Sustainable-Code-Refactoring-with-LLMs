"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateAliquotSum(x) {
    if (x < 2)
        return 0;
    let sum = 1; // 1 is a divisor for all natural numbers > 1
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
    return sum;
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
