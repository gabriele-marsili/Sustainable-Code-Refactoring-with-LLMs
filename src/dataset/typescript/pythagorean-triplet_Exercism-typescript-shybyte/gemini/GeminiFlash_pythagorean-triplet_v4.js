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
        return (this.a * this.a) + (this.b * this.b) === (this.c * this.c);
    }
    static where(maxFactor, minFactor = 1, sum) {
        const results = [];
        for (let a = minFactor; a <= maxFactor / 2; a++) {
            for (let b = a + 1; b < maxFactor; b++) {
                const sumAB = a * a + b * b;
                const c = Math.sqrt(sumAB);
                if (c > maxFactor) {
                    continue;
                }
                if (c % 1 === 0) {
                    const triplet = new Triplet(a, b, c);
                    if (sum === undefined || triplet.sum() === sum) {
                        results.push(triplet);
                    }
                }
            }
        }
        return results;
    }
}
exports.default = Triplet;
