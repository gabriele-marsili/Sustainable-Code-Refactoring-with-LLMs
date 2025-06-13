export const reverseString = (s) => {
  let letters = s.split("")
  let reversed = ""
  for (let x = letters.length-1; x >= 0; x-- ) {
    reversed = reversed + letters[x]
  }
  return reversed
};
