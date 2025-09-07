export function parse(phrase: string): string {
  let result = '';
  let prevCharWasUpper = false;

  for (let i = 0; i < phrase.length; i++) {
    const char = phrase[i];
    if (/[A-Z]/.test(char)) {
      if (!prevCharWasUpper) result += ' ';
      prevCharWasUpper = true;
    } else {
      prevCharWasUpper = false;
    }
    if (/\w/.test(char)) {
      result += char;
    } else {
      result += ' ';
    }
  }

  return result
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word[0])
    .join('')
    .toUpperCase();
}