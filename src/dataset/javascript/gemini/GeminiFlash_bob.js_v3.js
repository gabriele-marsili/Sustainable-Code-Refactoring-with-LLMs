export function hey(input) {
  const trimmedInput = input.trim();

  if (trimmedInput.length === 0) {
    return 'Fine. Be that way!';
  }

  // Pre-compute case-related properties once to avoid redundant string transformations,
  // reducing CPU cycles and temporary memory allocations.
  const isAllUppercase = trimmedInput === trimmedInput.toUpperCase();
  // This checks if the string contains any characters that can be cased (i.e., letters).
  // If a string contains only non-alphabetic characters (numbers, symbols, spaces),
  // its uppercase and lowercase versions will be identical.
  const containsLetters = trimmedInput !== trimmedInput.toLowerCase();

  const isQuestion = trimmedInput.endsWith('?');

  // A "shout" is defined as being all uppercase AND containing at least one letter.
  const isShouting = isAllUppercase && containsLetters;

  if (isShouting) {
    if (isQuestion) {
      return "Calm down, I know what I'm doing!";
    }
    return 'Whoa, chill out!';
  }

  // This condition is only reached if the input is not a "shout".
  if (isQuestion) {
    return 'Sure.';
  }

  return 'Whatever.';
}