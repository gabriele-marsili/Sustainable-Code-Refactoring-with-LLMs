function scramble(str1, str2) {
  const charCount = Array(26).fill(0);
  for (const char of str1) {
    charCount[char.charCodeAt(0) - 97]++;
  }
  for (const char of str2) {
    if (--charCount[char.charCodeAt(0) - 97] < 0) {
      return false;
    }
  }
  return true;
}

export default scramble;