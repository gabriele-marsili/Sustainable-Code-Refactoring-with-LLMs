export const convert = (input) => {
  let result = '';

  const isDivisibleBy3 = input % 3 === 0;
  const isDivisibleBy5 = input % 5 === 0;
  const isDivisibleBy7 = input % 7 === 0;

  if (isDivisibleBy3) {
    result += 'Pling';
  }
  if (isDivisibleBy5) {
    result += 'Plang';
  }
  if (isDivisibleBy7) {
    result += 'Plong';
  }

  return result || input.toString();
};