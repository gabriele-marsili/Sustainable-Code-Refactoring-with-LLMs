"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.triplets = triplets;
class Triplet {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    toArray() {
        return [this.a, this.b, this.c];
    }
}
function triplets({ sum, minFactor = 1, maxFactor }) {
    const tripletsArr = [];
    const maxLimit = maxFactor !== null && maxFactor !== void 0 ? maxFactor : sum;
    // Find all 3 numbers that sum up to `sum`
    for (let a = minFactor; a < maxLimit; a++) {
        for (let b = a + 1; b < maxLimit; b++) {
            for (let c = b + 1; c < maxLimit; c++) {
                const N = a + b + c;
                if (N === sum && Math.pow(a, 2) + Math.pow(b, 2) === Math.pow(c, 2)) {
                    tripletsArr.push(new Triplet(a, b, c));
                }
                if (N + 1 > sum)
                    break;
            }
        }
    }
    return tripletsArr;
}
