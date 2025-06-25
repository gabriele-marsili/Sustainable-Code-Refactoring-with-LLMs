export function isValid(isbn: string): boolean {
  let cleanString = isbn.replace(/[^\d|X]/g, '');

  if (cleanString.length !== 10 || !/^[0-9]{9}([0-9X]){1}$/.test(cleanString)) return false;

  return cleanString.split('').reduce((acc: number, cur: string, idx: number): number => {
    acc += (cur !== 'X' ? Number(cur) : 10) * (10 - idx);
    return acc;
  }, 0) % 11 === 0;
}
