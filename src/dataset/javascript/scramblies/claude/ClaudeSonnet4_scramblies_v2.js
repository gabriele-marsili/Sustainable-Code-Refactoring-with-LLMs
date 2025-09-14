function scramble(str1, str2) {
  const charCount1 = {};
  const charCount2 = {};
  
  // Count characters in str1
  for (let i = 0; i < str1.length; i++) {
    const char = str1[i];
    charCount1[char] = (charCount1[char] || 0) + 1;
  }
  
  // Count characters in str2 and check availability
  for (let i = 0; i < str2.length; i++) {
    const char = str2[i];
    charCount2[char] = (charCount2[char] || 0) + 1;
    
    // Early exit if str1 doesn't have enough of this character
    if (charCount2[char] > (charCount1[char] || 0)) {
      return false;
    }
  }
  
  return true;
}

export default scramble;