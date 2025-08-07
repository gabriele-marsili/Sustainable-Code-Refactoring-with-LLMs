export function hey(input) {
  const trimmed = input.trim();

  if (!trimmed) return 'Fine. Be that way!';

  const isQuestion = trimmed.endsWith('?');
  const hasLetters = /[a-zA-Z]/.test(trimmed);
  const isShouting = hasLetters && trimmed === trimmed.toUpperCase();

  if (isShouting) {
    return isQuestion
      ? "Calm down, I know what I'm doing!"
      : 'Whoa, chill out!';
  }

  if (isQuestion) return 'Sure.';

  return 'Whatever.';
}