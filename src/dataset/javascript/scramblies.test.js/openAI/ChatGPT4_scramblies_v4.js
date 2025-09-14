function scramble(str1, str2) {
  const charCount = {};
  for (const char of str1) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  for (const char of str2) {
    if (!charCount[char] || charCount[char]-- <= 0) {
      return false;
    }
  }
  return true;
}

export default scramble;