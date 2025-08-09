function isLeapYear(year: number): boolean {
  if ((year & 3) !== 0) return false;
  if (year % 100 === 0) return year % 400 === 0;
  return true;
}

export default isLeapYear