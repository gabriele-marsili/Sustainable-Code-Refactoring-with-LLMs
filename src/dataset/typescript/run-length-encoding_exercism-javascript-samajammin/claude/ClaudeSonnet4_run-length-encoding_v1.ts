export default class RunLengthEncoding {
  static encode(str: string): string {
    if (!str) return '';
    
    const result: string[] = [];
    let count = 1;
    let currentChar = str[0];

    for (let i = 1; i < str.length; i++) {
      if (str[i] === currentChar) {
        count++;
      } else {
        if (count > 1) {
          result.push(count.toString(), currentChar);
        } else {
          result.push(currentChar);
        }
        currentChar = str[i];
        count = 1;
      }
    }

    if (count > 1) {
      result.push(count.toString(), currentChar);
    } else {
      result.push(currentChar);
    }

    return result.join('');
  }

  static decode(str: string): string {
    if (!str) return '';
    
    const result: string[] = [];
    let numStr = '';
    
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      const charCode = char.charCodeAt(0);
      
      if (charCode >= 48 && charCode <= 57) { // '0' to '9'
        numStr += char;
      } else {
        if (numStr) {
          const count = parseInt(numStr, 10);
          for (let j = 0; j < count; j++) {
            result.push(char);
          }
          numStr = '';
        } else {
          result.push(char);
        }
      }
    }
    
    return result.join('');
  }
}