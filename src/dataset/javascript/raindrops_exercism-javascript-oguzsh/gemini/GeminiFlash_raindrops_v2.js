export const convert = (number) => {
  let output = "";
  const isDivisibleBy3 = number % 3 === 0;
  const isDivisibleBy5 = number % 5 === 0;
  const isDivisibleBy7 = number % 7 === 0;

  if (isDivisibleBy3) {
    output += "Pling";
  }
  if (isDivisibleBy5) {
    output += "Plang";
  }
  if (isDivisibleBy7) {
    output += "Plong";
  }

  return output || String(number);
};