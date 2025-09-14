function scramble(str1, str2) {
  const charCount = {};
  for (const char of str1) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  for (const char of str2) {
    if (!charCount[char]) return false;
    charCount[char]--;
  }
  return true;
}

const uniqCharacters = (str) => [...new Set(str)];
const countCharacters = (str, char) => str.split(char).length;

export default scramble;