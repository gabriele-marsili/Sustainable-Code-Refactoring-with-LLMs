export default (factors: number[]) => {
    const factorSet = new Set(factors);
    return {
        to: (n: number) => {
            let sum = 0;
            for (let i = 3; i < n; i++) {
                for (const factor of factorSet) {
                    if (i % factor === 0) {
                        sum += i;
                        break;
                    }
                }
            }
            return sum;
        }
    }
}