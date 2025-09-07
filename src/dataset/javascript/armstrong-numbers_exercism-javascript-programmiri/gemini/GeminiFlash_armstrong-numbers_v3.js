function getDigitList(num) {
  const numStr = String(num);
  const len = numStr.length;
  const digits = new Array(len);
  for (let i = 0; i < len; i++) {
    digits[i] = Number(numStr[i]);
  }
  return digits;
}

export function validate(num) {
  const digits = getDigitList(num);
  let sum = 0;
  const len = digits.length;

  for (let i = 0; i < len; i++) {
    let raised = 1;
    let base = digits[i];
    for (let j = 0; j < len; j++) {
      raised *= base;
    }
    sum += raised;
  }

  return sum === num;
}