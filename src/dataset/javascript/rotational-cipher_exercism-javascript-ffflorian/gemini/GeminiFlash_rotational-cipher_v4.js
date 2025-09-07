export function rotate(input, shift) {
  const len = input.length;
  let result = '';

  for (let i = 0; i < len; i++) {
    const char = input[i];
    const charCode = char.charCodeAt(0);

    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
      const startIndex = charCode > 90 ? 97 : 65;
      const rotatedCharCode = startIndex + ((charCode - startIndex + shift) % 26 + 26) % 26;
      result += String.fromCharCode(rotatedCharCode);
    } else {
      result += char;
    }
  }

  return result;
}