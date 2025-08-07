export function isLeap(year: number): boolean {
  return (!(year & 3) && year % 100 !== 0) || year % 400 === 0
}