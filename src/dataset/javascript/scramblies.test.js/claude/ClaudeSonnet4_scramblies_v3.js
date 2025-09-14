function scramble(str1, str2) {
  const charCount1 = new Map();
  const charCount2 = new Map();
  
  for (let i = 0; i < str1.length; i++) {
    const char = str1[i];
    charCount1.set(char, (charCount1.get(char) || 0) + 1);
  }
  
  for (let i = 0; i < str2.length; i++) {
    const char = str2[i];
    charCount2.set(char, (charCount2.get(char) || 0) + 1);
  }
  
  for (const [char, count] of charCount2) {
    if ((charCount1.get(char) || 0) < count) {
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