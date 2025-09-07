export function parse(phrase: string): string {
  let result = '';
  let addSpace = false;

  for (let i = 0; i < phrase.length; i++) {
    const char = phrase[i];
    if (/[A-Z]/.test(char)) {
      if (!addSpace) {
        result += ' ';
        addSpace = true;
      }
      result += char;
    } else if (/\w/.test(char)) {
      addSpace = false;
    }
  }

  return result.replace(/\s+/g, '').toUpperCase();
}