export const sum = (divisors, limit) => {
  const multiples = new Set();
  
  for (const divisor of divisors) {
    for (let multiple = divisor; multiple < limit; multiple += divisor) {
      multiples.add(multiple);
    }
  }
  
  let result = 0;
  for (const multiple of multiples) {
    result += multiple;
  }
  
  return result;
};