function factors(number) {
    if (number === 1) return [];
    const result = [1];
    const sqrt = Math.sqrt(number);
    for (let f = 2; f <= sqrt; f++) {
        if (number % f === 0) {
            result.push(f);
            const pair = number / f;
            if (f !== pair) result.push(pair);
        }
    }
    return result;
}

class PerfectNumbers {
    classify(number) {
        if (number <= 0) {
            return "Classification is only possible for natural numbers.";
        }

        const factorSum = factors(number).reduce((a, b) => a + b, 0);
        return number < factorSum ? "abundant" : number > factorSum ? "deficient" : "perfect";
    }
}

export default PerfectNumbers;