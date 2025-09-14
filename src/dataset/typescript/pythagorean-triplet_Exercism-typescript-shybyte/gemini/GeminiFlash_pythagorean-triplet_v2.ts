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
                const aSquaredPlusBSquared = a * a + b * b;
                const c = Math.sqrt(aSquaredPlusBSquared);

                if (c <= maxFactor && c === Math.floor(c)) {
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