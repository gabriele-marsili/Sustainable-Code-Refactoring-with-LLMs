export const hey = (message) => {
  const trimmed = message.trim();
  if (trimmed === '') return 'Fine. Be that way!';

  const isQuestion = trimmed.endsWith('?');
  const hasLetters = /[A-Za-z]/.test(trimmed);
  const isShouting = hasLetters && trimmed === trimmed.toUpperCase();

  if (isQuestion) {
    return isShouting ? "Calm down, I know what I'm doing!" : 'Sure.';
  }

  return isShouting ? 'Whoa, chill out!' : 'Whatever.';
};