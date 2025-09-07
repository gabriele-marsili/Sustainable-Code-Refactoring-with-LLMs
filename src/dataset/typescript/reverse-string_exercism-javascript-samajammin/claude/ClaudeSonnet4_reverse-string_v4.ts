class ReverseString {
  static reverse(str: string): string {
    if (str.length <= 1) return str;
    
    const chars = str.split('');
    let left = 0;
    let right = chars.length - 1;
    
    while (left < right) {
      const temp = chars[left];
      chars[left] = chars[right];
      chars[right] = temp;
      left++;
      right--;
    }
    
    return chars.join('');
  }
}

export default ReverseString;