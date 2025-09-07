export function parse(phrase: string): string {
  let result = '';
  let prevChar = '';
  
  for (let i = 0; i < phrase.length; i++) {
    const char = phrase[i];
    
    if (/[A-Za-z0-9]/.test(char)) {
      if (prevChar === '' || 
          (/[A-Z]/.test(char) && !/[A-Z]/.test(prevChar)) || 
          !/[A-Za-z0-9]/.test(prevChar)) {
        result += char.toUpperCase();
      }
      prevChar = char;
    } else {
      prevChar = '';
    }
  }
  
  return result;
}