function primeFactors(remainder) {
    let factor = 2;
    const factors = [];
    while (remainder >= factor * factor) {
        if (remainder % factor === 0) {
            factors.push(factor);
            remainder /= factor;
        } else {
            factor += factor === 2 ? 1 : 2;
        }
    }
    if (remainder > 1) factors.push(remainder);
    return factors;
}

export default { for: primeFactors };