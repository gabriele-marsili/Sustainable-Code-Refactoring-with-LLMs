function scramble(str1, str2) {
  if (str2.length > str1.length) {
    return false;
  }

  const charCounts1 = {};
  for (let i = 0; i < str1.length; i++) {
    const char = str1[i];
    charCounts1[char] = (charCounts1[char] || 0) + 1;
  }

  for (let i = 0; i < str2.length; i++) {
    const char = str2[i];
    if (!charCounts1[char]) {
      return false;
    }
    charCounts1[char]--;
  }

  return true;
}

export default scramble;