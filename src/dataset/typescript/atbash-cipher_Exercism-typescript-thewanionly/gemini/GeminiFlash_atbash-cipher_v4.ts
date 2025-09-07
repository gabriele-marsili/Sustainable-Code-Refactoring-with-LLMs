const MIN_CHAR_CODE = 97;
const MAX_CHAR_CODE = 122;
const OFFSET = MAX_CHAR_CODE - MIN_CHAR_CODE;
const MULTIPLIER = 2;
const GROUP_LENGTH = 5;
const GROUP_SEPARATOR = ' ';

const cipherLetter = (letter: string): string => {
  const charCode = letter.charCodeAt(0);
  return /^\d+$/.test(letter)
    ? letter
    : String.fromCharCode(charCode + (OFFSET - (charCode - MIN_CHAR_CODE) * MULTIPLIER));
};

const transcode = (text: string): string => {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (/\w/.test(char)) {
      const lowerChar = char.toLowerCase();
      result += lowerChar;
    }
  }

  let transformedResult = '';
  for (let i = 0; i < result.length; i++) {
    transformedResult += cipherLetter(result[i]);
  }
  return transformedResult;
};

export function encode(plainText: string): string {
  const transcodedText = transcode(plainText);
  let result = '';
  for (let i = 0; i < transcodedText.length; i++) {
    if (i > 0 && i % GROUP_LENGTH === 0) {
      result += GROUP_SEPARATOR;
    }
    result += transcodedText[i];
  }
  return result;
}

export function decode(cipherText: string): string {
  return transcode(cipherText);
}