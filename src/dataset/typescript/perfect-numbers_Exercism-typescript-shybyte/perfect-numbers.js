"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateAliquotSum(x) {
    let sum = 0;
    for (let d = 1; d < x; d++) {
        if (x % d === 0) {
            sum += d;
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
