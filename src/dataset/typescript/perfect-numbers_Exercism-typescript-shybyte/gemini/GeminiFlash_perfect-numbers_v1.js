"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateAliquotSum(x) {
    if (x <= 1)
        return 0;
    let sum = 1;
    const limit = Math.sqrt(x);
    for (let d = 2; d <= limit; d++) {
        if (x % d === 0) {
            sum += d;
            if (d * d !== x) {
                sum += x / d;
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
