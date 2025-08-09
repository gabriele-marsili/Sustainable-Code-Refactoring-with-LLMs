export function hey(input) {
  const trimmedInput = input.trim();

  if (trimmedInput.length === 0) {
    return 'Fine. Be that way!';
  }

  // Pre-calculate uppercase and lowercase versions to avoid redundant computations
  const uppercased = trimmedInput.toUpperCase();
  const lowercased = trimmedInput.toLowerCase();

  // Determine if the input is all uppercase letters and contains at least one letter
  // A string like "123" is all uppercase, but does not contain letters,
  // so `uppercased !== lowercased` helps filter these out.
  const isShouting = trimmedInput === uppercased && uppercased !== lowercased;

  // Use endsWith consistently for improved readability and potential performance
  const isQuestion = trimmedInput.endsWith('?');

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