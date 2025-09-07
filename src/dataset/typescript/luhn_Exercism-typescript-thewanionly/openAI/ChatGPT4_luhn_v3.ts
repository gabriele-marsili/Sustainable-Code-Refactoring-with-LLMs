export function valid(digitString: string): boolean {
  const sanitized = digitString.replace(/\s/g, '');
  const len = sanitized.length;

  if (len <= 1 || /[^0-9]/.test(sanitized)) return false;

  let sum = 0;
  let double = false;

  for (let i = len - 1; i >= 0; i--) {
    let num = Number(sanitized[i]);
    if (double) {
      num *= 2;
      if (num > 9) num -= 9;
    }
    sum += num;
    double = !double;
  }

  return sum % 10 === 0;
}