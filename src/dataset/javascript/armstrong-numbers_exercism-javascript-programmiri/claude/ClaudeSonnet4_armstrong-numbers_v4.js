function getDigitList(num) {
  const digits = [];
  let n = num;
  
  if (n === 0) return [0];
  
  while (n > 0) {
    digits.unshift(n % 10);
    n = Math.floor(n / 10);
  }
  
  return digits;
}

export function validate(num) {
  const digits = getDigitList(num);
  const length = digits.length;
  
  let sum = 0;
  for (let i = 0; i < length; i++) {
    sum += digits[i] ** length;
  }
  
  return sum === num;
}