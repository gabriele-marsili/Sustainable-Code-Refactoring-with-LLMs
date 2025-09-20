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
    for (let a = minFactor; a <= maxLimit - 2; a++) {
        for (let b = a + 1; b <= maxLimit - 1; b++) {
            const c = sum - a - b;
            if (c > b && c <= maxLimit && Math.pow(a, 2) + Math.pow(b, 2) === Math.pow(c, 2)) {
                tripletsArr.push(new Triplet(a, b, c));
            }
        }
    }
    return tripletsArr;
}
