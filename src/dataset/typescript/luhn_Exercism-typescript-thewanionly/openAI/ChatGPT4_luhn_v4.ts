export function valid(digitString: string): boolean {
  const sanitized = digitString.replace(/\s/g, '');
  const len = sanitized.length;

  if (len <= 1 || /[^0-9]/.test(sanitized)) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = len - 1; i >= 0; i--) {
    let digit = Number(sanitized[i]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}