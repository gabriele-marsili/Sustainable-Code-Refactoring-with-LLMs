export function hey(input) {
  input = input.trim();
  const isQuestion = input.endsWith('?');
  const hasLetters = /[a-zA-Z]/.test(input);
  const isShouting = hasLetters && input === input.toUpperCase();

  if (!input) {
    return 'Fine. Be that way!';
  }

  if (isShouting) {
    return isQuestion ? "Calm down, I know what I'm doing!" : 'Whoa, chill out!';
  }

  if (isQuestion) {
    return 'Sure.';
  }

  return 'Whatever.';
}