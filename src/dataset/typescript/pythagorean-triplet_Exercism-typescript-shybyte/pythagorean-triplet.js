"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pow2 = (x) => Math.pow(x, 2);
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
        return pow2(this.a) + pow2(this.b) === pow2(this.c);
    }
    static where(maxFactor, minFactor = 1, sum) {
        const results = [];
        for (let a = minFactor; a < maxFactor; a++) {
            for (let b = a; b < maxFactor; b++) {
                const c = Math.sqrt(pow2(a) + pow2(b));
                if (c <= maxFactor && Math.floor(c) === c) {
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
