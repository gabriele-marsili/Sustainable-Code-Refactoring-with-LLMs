export function hey(input) {
  // Trim the input once at the beginning to remove leading/trailing whitespace.
  // This operation is necessary for correct functionality and creates a new string.
  const trimmedInput = input.trim();

  // Handle the empty string case early.
  // This is a direct check and is very efficient.
  if (trimmedInput.length === 0) {
    return 'Fine. Be that way!';
  }

  // Pre-compute the uppercase and lowercase versions of the trimmed input.
  // This avoids redundant string transformations later, reducing CPU cycles and memory allocations
  // that would otherwise occur from multiple calls to .toUpperCase() and .toLowerCase().
  const trimmedInputUpperCase = trimmedInput.toUpperCase();
  const trimmedInputLowerCase = trimmedInput.toLowerCase();

  // Determine if the input is "shouting".
  // A string is considered shouting if all its alphabetic characters are uppercase
  // AND it contains at least one alphabetic character (checked by comparing upper and lower case).
  // This approach is robust and efficient.
  const isShouting = (trimmedInput === trimmedInputUpperCase) && (trimmedInputUpperCase !== trimmedInputLowerCase);

  // Determine if the input ends with a question mark.
  // Accessing the character directly by index (`[length - 1]`) is generally more
  // performant than `slice(-1)` or `endsWith('?')` for single-character checks,
  // as it avoids creating a new temporary string object.
  // Since `trimmedInput.length === 0` is already handled, we can safely access `trimmedInput.length - 1`.
  const endsWithQuestionMark = trimmedInput[trimmedInput.length - 1] === '?';

  // Process the input based on the determined characteristics.
  if (isShouting) {
    if (endsWithQuestionMark) {
      return "Calm down, I know what I'm doing!";
    }
    return 'Whoa, chill out!';
  }

  if (endsWithQuestionMark) {
    return 'Sure.';
  }

  // Default response if none of the above conditions are met.
  return 'Whatever.';
}