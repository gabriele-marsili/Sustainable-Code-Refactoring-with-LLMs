function calculateAliquotSum(x: number): number {
    if (x < 2) return 0;
    let sum = 1;
    const sqrtX = Math.sqrt(x);
    for (let d = 2; d <= sqrtX; d++) {
        if (x % d === 0) {
            sum += d;
            const pair = x / d;
            if (pair !== d) {
                sum += pair;
            }
        }
    }
    return sum;
}

export default class PerfectNumbers {
    static classify(x: number): 'perfect' | 'abundant' | 'deficient' {
        if (x < 1) {
            throw 'Classification is only possible for natural numbers.';
        }
        const aliquotSum = calculateAliquotSum(x);
        return aliquotSum === x ? 'perfect' : aliquotSum > x ? 'abundant' : 'deficient';
    }
}