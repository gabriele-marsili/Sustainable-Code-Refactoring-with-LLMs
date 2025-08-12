export function hey(input) {
  input = input.trim();

  if (input.length === 0) {
    return 'Fine. Be that way!';
  }

  const isQuestion = input.endsWith('?');

  let hasLetter = false;
  let isAllUppercase = true; // Assume true until a lowercase char is found

  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    // Check if character is an ASCII letter (A-Z or a-z)
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
      hasLetter = true;
      if (charCode >= 97 && charCode <= 122) { // It's a lowercase letter
        isAllUppercase = false;
        // Optimization: If a lowercase letter is found, the string cannot be
        // considered "all uppercase". We can break the loop early as
        // 'isAllUppercase' will remain false, and thus 'isShouting' will be false.
        break;
      }
    }
  }

  const isShouting = hasLetter && isAllUppercase;

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