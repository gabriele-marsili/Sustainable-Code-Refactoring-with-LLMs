export function hey(input) {
  input = input.trim();

  if (input.length === 0) {
    return 'Fine. Be that way!';
  }

  // Pre-calculate frequently used string properties to avoid redundant operations
  const isQuestion = input.endsWith('?');
  const upperInput = input.toUpperCase();
  
  // Check if the input contains at least one alphabetic character.
  // This is more efficient than comparing toLowerCase() for this specific check,
  // as it avoids creating another new string and a subsequent comparison.
  const containsLetters = /[a-zA-Z]/.test(input);

  // A string is "shouting" if it's entirely in uppercase AND it contains at least one letter.
  // This prevents non-alphabetic strings (e.g., "123", "!@#") from being considered shouts.
  const isShouting = (input === upperInput) && containsLetters;

  if (isShouting) {
    if (isQuestion) {
      return "Calm down, I know what I'm doing!";
    }
    return 'Whoa, chill out!';
  }

  // If not shouting, check if it's a question
  if (isQuestion) {
    return 'Sure.';
  }

  // Otherwise, it's a generic statement
  return 'Whatever.';
}