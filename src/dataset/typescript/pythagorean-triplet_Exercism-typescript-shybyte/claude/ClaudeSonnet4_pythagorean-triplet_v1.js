"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Triplet {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    sum() {
        return this.a + this.b + this.c;
    }
    product() {
        return this.a * this.b * this.c;
    }
    isPythagorean() {
        return this.a * this.a + this.b * this.b === this.c * this.c;
    }
    static where(maxFactor, minFactor = 1, sum) {
        const results = [];
        const maxFactorSquared = maxFactor * maxFactor;
        for (let a = minFactor; a < maxFactor; a++) {
            const aSquared = a * a;
            for (let b = a; b < maxFactor; b++) {
                const cSquared = aSquared + b * b;
                if (cSquared > maxFactorSquared)
                    break;
                const c = Math.sqrt(cSquared);
                if (c === Math.floor(c) && c <= maxFactor) {
                    if (!sum || a + b + c === sum) {
                        results.push(new Triplet(a, b, c));
                    }
                }
            }
        }
        return results;
    }
}
exports.default = Triplet;
