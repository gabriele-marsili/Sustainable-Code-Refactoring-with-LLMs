export const reverseString = (text = "") => {
  let reversedWord = "";
  for (let i = text.length - 1; i >= 0; i--) {
    reversedWord += text[i];
  }
  return reversedWord;
};