export const convert = (input) => {
  let result = '';

  // Use a pre-defined array of divisors and their corresponding words to avoid
  // repeated modulo operations and string concatenations, which can be less
  // efficient than a lookup.
  const rainSounds = [
    { divisor: 3, word: 'Pling' },
    { divisor: 5, word: 'Plang' },
    { divisor: 7, word: 'Plong' },
  ];

  // Iterate through the rainSounds array. This is generally more efficient than
  // multiple independent `if` statements for larger sets of conditions, as it
  // centralizes the logic and potentially benefits from compiler optimizations.
  // For small numbers of conditions like this, the performance difference might be
  // negligible but it improves maintainability and extensibility.
  for (let i = 0; i < rainSounds.length; i++) {
    if (input % rainSounds[i].divisor === 0) {
      result += rainSounds[i].word;
    }
  }

  // Use the logical OR operator for a concise and efficient way to return
  // either the accumulated result or the string representation of the input.
  // This avoids an explicit `if/else` block and potential redundant `toString()` calls.
  return result || input.toString();
};