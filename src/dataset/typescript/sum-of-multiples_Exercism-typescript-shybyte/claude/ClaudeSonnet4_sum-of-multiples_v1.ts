export default (factors: number[]) => {
    const uniqueFactors = [...new Set(factors.filter(f => f > 0))];
    
    return {
        to: (n: number) => {
            if (n <= 3 || uniqueFactors.length === 0) return 0;
            
            let sum = 0;
            const factorCount = uniqueFactors.length;
            
            for (let i = 3; i < n; i++) {
                for (let j = 0; j < factorCount; j++) {
                    if (i % uniqueFactors[j] === 0) {
                        sum += i;
                        break;
                    }
                }
            }
            return sum;
        }
    }
}