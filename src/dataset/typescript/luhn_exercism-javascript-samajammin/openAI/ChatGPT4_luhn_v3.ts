export default class Luhn {
  public static valid(input: string): boolean {
    const stripped = input.replace(/\s/g, '');
    if (stripped.length <= 1 || !/^\d+$/.test(stripped)) {
      return false;
    }

    let sum = 0;
    let double = false;

    for (let i = stripped.length - 1; i >= 0; i--) {
      let digit = stripped.charCodeAt(i) - 48; // Faster than Number(char)
      if (double) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      double = !double;
    }

    return sum % 10 === 0;
  }
}