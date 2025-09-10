export default (factors: number[]) => {
    const uniqueFactors = Array.from(new Set(factors)).filter(factor => factor > 0);
    return {
        to: (n: number) => {
            let sum = 0;
            for (let i = 3; i < n; i++) {
                for (const factor of uniqueFactors) {
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