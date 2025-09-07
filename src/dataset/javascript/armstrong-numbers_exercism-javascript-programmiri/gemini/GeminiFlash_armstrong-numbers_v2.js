function getDigitList(num) {
  const numStr = String(num);
  const digits = new Array(numStr.length);
  for (let i = 0; i < numStr.length; i++) {
    digits[i] = Number(numStr[i]);
  }
  return digits;
}

export function validate(num) {
  const digits = getDigitList(num);
  const n = digits.length;
  let sum = 0;

  for (let i = 0; i < n; i++) {
    sum += Math.pow(digits[i], n);
  }

  return sum === num;
}