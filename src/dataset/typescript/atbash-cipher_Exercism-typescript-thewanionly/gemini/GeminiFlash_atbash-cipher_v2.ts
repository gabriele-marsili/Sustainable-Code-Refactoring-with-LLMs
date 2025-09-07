const MIN_CHAR_CODE = 97; // char code of 'a'
const MAX_CHAR_CODE = 122; // char code of 'z'
const OFFSET = MAX_CHAR_CODE - MIN_CHAR_CODE;
const MULTIPLIER = 2;
const GROUP_LENGTH = 5;
const GROUP_SEPARATOR = ' ';

const cipherLetter = (charCode: number): string => {
  if (charCode >= 48 && charCode <= 57) {
    return String.fromCharCode(charCode);
  }
  return String.fromCharCode(charCode + (OFFSET - (charCode - MIN_CHAR_CODE) * MULTIPLIER));
};

const transcode = (text: string): string => {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const charCode = text.charCodeAt(i);

    if ((charCode >= 48 && charCode <= 57) || (charCode >= 97 && charCode <= 122)) {
      result += String.fromCharCode(charCode);
    } else if (charCode >= 65 && charCode <= 90) {
      result += String.fromCharCode(charCode + 32);
    }
  }
  return result;
};

export function encode(plainText: string): string {
  const transcodedText = transcode(plainText.replace(/\W/g, '').toLowerCase());
  let result = '';
  for (let i = 0; i < transcodedText.length; i++) {
    if (i > 0 && i % GROUP_LENGTH === 0) {
      result += GROUP_SEPARATOR;
    }
    result += cipherLetter(transcodedText.charCodeAt(i));
  }
  return result;
}

export function decode(cipherText: string): string {
  const transcodedText = transcode(cipherText.replace(/\W/g, '').toLowerCase());
  let result = '';
  for (let i = 0; i < transcodedText.length; i++) {
    result += cipherLetter(transcodedText.charCodeAt(i));
  }
  return result;
}