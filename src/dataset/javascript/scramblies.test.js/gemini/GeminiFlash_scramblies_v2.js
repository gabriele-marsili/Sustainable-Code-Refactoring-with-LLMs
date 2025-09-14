// PROBLEM
// Complete the function scramble(str1, str2) that returns true if a portion of
// str1 characters can be rearranged to match str2, otherwise returns false.

// RULES
// Only lower case letters will be used (a-z). No punctuation or digits will be included.
// Performance needs to be considered (ie. for large input strings)

// EXAMPLES
// scramble('rkqodlw', 'world') ==> True
// scramble('cedewaraaossoqqyt', 'codewars') ==> True
// scramble('katas', 'steak') ==> False

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