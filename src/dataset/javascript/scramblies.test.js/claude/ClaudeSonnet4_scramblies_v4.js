function scramble(str1, str2) {
  const charCount1 = {};
  const charCount2 = {};
  
  for (let i = 0; i < str1.length; i++) {
    const char = str1[i];
    charCount1[char] = (charCount1[char] || 0) + 1;
  }
  
  for (let i = 0; i < str2.length; i++) {
    const char = str2[i];
    charCount2[char] = (charCount2[char] || 0) + 1;
  }
  
  for (const char in charCount2) {
    if ((charCount1[char] || 0) < charCount2[char]) {
      return false;
    }
  }
  
  return true;
}

const uniqCharacters = (str) => [...new Set(str)];

const countCharacters = (str, char) => {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) count++;
  }
  return count;
};

export default scramble;