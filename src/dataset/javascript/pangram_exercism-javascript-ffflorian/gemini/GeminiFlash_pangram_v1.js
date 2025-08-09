export function isPangram(sentence) {
  sentence = sentence.trim().toLowerCase();

  const foundLetters = new Array(26).fill(false);
  let lettersFoundCount = 0;

  for (let i = 0; i < sentence.length; i++) {
    const charCode = sentence.charCodeAt(i);

    if (charCode >= 97 && charCode <= 122) {
      const index = charCode - 97;

      if (!foundLetters[index]) {
        foundLetters[index] = true;
        lettersFoundCount++;

        if (lettersFoundCount === 26) {
          return true;
        }
      }
    }
  }

  return lettersFoundCount === 26;
}