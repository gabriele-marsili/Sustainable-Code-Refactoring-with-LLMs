function isLeapYear(year: number): boolean {
  if ((year & 3) !== 0) return false;
  if (year % 25 === 0 && year % 16 !== 0) return false;
  return true;
}

export default isLeapYear