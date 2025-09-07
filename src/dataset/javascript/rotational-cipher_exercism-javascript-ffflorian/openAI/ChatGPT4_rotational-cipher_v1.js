export function rotate(input, shift) {
  const isUpperCase = charCode => charCode >= 65 && charCode <= 90;
  const isLowerCase = charCode => charCode >= 97 && charCode <= 122;

  return input.replace(/[A-Za-z]/g, letter => {
    const charCode = letter.charCodeAt(0);
    const startIndex = isUpperCase(charCode) ? 65 : 97;
    return String.fromCharCode(startIndex + ((charCode - startIndex + shift) % 26));
  });
}