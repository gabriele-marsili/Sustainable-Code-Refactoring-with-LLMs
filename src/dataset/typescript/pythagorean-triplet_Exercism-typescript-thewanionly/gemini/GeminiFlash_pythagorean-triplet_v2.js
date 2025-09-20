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
    for (let a = minFactor; a <= Math.floor(sum / 3); a++) {
        for (let b = a + 1; b <= Math.floor(sum / 2); b++) {
            const c = sum - a - b;
            if (c <= b)
                continue;
            if (maxLimit && c > maxLimit)
                continue;
            if (a * a + b * b === c * c) {
                tripletsArr.push(new Triplet(a, b, c));
            }
        }
    }
    return tripletsArr;
}
