export function convert(input) {
  let result = '';
  let isDivisible = false;

  if (input % 3 === 0) {
    result += 'Pling';
    isDivisible = true;
  }
  if (input % 5 === 0) {
    result += 'Plang';
    isDivisible = true;
  }
  if (input % 7 === 0) {
    result += 'Plong';
    isDivisible = true;
  }

  return isDivisible ? result : input.toString();
}