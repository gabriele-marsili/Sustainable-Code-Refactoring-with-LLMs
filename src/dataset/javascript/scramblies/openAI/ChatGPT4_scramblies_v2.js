function scramble(str1, str2) {
  const charCount = {};

  // Count characters in str1
  for (const char of str1) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Check if str2 can be formed
  for (const char of str2) {
    if (!charCount[char]) return false;
    charCount[char]--;
  }

  return true;
}

export default scramble;