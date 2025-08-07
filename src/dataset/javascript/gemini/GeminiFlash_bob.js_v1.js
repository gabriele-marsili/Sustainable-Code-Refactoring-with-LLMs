export function hey(input) {
  input = input.trim();

  if (input.length === 0) {
    return 'Fine. Be that way!';
  }

  const isQuestion = input.endsWith('?');

  // To efficiently check for yelling (all caps AND contains letters):
  // 1. Check if the string is entirely uppercase (or contains no letters that change case).
  // 2. If it is all uppercase, then check if it contains any actual letters
  //    by comparing its uppercase and lowercase versions. If they are different,
  //    it means there was at least one letter whose case could change.
  const inputUpperCase = input.toUpperCase();
  const isAllUpperCase = (input === inputUpperCase);

  let containsLetters = false;
  if (isAllUpperCase) {
    // Only perform toLowerCase if it's already all uppercase, saving an operation
    // for strings that are not all uppercase (e.g., "hello").
    containsLetters = (inputUpperCase !== input.toLowerCase());
  }

  const isYelling = isAllUpperCase && containsLetters;

  if (isYelling) {
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