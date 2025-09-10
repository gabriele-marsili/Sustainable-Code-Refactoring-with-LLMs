function to(num) {
    const factors = this.factors;
    let total = 0;
    for (let n = 0; n < num; n++) {
        for (let i = 0; i < factors.length; i++) {
            if (n % factors[i] === 0) {
                total += n;
                break;
            }
        }
    }
    return total;
}

export default function(factors) {
    return {
        factors: factors || [3, 5],
        to: to
    };
};