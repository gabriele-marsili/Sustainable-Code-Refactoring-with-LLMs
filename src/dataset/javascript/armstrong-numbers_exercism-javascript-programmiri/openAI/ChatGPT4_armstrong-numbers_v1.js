function getDigitList(num) {
  const digits = [];
  while (num > 0) {
    digits.push(num % 10);
    num = Math.floor(num / 10);
  }
  return digits.reverse();
}

export function validate(num) {
  const digests = getDigitList(num);
  const length = digests.length;

  let sum = 0;
  for (let i = 0; i < length; i++) {
    sum += Math.pow(digests[i], length);
    if (sum > num) return false; // Early exit if sum exceeds num
  }

  return sum === num;
}