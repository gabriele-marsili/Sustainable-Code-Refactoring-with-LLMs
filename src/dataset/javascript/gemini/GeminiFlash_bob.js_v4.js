export function hey(input) {
  const trimmedInput = input.trim();

  if (trimmedInput.length === 0) {
    return 'Fine. Be that way!';
  }

  const isQuestion = trimmedInput.endsWith('?');
  const upperInput = trimmedInput.toUpperCase();
  const lowerInput = trimmedInput.toLowerCase();

  // A string is considered "shouting" if all its alphabetic characters are uppercase
  // and it contains at least one alphabetic character.
  const isShouting = (trimmedInput === upperInput && upperInput !== lowerInput);

  if (isShouting) {
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