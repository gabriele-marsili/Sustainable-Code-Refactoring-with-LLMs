export default class Luhn {
  public static valid(input: string): boolean {
    let sum = 0;
    let shouldDouble = false;
    const stripped = input.replace(/\s/g, '');

    if (stripped.length <= 1 || /\D/.test(stripped)) {
      return false;
    }

    for (let i = stripped.length - 1; i >= 0; i--) {
      let digit = Number(stripped[i]);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  }
}