export function hey(input) {
  const trimmed = input.trim();

  if (trimmed.length === 0) {
    return 'Fine. Be that way!';
  }

  const hasLetters = /[a-zA-Z]/.test(trimmed);
  const isAllUppercase = hasLetters && trimmed === trimmed.toUpperCase();
  const isQuestion = trimmed.charCodeAt(trimmed.length - 1) === 63;

  if (isAllUppercase) {
    return isQuestion ? "Calm down, I know what I'm doing!" : 'Whoa, chill out!';
  }

  return isQuestion ? 'Sure.' : 'Whatever.';
}