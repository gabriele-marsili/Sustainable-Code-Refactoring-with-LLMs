function getDigitList(num) {
  const digits = [];
  let n = num;
  while (n > 0) {
    digits.unshift(n % 10);
    n = Math.floor(n / 10);
  }
  return digits.length ? digits : [0];
}

export function validate(num) {
  const digests = getDigitList(num);
  const length = digests.length;
  
  let sum = 0;
  for (let i = 0; i < length; i++) {
    sum += digests[i] ** length;
  }

  return sum === num;
}