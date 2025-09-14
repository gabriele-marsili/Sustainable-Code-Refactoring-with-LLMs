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
        return this.a * this.a + this.b * this.b === this.c * this.c
    }

    static where(maxFactor: number, minFactor = 1, sum?: number) {
        const results = []
        const maxFactorSquared = maxFactor * maxFactor
        
        for (let a = minFactor; a < maxFactor; a++) {
            const aSquared = a * a
            const maxB = sum ? Math.min(maxFactor, sum - a - 1) : maxFactor
            
            for (let b = a; b < maxB; b++) {
                const cSquared = aSquared + b * b
                
                if (cSquared > maxFactorSquared) break
                
                const c = Math.sqrt(cSquared)
                const cInt = Math.floor(c + 0.5)
                
                if (cInt * cInt === cSquared && cInt <= maxFactor) {
                    if (!sum || a + b + cInt === sum) {
                        results.push(new Triplet(a, b, cInt))
                    }
                }
            }
        }
        return results
    }
}