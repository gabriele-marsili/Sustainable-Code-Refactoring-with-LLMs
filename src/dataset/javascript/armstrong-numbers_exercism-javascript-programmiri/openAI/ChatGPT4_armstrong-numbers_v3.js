function getDigitList(num) {
  const digits = [];
  while (num > 0) {
    digits.unshift(num % 10);
    num = Math.floor(num / 10);
  }
  return digits;
}

export function validate(num) {
  const digests = getDigitList(num);
  const power = digests.length;

  let sum = 0;
  for (let i = 0; i < power; i++) {
    sum += Math.pow(digests[i], power);
    if (sum > num) return false;
  }

  return sum === num;
}