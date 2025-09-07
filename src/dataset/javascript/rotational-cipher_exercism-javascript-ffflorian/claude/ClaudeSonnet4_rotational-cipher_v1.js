export function rotate(input, shift) {
  const normalizedShift = ((shift % 26) + 26) % 26;
  if (normalizedShift === 0) return input;
  
  let result = '';
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const charCode = char.charCodeAt(0);
    
    if (charCode >= 65 && charCode <= 90) {
      result += String.fromCharCode(65 + ((charCode - 65 + normalizedShift) % 26));
    } else if (charCode >= 97 && charCode <= 122) {
      result += String.fromCharCode(97 + ((charCode - 97 + normalizedShift) % 26));
    } else {
      result += char;
    }
  }
  
  return result;
}