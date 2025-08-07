export function hey(input) {
  const trimmed = input.trim();
  
  if (trimmed.length === 0) {
    return 'Fine. Be that way!';
  }

  const isQuestion = trimmed.endsWith('?');
  const hasLetters = /[a-zA-Z]/.test(trimmed);
  const isYelling = hasLetters && trimmed === trimmed.toUpperCase();

  if (isYelling) {
    return isQuestion ? "Calm down, I know what I'm doing!" : 'Whoa, chill out!';
  }

  return isQuestion ? 'Sure.' : 'Whatever.';
}