export function hey(input) {
  const trimmed = input.trim();

  if (trimmed.length === 0) {
    return 'Fine. Be that way!';
  }

  const hasLetters = /[a-zA-Z]/.test(trimmed);
  const isAllUppercase = hasLetters && trimmed === trimmed.toUpperCase();
  const isQuestion = trimmed.charCodeAt(trimmed.length - 1) === 63; // '?' ASCII code

  if (isAllUppercase) {
    if (isQuestion) {
      return "Calm down, I know what I'm doing!";
    }
    return 'Whoa, chill out!';
  }

  if (isQuestion) {
    return 'Sure.';
  }

  return 'Whatever.';
}