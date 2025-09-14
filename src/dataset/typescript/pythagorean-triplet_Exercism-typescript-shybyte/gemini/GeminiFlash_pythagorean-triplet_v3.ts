export default class Triplet {
    private readonly a: number
    private readonly b: number
    private readonly c: number

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
        return this.a * this.a + this.b * this.b === this.c * this.c;
    }

    static where(maxFactor: number, minFactor = 1, sum?: number) {
        const results: Triplet[] = [];

        for (let a = minFactor; a <= maxFactor / 2; a++) {
            for (let b = a + 1; b < maxFactor; b++) {
                const sum_ab = a + b;
                if (sum && (sum_ab >= sum)) continue;

                const a2_plus_b2 = a * a + b * b;
                const c = Math.sqrt(a2_plus_b2);

                if (c > maxFactor) continue;

                if (Number.isInteger(c)) {
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