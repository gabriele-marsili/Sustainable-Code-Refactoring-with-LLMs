export function hey(input) {
  const trimmedInput = input.trim();

  if (trimmedInput.length === 0) {
    return 'Fine. Be that way!';
  }

  // Pre-compute upper and lower case versions to avoid redundant operations.
  // These are often implemented efficiently by JS engines, but caching avoids
  // multiple calls on the same string in complex conditions.
  const upperCaseInput = trimmedInput.toUpperCase();
  const lowerCaseInput = trimmedInput.toLowerCase();

  // Determine if the input is considered a "shout".
  // A shout must be all uppercase (or contain no alphabetic chars that can change case)
  // AND contain at least one alphabetic character (i.e., its upper and lower case forms differ).
  const isShouting = (trimmedInput === upperCaseInput) && (upperCaseInput !== lowerCaseInput);

  // Efficiently check the last character without creating a new substring.
  const lastChar = trimmedInput[trimmedInput.length - 1];
  const endsWithQuestionMark = (lastChar === '?');

  if (isShouting) {
    if (endsWithQuestionMark) {
      return "Calm down, I know what I'm doing!";
    }
    return 'Whoa, chill out!';
  }

  if (endsWithQuestionMark) {
    return 'Sure.';
  }

  return 'Whatever.';
}