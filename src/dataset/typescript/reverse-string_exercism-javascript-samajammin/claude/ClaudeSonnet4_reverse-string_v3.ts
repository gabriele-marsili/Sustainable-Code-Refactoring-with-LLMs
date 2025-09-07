class ReverseString {
  static reverse(str: string): string {
    if (str.length <= 1) return str;
    
    const chars = str.split('');
    const len = chars.length;
    const halfLen = len >> 1;
    
    for (let i = 0; i < halfLen; i++) {
      const temp = chars[i];
      chars[i] = chars[len - 1 - i];
      chars[len - 1 - i] = temp;
    }
    
    return chars.join('');
  }
}

export default ReverseString;