export function reverse(chars: string) {
  const charArray = chars.split('');
  let left = 0;
  let right = charArray.length - 1;
  
  while (left < right) {
    const temp = charArray[left];
    charArray[left] = charArray[right];
    charArray[right] = temp;
    left++;
    right--;
  }
  
  return charArray.join('');
}