export default class RunLengthEncoding {
  static encode(str: string): string {
    if (!str) return '';
    let res = '';
    let curCount = 1;
    let prevChar = str[0];

    for (let i = 1; i < str.length; i++) {
      if (str[i] === prevChar) {
        curCount++;
      } else {
        if (curCount > 1) res += curCount;
        res += prevChar;
        prevChar = str[i];
        curCount = 1;
      }
    }
    if (curCount > 1) res += curCount;
    res += prevChar;

    return res;
  }

  static decode(str: string): string {
    if (!str) return '';
    let res = '';
    let num = 0;

    for (const char of str) {
      const digit = Number(char);
      if (!isNaN(digit)) {
        num = num * 10 + digit;
      } else {
        res += char.repeat(num || 1);
        num = 0;
      }
    }

    return res;
  }
}