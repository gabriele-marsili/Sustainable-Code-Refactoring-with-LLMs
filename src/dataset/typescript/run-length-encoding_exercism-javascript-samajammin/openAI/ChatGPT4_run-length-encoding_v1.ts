export default class RunLengthEncoding {
  static encode(str: string): string {
    let res = '';
    let curCount = 1;

    for (let i = 1; i <= str.length; i++) {
      if (str[i] === str[i - 1]) {
        curCount++;
      } else {
        if (curCount > 1) res += curCount;
        res += str[i - 1];
        curCount = 1;
      }
    }
    return res;
  }

  static decode(str: string): string {
    let res = '';
    let num = 0;

    for (const char of str) {
      const digit = char.charCodeAt(0) - 48; // Faster numeric check
      if (digit >= 0 && digit <= 9) {
        num = num * 10 + digit;
      } else {
        res += char.repeat(num || 1);
        num = 0;
      }
    }
    return res;
  }
}