export default function calculatePrimeFactors(nArg: number) {
    if (nArg < 2) {
        return [];
    }

    const result: number[] = [];
    let n = nArg;

    for (let i = 2; i * i <= n; i++) {
        while (n % i === 0) {
            result.push(i);
            n /= i;
        }
    }

    if (n > 1) {
        result.push(n);
    }

    return result;
}