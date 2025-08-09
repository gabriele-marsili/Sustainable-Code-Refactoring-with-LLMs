function isLeapYear(year: number): boolean {
  if ((year & 3) !== 0) return false;
  if (year % 100 !== 0) return true;
  return year % 400 === 0;
}

export default isLeapYear;