export const isPangram = (text) => {
  // console.log(text);
  if (text.length < 26) { return false }
  let alphabet = ["a", "b", "c", "d", "e", "f",
  "g", "h", "i", "j", "k", "l", "m", "n", "o",
  "p", "q", "r", "s", "t", "u", "v", "w", "x",
  "y", "z"];
  let letters = {}
  for (let letter of alphabet) {
    letters[letter] = 0;
  }
  for (let letter of text.toLowerCase().split("")) {
    if (alphabet.includes(letter)) {
      letters[letter] += 1;
    }
  }
  for (let letter in letters) {
    if (letters[letter] === 0) {
      return false
    }
  }
  // console.log(letters)
  return true
};
