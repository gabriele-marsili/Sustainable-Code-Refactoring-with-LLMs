export default class Luhn {
  public static valid(input: string): boolean {
    const stripped = input.replace(/\s/g, '');

    if (stripped.length <= 1 || !/^\d+$/.test(stripped)) {
      return false;
    }

    let sum = 0;
    for (let i = stripped.length - 1, j = 0; i >= 0; i--, j++) {
      let digit = parseInt(stripped[i], 10);
      if (j % 2 !== 0) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }

    return sum % 10 === 0;
  }
}