function to(num) {
  let sum = 0;
  for (let n = 0; n < num; n++) {
    for (let i = 0; i < this.factors.length; i++) {
      if (n % this.factors[i] === 0) {
        sum += n;
        break;
      }
    }
  }
  return sum;
}

export default function(factors) {
  const _factors = factors || [3, 5];
  return {
    factors: _factors,
    to: to
  };
};