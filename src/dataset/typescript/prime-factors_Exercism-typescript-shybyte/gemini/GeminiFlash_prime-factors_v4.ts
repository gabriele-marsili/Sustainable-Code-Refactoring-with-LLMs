export default function calculatePrimeFactors(nArg: number) {
    if (nArg < 2) {
        return [];
    }

    const result: number[] = [];
    let n = nArg;

    while (n % 2 === 0) {
        result.push(2);
        n /= 2;
    }

    let i = 3;
    const sqrtN = Math.sqrt(n);

    while (i <= sqrtN && n > 1) {
        if (n % i === 0) {
            result.push(i);
            n /= i;
        } else {
            i += 2;
        }
    }

    if (n > 1) {
        result.push(n);
    }

    return result;
}