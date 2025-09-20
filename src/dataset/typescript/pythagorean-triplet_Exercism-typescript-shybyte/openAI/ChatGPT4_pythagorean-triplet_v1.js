"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pow2 = (x) => x * x;
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
        const a2 = this.a * this.a;
        const b2 = this.b * this.b;
        const c2 = this.c * this.c;
        return a2 + b2 === c2;
    }
    static where(maxFactor, minFactor = 1, sum) {
        const results = [];
        const maxFactorSquared = maxFactor * maxFactor;
        for (let a = minFactor; a < maxFactor; a++) {
            const a2 = a * a;
            for (let b = a; b < maxFactor; b++) {
                const b2 = b * b;
                const c2 = a2 + b2;
                if (c2 > maxFactorSquared)
                    break;
                const c = Math.sqrt(c2);
                if (Math.floor(c) === c) {
                    const triplet = new Triplet(a, b, c);
                    if (!sum || triplet.sum() === sum) {
                        results.push(triplet);
                    }
                }
            }
        }
        return results;
    }
}
exports.default = Triplet;
