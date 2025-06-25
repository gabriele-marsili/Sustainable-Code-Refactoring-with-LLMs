const pow2 = (x: number) => x ** 2

export default class Triplet {
    private readonly a: number
    private readonly b: number
    private readonly c: number

    constructor(a: number, b: number, c: number) {
        this.a = a
        this.b = b
        this.c = c
    }

    sum() {
        return this.a + this.b + this.c
    }

    product() {
        return this.a * this.b * this.c
    }

    isPythagorean() {
        return pow2(this.a) + pow2(this.b) === pow2(this.c)
    }

    static where(maxFactor: number, minFactor = 1, sum?: number) {
        const results = []
        for (let a = minFactor; a < maxFactor; a++) {
            for (let b = a; b < maxFactor; b++) {
                const c = Math.sqrt(pow2(a) + pow2(b))
                if (c <= maxFactor && Math.floor(c) === c) {
                    const triplet = new Triplet(a, b, c)
                    if (!sum || triplet.sum() === sum) {
                        results.push(triplet)
                    }
                }
            }
        }
        return results
    }

}
