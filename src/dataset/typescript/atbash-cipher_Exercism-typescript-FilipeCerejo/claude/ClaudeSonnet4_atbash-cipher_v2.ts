const ALPHABET_SIZE = 26;
const A_CHAR_CODE = 97; // 'a'.charCodeAt(0)
const Z_CHAR_CODE = 122; // 'z'.charCodeAt(0)
const ZERO_CHAR_CODE = 48; // '0'.charCodeAt(0)
const NINE_CHAR_CODE = 57; // '9'.charCodeAt(0)

export function encode(plainText: string): string {
  const noWhiteSpaces = plainText.replace(/\s+/g, '');
  let encoded = '';
  
  for (let i = 0; i < noWhiteSpaces.length; i++) {
    const charCode = noWhiteSpaces.charCodeAt(i);
    
    if (charCode >= A_CHAR_CODE && charCode <= Z_CHAR_CODE) {
      // Lowercase letter: map a->z, b->y, etc.
      encoded += String.fromCharCode(Z_CHAR_CODE - (charCode - A_CHAR_CODE));
    } else if (charCode >= 65 && charCode <= 90) {
      // Uppercase letter: convert to lowercase then map
      const lowerCharCode = charCode + 32;
      encoded += String.fromCharCode(Z_CHAR_CODE - (lowerCharCode - A_CHAR_CODE));
    } else if (charCode >= ZERO_CHAR_CODE && charCode <= NINE_CHAR_CODE) {
      // Digit: keep as is
      encoded += noWhiteSpaces[i];
    }
  }
  
  return separate5(encoded);
}

function separate5(separateStr: string): string {
  if (separateStr.length <= 5) return separateStr;
  
  let result = '';
  for (let i = 0; i < separateStr.length; i += 5) {
    if (i > 0) result += ' ';
    result += separateStr.slice(i, i + 5);
  }
  
  return result;
}

export function decode(cipherText: string): string {
  const noWhiteSpaces = cipherText.replace(/\s+/g, '');
  let decoded = '';
  
  for (let i = 0; i < noWhiteSpaces.length; i++) {
    const charCode = noWhiteSpaces.charCodeAt(i);
    
    if (charCode >= A_CHAR_CODE && charCode <= Z_CHAR_CODE) {
      // Lowercase letter: reverse the mapping z->a, y->b, etc.
      decoded += String.fromCharCode(Z_CHAR_CODE - (charCode - A_CHAR_CODE));
    } else if (charCode >= ZERO_CHAR_CODE && charCode <= NINE_CHAR_CODE) {
      // Digit: keep as is
      decoded += noWhiteSpaces[i];
    }
  }
  
  return decoded;
}