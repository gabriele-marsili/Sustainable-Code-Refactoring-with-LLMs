function factors(number) {
    if (number <= 1) {
        return [];
    }

    const result = [1];
    for (let f = 2; f * f <= number; f++) {
        if (number % f === 0) {
            result.push(f);
            const otherFactor = number / f;
            if (f !== otherFactor) {
                result.push(otherFactor);
            }
        }
    }
    return result.sort((a, b) => a - b);
}

class PerfectNumbers {
    classify(number) {
        if (number <= 0) {
            return "Classification is only possible for natural numbers.";
        }

        let factorSum = 0;
        const factorsArray = factors(number);
        for (let i = 0; i < factorsArray.length; i++) {
            factorSum += factorsArray[i];
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