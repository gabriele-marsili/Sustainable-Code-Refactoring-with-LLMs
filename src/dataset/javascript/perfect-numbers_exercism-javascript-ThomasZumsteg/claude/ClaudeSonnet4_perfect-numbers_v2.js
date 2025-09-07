function factors(number) {
    if (number === 1) return [];
    
    let sum = 1;
    const sqrtNum = Math.sqrt(number);
    
    for (let f = 2; f <= sqrtNum; f++) {
        if (number % f === 0) {
            sum += f;
            if (f !== sqrtNum) {
                sum += number / f;
            }
        }
    }
    
    return sum;
}

class PerfectNumbers {
    classify(number) {
        if (number <= 0) {
            return "Classification is only possible for natural numbers.";
        }

        const factorSum = factors(number);
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