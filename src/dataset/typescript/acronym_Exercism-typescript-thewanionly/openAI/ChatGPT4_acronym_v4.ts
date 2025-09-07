export function parse(phrase: string): string {
  let result = '';
  let prevCharWasUpper = false;

  for (let i = 0; i < phrase.length; i++) {
    const char = phrase[i];
    if (/[A-Z]/.test(char)) {
      if (!prevCharWasUpper) result += ' ';
      result += char;
      prevCharWasUpper = true;
    } else if (/\w/.test(char)) {
      result += char;
      prevCharWasUpper = false;
    } else {
      prevCharWasUpper = false;
    }
  }

  return result
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
}