export default class RunLengthEncoding {
  static encode(str: string): string {
    if (!str) return "";

    let res = '';
    let count = 1;
    let currentChar = str[0];

    for (let i = 1; i < str.length; i++) {
      if (str[i] === currentChar) {
        count++;
      } else {
        res += (count > 1 ? count : "") + currentChar;
        currentChar = str[i];
        count = 1;
      }
    }

    res += (count > 1 ? count : "") + currentChar;
    return res;
  }

  static decode(str: string): string {
    let res = '';
    let num = '';

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (/\d/.test(char)) {
        num += char;
      } else {
        const repeatCount = num ? parseInt(num, 10) : 1;
        res += char.repeat(repeatCount);
        num = '';
      }
    }
    return res;
  }
}