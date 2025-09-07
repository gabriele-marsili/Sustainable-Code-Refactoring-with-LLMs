export function parse(phrase: string): string {
  let result = '';
  let prevChar = '';
  let inWord = false;
  
  for (let i = 0; i < phrase.length; i++) {
    const char = phrase[i];
    
    if (/[A-Za-z0-9]/.test(char)) {
      if (!inWord || (/[A-Z]/.test(char) && /[a-z]/.test(prevChar))) {
        result += char.toUpperCase();
        inWord = true;
      }
    } else {
      inWord = false;
    }
    
    prevChar = char;
  }
  
  return result;
}