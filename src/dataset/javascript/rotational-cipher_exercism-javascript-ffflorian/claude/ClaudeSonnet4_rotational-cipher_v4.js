export function rotate(input, shift) {
  const normalizedShift = ((shift % 26) + 26) % 26;
  if (normalizedShift === 0) return input;
  
  let result = '';
  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
      const startIndex = charCode > 90 ? 97 : 65;
      result += String.fromCharCode(startIndex + ((charCode - startIndex + normalizedShift) % 26));
    } else {
      result += input[i];
    }
  }
  return result;
}