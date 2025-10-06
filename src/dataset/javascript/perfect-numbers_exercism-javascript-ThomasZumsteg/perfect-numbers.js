function factors(number) {
    if (number === 1) return [];
    
    const result = [1];
    const sqrt = Math.sqrt(number);
    
    for (let f = 2; f <= sqrt; f++) {
        if (number % f === 0) {
            result.push(f);
            const complement = number / f;
            if (f !== complement) {
                result.push(complement);
            }
        }
    }
    return result;
}

class PerfectNumbers {
    classify(number) {
        if (number <= 0) {
            return "Classification is only possible for natural numbers.";
        }

        let factorSum = 1;
        const sqrt = Math.sqrt(number);
        
        for (let f = 2; f <= sqrt; f++) {
            if (number % f === 0) {
                factorSum += f;
                const complement = number / f;
                if (f !== complement) {
                    factorSum += complement;
                }
            }
        }

        if (number < factorSum) {
            return "abundant";
        } else if (number > factorSum) {
            return "deficient";
        } else {
            return "perfect";
        }
    }
}

export default PerfectNumbers;