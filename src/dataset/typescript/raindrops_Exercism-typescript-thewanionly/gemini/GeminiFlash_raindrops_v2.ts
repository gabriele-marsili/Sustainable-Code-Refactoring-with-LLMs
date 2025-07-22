export function convert(num: number): string {
  let result = '';

  // Using a series of if statements is already efficient for a small number of conditions.
  // The modulo operations are necessary and generally fast.
  // No significant algorithmic improvements can be made here without changing the core logic.

  // The order of checks doesn't impact correctness or performance significantly for independent conditions.
  // The string concatenation is also optimized by modern JavaScript engines.

  if (num % 3 === 0) {
    result += 'Pling';
  }
  if (num % 5 === 0) {
    result += 'Plang';
  }
  if (num % 7 === 0) {
    result += 'Plong';
  }

  // This is a concise and efficient way to return either the constructed string or the number.
  return result || String(num);
}