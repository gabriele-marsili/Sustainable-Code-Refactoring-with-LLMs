export function convert(num: number): string {
  let result = '';

  if (num % 3 === 0) {
    result = 'Pling';
  }

  if (num % 5 === 0) {
    result += 'Plang';
  }

  if (num % 7 === 0) {
    result += 'Plong';
  }

  return result || String(num);
}