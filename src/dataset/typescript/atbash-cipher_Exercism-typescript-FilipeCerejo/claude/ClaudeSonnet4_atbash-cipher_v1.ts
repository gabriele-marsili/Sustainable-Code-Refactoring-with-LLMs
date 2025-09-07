const ALPHABET_SIZE = 26;
const A_CHAR_CODE = 97; // 'a'.charCodeAt(0)
const Z_CHAR_CODE = 122; // 'z'.charCodeAt(0)
const ZERO_CHAR_CODE = 48; // '0'.charCodeAt(0)
const NINE_CHAR_CODE = 57; // '9'.charCodeAt(0)

function atbashTransform(char: string): string {
  const code = char.charCodeAt(0);
  
  if (code >= A_CHAR_CODE && code <= Z_CHAR_CODE) {
    return String.fromCharCode(Z_CHAR_CODE - (code - A_CHAR_CODE));
  }
  
  if (code >= ZERO_CHAR_CODE && code <= NINE_CHAR_CODE) {
    return char;
  }
  
  return char;
}

export function encode(plainText: string): string {
  const noWhiteSpaces = plainText.replace(/\s+/g, '');
  let result = '';
  
  for (let i = 0; i < noWhiteSpaces.length; i++) {
    result += atbashTransform(noWhiteSpaces[i].toLowerCase());
  }
  
  return separate5(result);
}

function separate5(separateStr: string): string {
  if (separateStr.length === 0) return '';
  
  let result = '';
  for (let i = 0; i < separateStr.length; i += 5) {
    if (i > 0) result += ' ';
    result += separateStr.slice(i, i + 5);
  }
  
  return result;
}

export function decode(cipherText: string): string {
  const noWhiteSpaces = cipherText.replace(/\s+/g, '');
  let result = '';
  
  for (let i = 0; i < noWhiteSpaces.length; i++) {
    result += atbashTransform(noWhiteSpaces[i].toLowerCase());
  }
  
  return result;
}