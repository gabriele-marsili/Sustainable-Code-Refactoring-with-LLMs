export const reverseString = (text = "") => {
  let reversedString = "";
  for (let i = text.length - 1; i >= 0; i--) {
    reversedString += text[i];
  }
  return reversedString;
};