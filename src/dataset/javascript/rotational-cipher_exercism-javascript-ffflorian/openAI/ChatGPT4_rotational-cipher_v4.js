export function rotate(input, shift) {
  const shiftMod = shift % 26;
  return input.replace(/[A-Za-z]/g, letter => {
    const startIndex = letter <= 'Z' ? 65 : 97;
    return String.fromCharCode(startIndex + ((letter.charCodeAt(0) - startIndex + shiftMod + 26) % 26));
  });
}