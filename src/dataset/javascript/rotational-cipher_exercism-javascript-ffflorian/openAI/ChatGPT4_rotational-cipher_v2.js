export function rotate(input, shift) {
  const shiftNormalized = shift % 26;
  return input.replace(/[A-Za-z]/g, letter => {
    const charCode = letter.charCodeAt(0);
    const startIndex = charCode >= 97 ? 97 : 65;
    return String.fromCharCode(startIndex + ((charCode - startIndex + shiftNormalized + 26) % 26));
  });
}