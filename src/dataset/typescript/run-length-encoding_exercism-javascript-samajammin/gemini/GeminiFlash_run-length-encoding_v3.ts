export default class RunLengthEncoding {
  static encode(str: string): string {
    let res = '';
    let curCount = 1;
    let currentChar = '';

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (char === currentChar) {
        curCount++;
      } else {
        if (currentChar !== '') {
          if (curCount > 1) {
            res += curCount;
          }
          res += currentChar;
        }
        currentChar = char;
        curCount = 1;
      }
    }

    if (currentChar !== '') {
      if (curCount > 1) {
        res += curCount;
      }
      res += currentChar;
    }

    return res;
  }

  static decode(str: string): string {
    let res = '';
    let num = '';

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (char >= '0' && char <= '9') {
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