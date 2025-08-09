const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export function isPangram(phrase: string) {
  let foundLetters = 0;
  const seen = new Array(26).fill(false);
  
  for (let i = 0; i < phrase.length; i++) {
    const charCode = phrase.charCodeAt(i);
    let letterIndex = -1;
    
    if (charCode >= 97 && charCode <= 122) {
      letterIndex = charCode - 97;
    } else if (charCode >= 65 && charCode <= 90) {
      letterIndex = charCode - 65;
    }
    
    if (letterIndex !== -1 && !seen[letterIndex]) {
      seen[letterIndex] = true;
      foundLetters++;
      if (foundLetters === 26) return true;
    }
  }
  
  return false;
}