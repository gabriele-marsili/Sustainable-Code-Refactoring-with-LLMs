export const toRoman = (decimal: number): string => {
  const roman = [];
  const stringed = String(decimal);

  const length = stringed.length;
  if (length > 3) roman.push('M'.repeat(Number(stringed[length - 4])));
  if (length > 2) roman.push(digitLetters('C', 'D', 'M', Number(stringed[length - 3])));
  if (length > 1) roman.push(digitLetters('X', 'L', 'C', Number(stringed[length - 2])));
  roman.push(digitLetters('I', 'V', 'X', Number(stringed[length - 1])));

  return roman.join('');
};

function digitLetters(
  minor: string,
  middle: string,
  major: string,
  value: number
): string {
  if (value === 9) return minor + major;
  if (value >= 5) return middle + minor.repeat(value - 5);
  if (value === 4) return minor + middle;
  return minor.repeat(value);
}