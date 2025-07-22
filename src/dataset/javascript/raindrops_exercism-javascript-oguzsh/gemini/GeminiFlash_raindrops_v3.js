export const convert = (number) => {
  let output = "";

  // Using a series of if statements is generally efficient for a small, fixed number of conditions.
  // The modulo operator is already optimized by JavaScript engines.
  // String concatenation with `+=` is also highly optimized in modern engines.

  if (number % 3 === 0) {
    output += "Pling";
  }
  if (number % 5 === 0) {
    output += "Plang";
  }
  if (number % 7 === 0) {
    output += "Plong";
  }

  // The logical OR operator `||` is efficient for checking if output is empty
  // and returning the number as a string if it is.
  // Converting the number to a string using `String()` is generally performant.
  return output || String(number);
};