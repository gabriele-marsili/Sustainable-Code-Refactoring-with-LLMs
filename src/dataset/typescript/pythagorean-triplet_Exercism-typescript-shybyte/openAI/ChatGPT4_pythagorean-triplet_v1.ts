const pow2 = (x: number) => x * x;

export default class Triplet {
    private readonly a: number;
    private readonly b: number;
    private readonly c: number;

    constructor(a: number, b: number, c: number) {
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

    static where(maxFactor: number, minFactor = 1, sum?: number) {
        const results: Triplet[] = [];
        const maxFactorSquared = maxFactor * maxFactor;

        for (let a = minFactor; a < maxFactor; a++) {
            const a2 = a * a;
            for (let b = a; b < maxFactor; b++) {
                const b2 = b * b;
                const c2 = a2 + b2;
                if (c2 > maxFactorSquared) break;

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