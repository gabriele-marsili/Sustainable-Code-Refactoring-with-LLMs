export default (factors: number[]) => {
    const uniqueFactors = [...new Set(factors.filter(f => f > 0))];
    
    return {
        to: (n: number) => {
            if (n <= 3 || uniqueFactors.length === 0) return 0;
            
            const seen = new Set<number>();
            let sum = 0;
            
            for (const factor of uniqueFactors) {
                for (let multiple = Math.max(factor, Math.ceil(3 / factor) * factor); multiple < n; multiple += factor) {
                    if (!seen.has(multiple)) {
                        seen.add(multiple);
                        sum += multiple;
                    }
                }
            }
            
            return sum;
        }
    }
}